/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsersInstitutionIdSchema extends Schema {
	up() {
		this.table('users', (table) => {
			table
				.integer('institution_id')
				.unsigned()
				.nullable()
				.references('id')
				.inTable('institutions')
				.after('role_id')
				.onUpdate('CASCADE')
				.onDelete('SET NULL');
		});
	}

	down() {
		this.table('users', (table) => {
			table.dropForeign(['institution_id']).dropColumn('institution_id');
		});
	}
}

module.exports = UsersInstitutionIdSchema;
