/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class City extends Model {
	constructor() {
		super();
		this.filters = ['state', 'name'];
	}

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
	 * @param {object} filter The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithFilters(query, filter) {
		if (filter.state) {
			const field = Number.isInteger(Number(filter.state)) ? 'state_id' : 'state_initials';
			query.where({ [field]: filter.state });
		}

		if (filter.name) {
			query.where('name', 'LIKE', `%${filter.name}%`);
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
