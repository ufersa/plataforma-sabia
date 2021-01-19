/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReviewerCategorySchema extends Schema {
	up() {
		this.create('reviewer_categories', (table) => {
			table
				.integer('reviewer_id')
				.unsigned()
				.references('id')
				.inTable('reviewers');
			table
				.integer('term_id')
				.unsigned()
				.references('id')
				.inTable('terms');
		});
	}

	down() {
		this.dropIfExists('reviewer_categories');
	}
}

module.exports = ReviewerCategorySchema;
