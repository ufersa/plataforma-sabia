/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleUserSchema extends Schema {
	up() {
		this.create('role_user', (table) => {
			table
				.integer('user_id')
				.unsigned()
				.index('user_id');
			table
				.integer('role_id')
				.unsigned()
				.index('role_id');
			table
				.foreign('user_id')
				.references('users.id')
				.onDelete('cascade');
			table
				.foreign('role_id')
				.references('roles.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('role_user');
	}
}

module.exports = RoleUserSchema;
