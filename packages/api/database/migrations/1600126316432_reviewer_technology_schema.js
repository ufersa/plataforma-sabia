/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReviewerTechnologySchema extends Schema {
	up() {
		this.create('reviewer_technology', (table) => {
			table
				.integer('technology_id')
				.unsigned()
				.references('id')
				.inTable('technologies')
				.onDelete('cascade');
			table
				.integer('reviewer_id')
				.unsigned()
				.references('id')
				.inTable('reviewers');
		});
	}

	down() {
		this.drop('reviewer_technology');
	}
}

module.exports = ReviewerTechnologySchema;
