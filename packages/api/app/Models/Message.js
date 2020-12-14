/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Message extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	user() {
		return this.belongsTo('App/Models/User');
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
		if (filters.subject) {
			query.where('subject', 'LIKE', `%${filters.subject}%`);
		}
		if (filters.content) {
			query.where('content', 'LIKE', `%${filters.content}%`);
		}

		if (filters.status) {
			const statusList = filters.status?.split(',') || [];
			if (statusList.length) {
				query.whereIn('status', statusList);
			}
		}

		if (filters.type) {
			const typeList = filters.type?.split(',') || [];
			if (typeList.length) {
				query.whereIn('type', typeList);
			}
		}

		return query;
	}
}

module.exports = Message;
