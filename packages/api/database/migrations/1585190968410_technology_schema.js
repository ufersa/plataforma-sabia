/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologySchema extends Schema {
	up() {
		this.create('technologies', (table) => {
			table.increments();
			table.string('name').notNullable();
			table.text('description').notNullable();
			table.text('image').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('technologies');
	}
}

module.exports = TechnologySchema;
