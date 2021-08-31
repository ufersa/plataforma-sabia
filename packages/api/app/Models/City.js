/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class City extends Model {
	static boot() {
		super.boot();
		this.filters = ['name'];
	}

	static get incrementing() {
		return false;
	}

	static get visible() {
		return ['id', 'name'];
	}

	static get createdAtColumn() {
		return null;
	}

	static get updatedAtColumn() {
		return null;
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
			query.where('name', 'LIKE', `${filter.name}%`);
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
