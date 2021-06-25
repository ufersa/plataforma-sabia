/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location');
const { errors, errorPayload } = require('../../Utils');

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
	 * Show a locations.
	 * GET /locations/:id
	 */
	async show({ request, params }) {
		const { id } = params;
		return Location.query()
			.where({ id })
			.orWhere({ place_id: id })
			.withParams(request);
	}

	/**
	 * Create a location.
	 * POST /locations
	 */
	async store({ request, response }) {
		const data = request.only(this.fields);

		let location = await Location.findBy('place_id', data.place_id);

		if (!location) {
			location = await Location.create(data);
		}

		await location.load('city');

		return response.status(200).send({ location });
	}

	/**
	 * Create a location.
	 * PUT /locations/:id
	 */
	async update({ request, params }) {
		const { id } = params;
		const upLocation = await Location.findOrFail(id);
		const data = request.only(this.fields);
		upLocation.merge(data);
		await upLocation.save();
		await upLocation.load('city');
		return upLocation;
	}

	/**
	 * Delete an location.
	 * DELETE locations/:id
	 */
	async destroy({ request, params, response }) {
		const { id } = params;
		const location = await Location.findOrFail(id);
		const result = await location.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}
}

module.exports = LocationController;
