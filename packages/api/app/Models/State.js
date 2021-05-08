/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class State extends Model {
	constructor() {
		super();
		this.filters = ['name'];
	}

	static get incrementing() {
		return false;
	}

	static get visible() {
		return ['id', 'name', 'initials'];
	}

	/**
	 * Runs the query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filter The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithFilters(query, filter) {
		if (filter.name) {
			query.where((builder) => {
				builder
					.where('name', 'LIKE', `${filter.name}%`)
					.orWhere('initials', 'LIKE', `${filter.name}%`);
			});
		}

		return query;
	}

	/**
	 * Every state has many cities.
	 *
	 * @returns {Model} State Model
	 */
	cities() {
		return this.hasMany('App/Models/City');
	}
}

module.exports = State;
