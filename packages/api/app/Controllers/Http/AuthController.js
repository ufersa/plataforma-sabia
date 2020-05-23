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
	async register({ request }) {
		const { full_name } = request.only(['full_name']);
		let data = request.only(['first_name', 'last_name', 'email', 'password']);

		if (full_name) {
			const fullNameArray = full_name.split(' ');

			data = {
				...data,
				first_name: fullNameArray[0],
				last_name: fullNameArray[fullNameArray.length - 1],
			};
		}

		const defaultUserRole = await Role.getDefaultUserRole();

		const user = await User.create(data);
		await user.role().associate(defaultUserRole);
		await user.load('role');
		return {
			...user.toJSON(),
			password: '',
		};
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
	async auth({ request, auth }) {
		const { email, password } = request.all();

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
						? `${adminURL}#/auth/reset-password`
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
			message.subject(antl('message.auth.passwordChangedEmailSubject'));
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
