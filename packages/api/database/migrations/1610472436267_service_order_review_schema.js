/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceOrderReviewSchema extends Schema {
	up() {
		this.create('service_order_reviews', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.integer('service_order_id')
				.unsigned()
				.references('id')
				.inTable('service_orders')
				.onDelete('cascade');
			table.text('content').notNullable();
			table.integer('rating').notNullable();
			table.json('positive');
			table.json('negative');
			table.timestamps();
		});
	}

	down() {
		this.drop('service_order_reviews');
	}
}

module.exports = ServiceOrderReviewSchema;
