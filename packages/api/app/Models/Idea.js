/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Idea extends Model {
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

	/**
	 * Runs the term query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithFilters(query, filters) {
		if (filters.title) {
			query.where('title', 'LIKE', `%${filters.title}%`);
		}
		if (filters.description) {
			query.where('description', 'LIKE', `%${filters.description}%`);
		}

		if (filters.keywords) {
			const keywordsList = filters.keywords ? filters.keywords.split(',') : [];
			if (keywordsList && keywordsList.length) {
				query.whereHas('terms', (builder) => {
					builder.whereIn('id', keywordsList);
				});
			}
		}

		return query;
	}
}

module.exports = Idea;
