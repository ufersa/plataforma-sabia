/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Cost extends Model {
	technologyCost() {
		return this.belongsTo('App/Models/TechnologyCost');
	}
}

module.exports = Cost;
