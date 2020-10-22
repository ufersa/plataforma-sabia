/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyReviewSchema extends Schema {
	up() {
		this.create('technology_reviews', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.integer('technology_id')
				.unsigned()
				.references('id')
				.inTable('technologies')
				.onDelete('cascade');
			table.text('content').notNullable();
			table.integer('rating').notNullable();
			table.json('positive');
			table.json('negative');
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_reviews');
	}
}

module.exports = TechnologyReviewSchema;
