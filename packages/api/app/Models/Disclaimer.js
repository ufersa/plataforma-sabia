/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Disclaimer extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	static async disclaimersMandatotyType(type) {
		return Disclaimer.query()
			.where('required', true)
			.where('type', type)
			.fetch();
	}
}

module.exports = Disclaimer;
