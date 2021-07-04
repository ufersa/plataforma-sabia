/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TechnologyLocation extends Model {
	/* static boot() {
		super.boot();
		this.addTrait('Params');
	} */

	static get table() {
		return 'technology_location';
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}

	location() {
		return this.belongsTo('App/Models/Location');
	}
}

module.exports = TechnologyLocation;
