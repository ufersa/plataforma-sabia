/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Revision extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	reviewer() {
		return this.belongsTo('App/Models/Reviewer');
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}

	attachment() {
		return this.belongsTo('App/Models/Upload', 'attachment_id');
	}

	/**
	 * Runs the revision query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} request The request object.
	 * @returns {object}
	 */
	static async scopeWithFilters(query, request) {
		const filters = request.all();

		if (filters.assessment) {
			const assessmentList = filters.assessment ? filters.assessment.split(',') : [];
			if (assessmentList && assessmentList.length) {
				query.whereIn('assessment', assessmentList);
			}
		}
	}

	/**
	 * Query scope to get the technology
	 *
	 * @param {object} query The query object.
	 * @param {number} technology_id Technology ID.
	 * @returns {object}
	 */
	static scopeGetTechnology(query, technology_id) {
		return query.where({ technology_id });
	}

	/**
	 * Query scope to get the reviewer
	 *
	 * @param {object} query The query object.
	 * @param {number} reviewer_id Reviewer Id
	 * @returns {object}
	 */
	static scopeGetReviewer(query, reviewer_id) {
		return query.where({ reviewer_id });
	}
}

module.exports = Revision;
