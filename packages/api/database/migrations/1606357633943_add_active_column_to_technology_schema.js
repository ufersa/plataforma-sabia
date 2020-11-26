/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddActiveColumnToTechnologySchema extends Schema {
	up() {
		this.table('technologies', (table) => {
			table
				.boolean('active')
				.after('status')
				.defaultTo(false);
		});
	}

	down() {
		this.table('technologies', (table) => {
			table.dropColumn('active');
		});
	}
}

module.exports = AddActiveColumnToTechnologySchema;
