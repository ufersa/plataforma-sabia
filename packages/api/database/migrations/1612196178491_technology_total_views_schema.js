/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyTotalViewsSchema extends Schema {
	up() {
		this.table('technologies', (table) => {
			table
				.integer('total_views')
				.defaultTo(0)
				.notNullable();
		});
	}

	down() {
		this.table('technologies', (table) => {
			table.dropColumn('total_views');
		});
	}
}

module.exports = TechnologyTotalViewsSchema;
