/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleSchema extends Schema {
	up() {
		this.create('roles', (table) => {
			table.increments();
			table.string('role').notNullable();
			table.text('description').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('roles');
	}
}

module.exports = RoleSchema;
