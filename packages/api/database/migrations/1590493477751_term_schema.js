/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TermsSchema extends Schema {
	up() {
		this.create('terms', (table) => {
			table.increments();
			table.string('term').notNullable();
			table.string('slug');
			table
				.integer('parent_id')
				.unsigned()
				.references('id')
				.inTable('terms');
			table
				.integer('taxonomy_id')
				.unsigned()
				.references('id')
				.inTable('taxonomies');
			table.timestamps();
		});
	}

	down() {
		this.drop('terms');
	}
}

module.exports = TermsSchema;
