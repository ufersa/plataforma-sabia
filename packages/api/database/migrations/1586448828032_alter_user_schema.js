/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterUserSchema extends Schema {
	up() {
		this.table('users', (table) => {
			// alter table
			table
				.integer('role_id')
				.unsigned()
				.references('id')
				.inTable('roles');
		});
	}

	down() {
		this.table('users', (table) => {
			// reverse alternations
			table.dropForeign('role_id');
			table.dropColumn('role_id');
		});
	}
}

module.exports = AlterUserSchema;
