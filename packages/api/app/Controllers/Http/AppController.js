class AppController {
	/**
	 * Register an user.
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {object} ctx.auth The Auth object.
	 *
	 * @returns {Response}
	 */
	async index({ auth }) {
		const user = await auth.getUser();

		return `Hello ${user.username}, welcome to the api!`;
	}
}

module.exports = AppController;
