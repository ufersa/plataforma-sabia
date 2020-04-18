/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use('App/Models/User');
const Mail = use('Adonis/Addons/Mail');
const Config = use('Adonis/Src/Config');

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
	 * Register an user.
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {object} ctx.auth The Auth object.
	 *
	 * @returns {Response}
	 */
	async forgotPassword({ request, response }) {
		const { email, scope } = request.all();

		const user = await User.findByOrFail('email', email);
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
}

module.exports = AuthController;
