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
}

module.exports = Disclaimer;
