/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Role extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	users() {
		return this.hasMany('App/Models/User');
	}

	permissions() {
		return this.belongsToMany('App/Models/Permission');
	}

	static async getRole(role) {
		const userRole = this.query();
		if (!Number.isNaN(parseInt(role, 10))) {
			userRole.where({ id: role });
		} else {
			userRole.where({ role: role.toUpperCase() });
		}
		return userRole.firstOrFail();
	}

	static checkRole(userRole, rolesArr) {
		const roles = rolesArr.map((r) => r.toUpperCase());
		return roles.includes(userRole);
	}
}

module.exports = Role;
