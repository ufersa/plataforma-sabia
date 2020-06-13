/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const CE = require('@adonisjs/lucid/src/Exceptions');

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
		const userRole = await this.query()
			.where({ role: role.toUpperCase() })
			.first();

		if (!userRole) {
			throw CE.ModelNotFoundException.raise('Role');
		}
		return userRole;
	}

	static checkRole(userRole, rolesArr) {
		const roles = rolesArr.map((r) => r.toUpperCase());
		return roles.includes(userRole);
	}
}

module.exports = Role;
