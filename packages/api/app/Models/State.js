/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class State extends Model {
	cities() {
		return this.hasMany('App/Models/City');
	}
}

module.exports = State;
