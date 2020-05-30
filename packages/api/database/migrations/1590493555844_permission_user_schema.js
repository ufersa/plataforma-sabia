/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PermissionUserSchema extends Schema {
	up() {
		this.create('permission_user', (table) => {
			table
				.integer('permission_id')
				.unsigned()
				.index('permission_id');
			table
				.integer('user_id')
				.unsigned()
				.index('user_id');
			table
				.foreign('permission_id')
				.references('permissions.id')
				.onDelete('cascade');
			table
				.foreign('user_id')
				.references('users.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('permission_user');
	}
}

module.exports = PermissionUserSchema;
