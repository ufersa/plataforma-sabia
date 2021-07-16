/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StateSchema extends Schema {
	up() {
		this.create('states', (table) => {
			table
				.integer('id')
				.primary()
				.unsigned();
			table.string('name', 30).notNullable();
			table
				.string('initials', 2)
				.notNullable()
				.unique();
		});
	}

	down() {
		this.drop('states');
	}
}

module.exports = StateSchema;
