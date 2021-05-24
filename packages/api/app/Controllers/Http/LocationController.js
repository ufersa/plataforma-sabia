/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location');
class LocationController {
	constructor() {
		this.fields = ['place_id', 'address', 'city_id', 'lat', 'lng'];
	}

	/**
	 * Show all locations.
	 * GET /locations
	 */
	async index({ request }) {
		return Location.query()
			.withFilters(request)
			.withParams(request);
	}

	/**
	 * Create a location.
	 * POST /locations
	 */
	async store({ request, response }) {
		const data = request.only(this.fields);

		const location = await Location.create(data);

		await location.load('city');

		return response.status(201).send({ location });
	}
}

module.exports = LocationController;
