/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Role extends Model {
	users() {
		return this.belongsToMany('App/Models/User');
	}

	permissions() {
		return this.belongsToMany('App/Models/Permission');
	}
}

module.exports = Role;
