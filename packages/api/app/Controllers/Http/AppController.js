class AppController {
	/**
	 * Index route
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {object} ctx.auth The Auth object.
	 *
	 * @returns {Response}
	 */
	async index() {
		return `Welcome to the api!`;
	}
}

module.exports = AppController;
