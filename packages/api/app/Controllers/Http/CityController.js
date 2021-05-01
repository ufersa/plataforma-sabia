/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const City = use('App/Models/City');
const { cache } = require('../../Utils');

class CityController {
	constructor() {
		this.model = City;
		this.allowedFilters = new City().filters;
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
		// This prevents us from having a cache with filters that are useless
		const filters = request.only(this.allowedFilters);
		const key = cache.generateKey(this.model.name, filters);

		return cache.remember(key, this.oneMonthInSeconds, async () => {
			return this.model
				.query()
				.withFilters(filters)
				.orderBy('name')
				.fetch();
		});
	}
}

module.exports = CityController;
