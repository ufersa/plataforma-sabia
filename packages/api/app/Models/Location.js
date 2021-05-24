/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Location extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	/**
	 * Runs the location query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} request The request object.
	 * @returns {object}
	 */
	static async scopeWithFilters(query, request) {
		const filters = request.all();

		if (filters.city_id) {
			query.where({ city_id: filters.city_id });
		}
	}

	/**
	 * Every location has a city.
	 *
	 * @returns {Model} City Model
	 */
	city() {
		return this.belongsTo('App/Models/City');
	}
}

module.exports = Location;
