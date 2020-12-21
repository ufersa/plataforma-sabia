/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TechnologyQuestion extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}

	/**
	 * Runs the technology query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} request The request object.
	 * @returns {object}
	 */
	static async scopeWithFilters(query, request) {
		const filters = request.all();
		if (filters.status) {
			const statusList = filters.status?.split(',') || [];
			if (statusList.length) {
				query.whereIn('status', statusList);
			}
		}
	}
}

module.exports = TechnologyQuestion;
