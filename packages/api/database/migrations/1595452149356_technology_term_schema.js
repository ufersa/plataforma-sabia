/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyTermSchema extends Schema {
	up() {
		this.create('technology_term', (table) => {
			table
				.integer('technology_id')
				.unsigned()
				.index('technology_id');
			table
				.integer('term_id')
				.unsigned()
				.index('term_id');
			table
				.foreign('technology_id')
				.references('technologies.id')
				.onDelete('cascade');
			table
				.foreign('term_id')
				.references('terms.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('technology_term');
	}
}

module.exports = TechnologyTermSchema;
