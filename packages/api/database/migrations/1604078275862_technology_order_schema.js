/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { technologyUseStatuses, fundingStatuses, orderStatuses } = require('../../app/Utils');

class TechnologyOrderSchema extends Schema {
	up() {
		this.create('technology_orders', (table) => {
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
			table.integer('quantity').notNullable();
			table.enu('status', Object.values(orderStatuses)).notNullable();
			table.enu('use', Object.values(technologyUseStatuses)).notNullable();
			table.enu('funding', Object.values(fundingStatuses)).notNullable();
			table.text('comment');
			table.text('cancellation_reason');
			table.integer('unit_value');
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_orders');
	}
}

module.exports = TechnologyOrderSchema;
