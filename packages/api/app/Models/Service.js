/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Service extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}

	terms() {
		return this.belongsToMany('App/Models/Term');
	}

	serviceOrders() {
		return this.hasMany('App/Models/ServiceOrder');
	}

	/**
	 * Runs the term query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithFilters(query, filters) {
		if (filters.name) {
			query.where('name', 'LIKE', `%${filters.name}%`);
		}
		if (filters.description) {
			query.where('description', 'LIKE', `%${filters.description}%`);
		}

		if (filters.type) {
			const typeList = filters.type?.split(',') || [];
			if (typeList.length) {
				query.whereIn('type', typeList);
			}
		}

		if (filters.measure_unit) {
			const muList = filters.measure_unit?.split(',') || [];
			if (muList.length) {
				query.whereIn('type', muList);
			}
		}

		if (filters.keywords) {
			const keywordsList = filters?.keywords.split(',') || [];
			if (keywordsList.length) {
				query.whereHas('terms', (builder) => {
					builder.whereIn('id', keywordsList);
				});
			}
		}

		if (filters.institution) {
			query.whereHas('user', (builder) => {
				builder.where('institution_id', filters.institution);
			});
		}

		return query;
	}
}

module.exports = Service;
