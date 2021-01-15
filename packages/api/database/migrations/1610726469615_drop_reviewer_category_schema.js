/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DropReviewerCategorySchema extends Schema {
	up() {
		this.drop('reviewer_categories');
	}

	down() {}
}

module.exports = DropReviewerCategorySchema;
