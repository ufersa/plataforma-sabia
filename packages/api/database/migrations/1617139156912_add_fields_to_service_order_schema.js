/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddFieldsToServiceOrderSchema extends Schema {
	up() {
		this.table('service_orders', (table) => {
			// alter table
			table.integer('unit_value').after('comment');
			table.text('cancellation_reason').after('unit_value');
		});
	}

	down() {
		this.table('service_orders', (table) => {
			// reverse alternations
			table.dropColumn('unit_value');
			table.dropColumn('cancellation_reason');
		});
	}
}

module.exports = AddFieldsToServiceOrderSchema;
