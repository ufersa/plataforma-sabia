const { serviceOrderStatuses } = require('../../app/Utils');

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceOrderSchema extends Schema {
	up() {
		this.create('service_orders', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.integer('service_id')
				.unsigned()
				.references('id')
				.inTable('services')
				.onDelete('cascade');
			table.integer('quantity').notNullable();
			table.enu('status', Object.values(serviceOrderStatuses)).notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('service_orders');
	}
}

module.exports = ServiceOrderSchema;
