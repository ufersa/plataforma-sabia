/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Institution extends Model {
	/**
	 * Runs the institution query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} request The request object.
	 * @returns {object}
	 */
	static async scopeWithFilters(query, request) {
		const filters = request.all();

		/**
		 * Input: Rio de Janeiro
		 * Output: %rio%de%janeiro%
		 */
		if (filters.city) {
			const city = filters.city
				.toLowerCase()
				.split(' ')
				.map((word, index) => (index ? `${word}%` : `%${word}%`))
				.join('');
			query.whereRaw('LOWER(city) LIKE :city', { city });
		}
	}

	users() {
		return this.hasMany('App/Models/User');
	}
}

module.exports = Institution;
