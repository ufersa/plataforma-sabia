/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DropReviewerCategorySchema extends Schema {
	up() {
		this.drop('reviewer_categories');
	}

	down() {
		this.dropIfExists('reviewer_categories');
	}
}

module.exports = DropReviewerCategorySchema;
