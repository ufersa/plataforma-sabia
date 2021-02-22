/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCommentToServiceOrderSchema extends Schema {
	up() {
		this.table('service_orders', (table) => {
			// alter table
			table.text('comment');
		});
	}

	down() {
		this.table('service_orders', (table) => {
			// reverse alternations
			table.dropColumn('comment');
		});
	}
}

module.exports = AddCommentToServiceOrderSchema;
