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
				.enu('status', ['pending', 'verified', 'invited'])
				.defaultTo('pending')
				.notNullable();
			table.string('password', 60).notNullable();
			table.string('first_name');
			table.string('last_name');
			table.string('secondary_email');
			table.string('temp_email');
			table.string('company');
			table.string('zipcode');
			table.string('cpf', 11);
			table.string('birth_date');
			table.string('phone_number');
			table.string('lattes_id');
			table.string('address');
			table.string('address2');
			table.string('district');
			table.string('city');
			table.string('state');
			table.string('country');
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
