/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const GE = require('@adonisjs/generic-exceptions');

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

	static async create(payload) {
		let modelInstance;
		const role = await this.findBy('role', payload.role);
		if (!role) {
			modelInstance = new Role();
			modelInstance.fill(payload);
			await modelInstance.save();
		}

		return modelInstance;
	}

	static async createMany(payloadArray) {
		if (!Array.isArray(payloadArray)) {
			throw GE.InvalidArgumentException.invalidParameter(
				`${this.name}.createMany expects an array of values`,
				payloadArray,
			);
		}

		const rows = [];
		for (const payload of payloadArray) {
			// eslint-disable-next-line no-await-in-loop
			const row = await this.create(payload);
			if (row) {
				rows.push(row);
			}
		}
		return rows;
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
