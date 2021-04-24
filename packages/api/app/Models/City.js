/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class City extends Model {
	static get incrementing() {
		return false;
	}

	static get visible() {
		return ['id', 'name'];
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
		if (filters.state) {
			query.where('title', 'LIKE', `%${filters.title}%`);
		}
		if (filters.description) {
			query.where('description', 'LIKE', `%${filters.description}%`);
		}

		if (filters.keywords) {
			const keywordsList = filters?.keywords.split(',') || [];
			if (keywordsList.length) {
				query.whereHas('terms', (builder) => {
					builder.whereIn('id', keywordsList);
				});
			}
		}

		return query;
	}

	/**
	 * Every city has a state.
	 *
	 * @returns {Model} State Model
	 */
	state() {
		return this.belongsTo('App/Models/State');
	}
}

module.exports = City;
