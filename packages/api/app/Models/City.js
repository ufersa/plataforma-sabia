/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class City extends Model {
	state() {
		return this.belongsTo('App/Models/State');
	}
}

module.exports = City;
