/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PermissionRoleSchema extends Schema {
	up() {
		this.create('permission_role', (table) => {
			table
				.integer('role_id')
				.unsigned()
				.index('role_id');
			table
				.integer('permission_id')
				.unsigned()
				.index('permission_id');
			table
				.foreign('role_id')
				.references('roles.id')
				.onDelete('cascade');
			table
				.foreign('permission_id')
				.references('permissions.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('permission_role');
	}
}

module.exports = PermissionRoleSchema;
