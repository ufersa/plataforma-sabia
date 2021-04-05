/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const { serviceOrderStatuses } = require('../../app/Utils');

class AddCloseStatusToServiceOrderSchema extends Schema {
	up() {
		this.alter('service_orders', (table) => {
			// alter table
			table
				.enu('status', Object.values(serviceOrderStatuses))
				.defaultTo(serviceOrderStatuses.REQUESTED)
				.notNullable()
				.alter();
		});
	}

	down() {
		this.alter('service_orders', (table) => {
			// reverse alternations
			table
				.enu('status', [
					serviceOrderStatuses.REQUESTED,
					serviceOrderStatuses.PERFORMED,
					serviceOrderStatuses.CANCELED,
				])
				.defaultTo(serviceOrderStatuses.REQUESTED)
				.notNullable()
				.alter();
		});
	}
}

module.exports = AddCloseStatusToServiceOrderSchema;
