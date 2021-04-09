/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddActiveColumnToServiceSchema extends Schema {
	up() {
		this.table('services', (table) => {
			table
				.boolean('active')
				.after('payment_message')
				.defaultTo(true);
		});
	}

	down() {
		this.table('services', (table) => {
			table.dropColumn('active');
		});
	}
}

module.exports = AddActiveColumnToServiceSchema;
