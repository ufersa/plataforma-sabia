/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TaxonomiesSchema extends Schema {
	up() {
		this.create('taxonomies', (table) => {
			table.increments();
			table
				.string('taxonomy')
				.notNullable()
				.unique();
			table.text('description').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('taxonomies');
	}
}

module.exports = TaxonomiesSchema;
