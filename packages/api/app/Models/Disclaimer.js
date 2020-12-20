/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Disclaimer extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	/**
	 * Runs the Disclaimer query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The filters object.
	 * @returns {object}
	 */
	static async scopeWithFilters(query, filters) {
		if (filters.type) {
			const typeList = filters.type?.split(',') || [];
			if (typeList.length) {
				query.whereIn('type', typeList);
			}
		}

		if (filters.version) {
			query.where('version', filters.version);
		}

		if (filters.description) {
			query.where('description', 'like', `%${filters.description}%`);
		}
	}
}

module.exports = Disclaimer;
