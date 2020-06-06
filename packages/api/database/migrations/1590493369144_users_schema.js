/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsersSchema extends Schema {
	up() {
		this.create('users', (table) => {
			table.increments();
			table
				.string('email', 254)
				.notNullable()
				.unique();
			table
				.enu('status', ['pending', 'verified'])
				.defaultTo('pending')
				.notNullable();
			table.string('password', 60).notNullable();
			table.string('first_name');
			table.string('last_name');
			table.string('company');
			table
				.integer('role_id')
				.unsigned()
				.references('id')
				.inTable('roles');
			table.timestamps();
		});
	}

	down() {
		this.drop('users');
	}
}

module.exports = UsersSchema;
