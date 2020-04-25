/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologySchema extends Schema {
	up() {
		this.create('technologies', (table) => {
			table.increments();
			table.string('title').notNullable();
			table.text('initials').notNullable();
			table.text('description').notNullable();
			table.text('logo').notNullable();
			table.text('site_url');
			table.boolean('private');
			table.text('created_at');
			table.text('updated_at');
		});
	}

	down() {
		this.drop('technologies');
	}
}

module.exports = TechnologySchema;
