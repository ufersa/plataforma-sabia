/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location');
class LocationController {
	constructor() {
		this.fields = ['place_id', 'address', 'city_id', 'state', 'lat', 'lng'];
	}

	/**
	 * Create a location.
	 * POST /locations
	 */
	async store({ request, response }) {
		const data = request.only(this.fields);

		const location = await Location.create(data);

		return response.status(201).send({ location });
	}
}

module.exports = LocationController;
