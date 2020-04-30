/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Role extends Model {
	users() {
		return this.hasMany('App/Models/User');
	}

	permissions() {
		return this.belongsToMany('App/Models/Permission');
	}

	static getDefaultUserRole() {
		return this.query()
			.where('role', 'DEFAULT_USER')
			.first();
	}
}

module.exports = Role;
