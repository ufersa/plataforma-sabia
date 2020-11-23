/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TechnologyQuestion extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}
}

module.exports = TechnologyQuestion;
