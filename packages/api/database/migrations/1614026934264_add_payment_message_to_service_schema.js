/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddPaymentMessageToServiceSchema extends Schema {
	up() {
		this.table('services', (table) => {
			// alter table
			table.text('payment_message').after('measure_unit');
		});
	}

	down() {
		this.table('services', (table) => {
			// reverse alternations
			table.dropColumn('payment_message');
		});
	}
}

module.exports = AddPaymentMessageToServiceSchema;
