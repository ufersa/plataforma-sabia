/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterPermissionUniqueSchema extends Schema {
	up() {
		this.table('permissions', (table) => {
			// alter table
			table.unique('permission');
		});
	}

	down() {
		this.table('permissions', (table) => {
			// reverse alternations
			table.dropUnique('permission');
		});
	}
}

module.exports = AlterPermissionUniqueSchema;
