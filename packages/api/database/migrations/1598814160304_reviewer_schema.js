/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReviewerSchema extends Schema {
	up() {
		this.create('reviewers', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.string('status')
				.notNullable()
				.defaultTo('pending');
			table.timestamps();
		});
	}

	down() {
		this.drop('reviewers');
	}
}

module.exports = ReviewerSchema;
