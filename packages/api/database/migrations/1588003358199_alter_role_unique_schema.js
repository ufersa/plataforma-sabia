/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterRoleUniqueSchema extends Schema {
	up() {
		this.table('roles', (table) => {
			table.unique('role');
		});
	}

	down() {
		this.table('roles', (table) => {
			table.dropUnique('role');
		});
	}
}

module.exports = AlterRoleUniqueSchema;
