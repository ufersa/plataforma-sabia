/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Role extends Model {
	users() {
		return this.hasMany('App/Models/User');
	}

	permissions() {
		return this.belongsToMany('App/Models/Permission');
	}

	static getRole(role) {
		return this.query()
			.where('role', role.toUpperCase())
			.first();
	}
}

module.exports = Role;
