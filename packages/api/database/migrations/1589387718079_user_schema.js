/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
	up() {
		// Delete columns
		this.table('users', (table) => {
			table.dropColumn('username');
		});
		// Add Columns
		this.table('users', (table) => {
			table.string('first_name');
			table.string('last_name');
		});
	}

	down() {
		// Add columns
		this.table('users', (table) => {
			table.string('username');
		});
		// Delete Columns
		this.table('users', (table) => {
			table.dropColumn('first_name');
			table.dropColumn('last_name');
		});
	}
}

module.exports = UserSchema;
