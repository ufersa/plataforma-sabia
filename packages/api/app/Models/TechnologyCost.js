/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TechnologyCost extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}

	costs() {
		return this.hasMany('App/Models/Cost');
	}

	/**
	 * Runs the technology costs query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithFilters(query, filters) {
		const technologyId = Number(filters.technologyId);
		if (technologyId) {
			query.where({ technology_id: technologyId });
		}

		return query.with('costs');
	}
}

module.exports = TechnologyCost;
