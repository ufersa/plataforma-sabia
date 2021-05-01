/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CitySchema extends Schema {
	up() {
		this.create('cities', (table) => {
			table
				.integer('id')
				.primary()
				.unsigned();
			table
				.integer('state_id')
				.unsigned()
				.references('id')
				.inTable('states')
				.notNullable();
			table.string('state_initials', 2).notNullable();
			table.string('name', 50).notNullable();
		});
	}

	down() {
		this.drop('cities');
	}
}

module.exports = CitySchema;
