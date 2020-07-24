/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TechnologyCost extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}

	costs() {
		return this.hasMany('App/Models/Cost');
	}
}

module.exports = TechnologyCost;
