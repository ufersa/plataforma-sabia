/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const dayjs = require('dayjs');

const User = use('App/Models/User');

const Role = use('App/Models/Role');

const Mail = use('Adonis/Addons/Mail');
const Config = use('Adonis/Src/Config');
const Token = use('App/Models/Token');

const { antl, errors, errorPayload } = require('../../Utils');

class AuthController {
	/**
	 * Register an user.
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 *
	 * @returns {Response}
	 */
	async register({ request, response }) {
		const { username, email, password, scope } = request.all();

		const defaultUserRole = await Role.getDefaultUserRole();

		if (!defaultUserRole) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.MISSING_DEFAULT_ROLE,
						antl('error.auth.missingDefaultRole'),
					),
				);
		}

		const user = await User.create({ username, email, password });
		await user.role().associate(defaultUserRole);
		await user.load('role');

		const { token } = await user.generateConfirmationAccountToken();
		const { adminURL, webURL } = Config.get('app');
		const { from } = Config.get('mail');

		await Mail.send(
			'emails.confirm-account',
			{
				user,
				token,
				url:
					scope === 'admin'
						? `${adminURL}/auth/confirm-account/:token`
						: `${webURL}/auth/confirm-account/:token`,
			},
			(message) => {
				message.subject(antl('message.auth.confirmAccountEmailSubject'));
				message.from(from);
				message.to(user.email);
			},
		);

		return {
			...user.toJSON(),
			password: '',
		};
	}

	async confirmAccount({ request, response }) {
		const { token } = request.all();
		const { from } = Config.get('mail');

		const tokenObject = await Token.query()
			.where('token', token)
			.where('type', 'confirm-ac')
			.where('is_revoked', false)
			.where(
				'created_at',
				'>=',
				dayjs()
					.subtract(24, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
			)
			.first();

		if (!tokenObject) {
			return response
				.status(401)
				.send(errorPayload(errors.INVALID_TOKEN, antl('error.auth.invalidToken')));
		}

		// invalidate token
		await tokenObject.revoke();

		const user = await tokenObject.user().fetch();

		user.status = 'verified';
		await user.save();

		await Mail.send('emails.active-account', { user }, (message) => {
			message.subject(antl('message.auth.accountActivatedEmailSubject'));
			message.from(from);
			message.to(user.email);
		});

		return response.status(200).send({ success: true });
	}

	async resendConfirmationEmail({ request, response }) {
		const { email, scope } = request.all();
		const user = await User.findBy('email', email);

		if (user.status === 'verified') {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.ALREADY_VERIFIED_EMAIL,
						antl('error.auth.alreadyVerifiedEmail'),
					),
				);
		}
		await user
			.tokens('type', 'confirm_ac')
			.where('is_revoked', false)
			.update({ is_revoked: true });
		await user.save();

		const { token } = await user.generateConfirmationAccountToken();
		const { adminURL, webURL } = Config.get('app');
		const { from } = Config.get('mail');

		await Mail.send(
			'emails.confirm-account',
			{
				user,
				token,
				url:
					scope === 'admin'
						? `${adminURL}/auth/confirm-account/:token`
						: `${webURL}/auth/confirm-account/:token`,
			},
			(message) => {
				message.subject(antl('message.auth.confirmAccountEmailSubject'));
				message.from(from);
				message.to(user.email);
			},
		);

		return response.status(200).send({ success: true });
	}

	/**
	 * Register an user.
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {object} ctx.auth The Auth object.
	 *
	 * @returns {Response}
	 */
	async auth({ request, auth, response }) {
		const { email, password, status } = request.all();

		if (status !== 'verified') {
			return response
				.status(400)
				.send(errorPayload(errors.UNVERRIFIED_EMAIL, antl('error.auth.unverifiedEmail')));
		}
		const token = await auth.attempt(email, password);
		return token;
	}

	/**
	 * Method to handle restting passwords.
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {object} ctx.auth The Auth object.
	 *
	 * @returns {Response}
	 */
	async forgotPassword({ request, response }) {
		const { email, scope } = request.all();

		const user = await User.findBy('email', email);

		if (!user) {
			return response
				.status(400)
				.send(errorPayload(errors.INVALID_EMAIL, antl('error.email.invalid')));
		}

		// revoke all valid reset-pw tokens the user might still have.
		await user
			.tokens('type', 'reset-pw')
			.where('is_revoked', false)
			.update({ is_revoked: true });

		const { token } = await user.generateResetPasswordToken();
		const { adminURL, webURL } = Config.get('app');
		const { from } = Config.get('mail');

		await Mail.send(
			'emails.forgot-password',
			{
				user,
				token,
				url:
					scope === 'admin'
						? `${adminURL}/auth/reset-password`
						: `${webURL}/auth/reset-password`,
			},
			(message) => {
				message.subject(antl('message.auth.passwordRecoveryEmailSubject'));
				message.from(from);
				message.to(user.email);
			},
		);

		return response.status(200).send({ success: true });
	}

	/**
	 * Resets a password through a token
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {object} ctx.auth The Auth object.
	 *
	 * @returns {Response}
	 */
	async resetPassword({ request, response }) {
		const { token, password } = request.all();
		const { from } = Config.get('mail');

		const tokenObject = await Token.query()
			.where('token', token)
			.where('is_revoked', false)
			// tokens last up to 1 day
			.where(
				'created_at',
				'>=',
				dayjs()
					.subtract(24, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
			)
			.first();

		if (!tokenObject || tokenObject.type !== 'reset-pw') {
			// unauthorized response.
			return response
				.status(401)
				.send(errorPayload(errors.INVALID_TOKEN, antl('error.auth.invalidToken')));
		}

		// invalidate token
		await tokenObject.revoke();

		const user = await tokenObject.user().fetch();
		user.merge({ password });
		await user.save();

		await Mail.send('emails.reset-password', { user }, (message) => {
			message.subject(antl('message.auth.passwordRecoveryEmailSubject'));
			message.from(from);
			message.to(user.email);
		});

		return response.status(200).send({ success: true });
	}

	/**
	 * Returns the current logged in user.
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {object} ctx.auth The Auth object.
	 *
	 * @returns {Response}
	 */
	async getMe({ auth }) {
		const user = await auth.getUser();

		return {
			...user.toJSON(),
			password: '',
		};
	}
}

module.exports = AuthController;
