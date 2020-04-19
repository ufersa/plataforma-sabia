/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use('App/Models/User');
const Mail = use('Adonis/Addons/Mail');
const Config = use('Adonis/Src/Config');
const Token = use('App/Models/Token');
const moment = require('moment');

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
		const data = request.only(['username', 'email', 'password']);

		const user = await User.create(data);

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
	auth({ request, auth }) {
		const { email, password } = request.all();

		return auth.attempt(email, password);
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

		const { token } = await user.generateResetPasswordToken();
		const { adminURL, webURL } = Config.get('app');
		const { from } = Config.get('mail');

		await Mail.send(
			'emails.forgot-password',
			{ user, token, url: scope === 'admin' ? adminURL : webURL },
			(message) => {
				message.subject('Plataforma Sabía - Recuperação de Senha');
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
				moment()
					.subtract(24, 'hours')
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
			message.subject('Plataforma Sabía - Recuperação de Senha');
			message.from(from);
			message.to(user.email);
		});

		return response.status(200).send({ success: true });
	}
}

module.exports = AuthController;
