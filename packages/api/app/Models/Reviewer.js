/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

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
}

module.exports = Reviewer;
