/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const { reviewerTechnologyHistoryStatuses } = require('../../app/Utils');

class ReviewerTechnologyHistorySchema extends Schema {
	up() {
		this.create('reviewer_technology_history', (table) => {
			table.increments();
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
			table
				.enu('status', Object.values(reviewerTechnologyHistoryStatuses))
				.defaultTo(reviewerTechnologyHistoryStatuses.ASSIGNED)
				.notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('reviewer_technology_history');
	}
}

module.exports = ReviewerTechnologyHistorySchema;
