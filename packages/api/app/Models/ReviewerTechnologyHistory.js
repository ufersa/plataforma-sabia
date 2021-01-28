/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ReviewerTechnologyHistory extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	static get table() {
		return 'reviewer_technology_history';
	}

	reviewer() {
		return this.belongsTo('App/Models/Reviewer');
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}
}

module.exports = ReviewerTechnologyHistory;
