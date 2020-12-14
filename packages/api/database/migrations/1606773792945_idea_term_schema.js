/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class IdeaTermSchema extends Schema {
	up() {
		this.create('idea_term', (table) => {
			table
				.integer('idea_id')
				.unsigned()
				.index('idea_id');
			table
				.integer('term_id')
				.unsigned()
				.index('term_id');
			table
				.foreign('idea_id')
				.references('ideas.id')
				.onDelete('cascade');
			table
				.foreign('term_id')
				.references('terms.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('idea_term');
	}
}

module.exports = IdeaTermSchema;
