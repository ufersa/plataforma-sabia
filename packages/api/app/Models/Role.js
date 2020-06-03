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

	static checkRole(userRole, rolesArr) {
		const roles = rolesArr.map((r) => r.toUpperCase());
		return roles.includes(userRole);
	}
}

module.exports = Role;
