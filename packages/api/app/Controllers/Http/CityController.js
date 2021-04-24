/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const City = use('App/Models/City');
// const { cache } = require('../../Utils');

class CityController {
	constructor() {
		this.allowedFilters = [];
		this.oneMonthInSeconds = 24 * 60 * 60 * 30;
	}

	/**
	 * List all cities.
	 * GET /cities
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 */
	async index({ request }) {
		const filters = request.only(this.allowedFilters);
		// const key = cache.generateKey(City.name, filters);

		// return cache.remember(key, this.oneMonthInSeconds, async () => {
		return City.withFilters(filters).withParams(request);
		// });
	}
}

module.exports = CityController;
