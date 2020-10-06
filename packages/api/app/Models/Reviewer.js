/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const CE = require('@adonisjs/lucid/src/Exceptions');

class Reviewer extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}

	categories() {
		return this.belongsToMany('App/Models/Term').pivotTable('reviewer_categories');
	}

	technologies() {
		return this.belongsToMany('App/Models/Technology');
	}

	revisions() {
		return this.hasMany('App/Models/Revision');
	}

	/**
	 * Gets a reviewer by your user
	 *
	 * @param {object} user Reviewer User.
	 * @returns {Reviewer}
	 */
	static async getReviewer(user) {
		const reviewer = await this.query()
			.where({ user_id: user.id })
			.first();

		if (!reviewer) {
			throw CE.ModelNotFoundException.raise('Reviewer');
		}
		return reviewer;
	}

	async isReviewer(technology) {
		const result = await this.technologies()
			.where({
				technology_id: technology.id,
			})
			.first();
		return result != null;
	}
}

module.exports = Reviewer;
