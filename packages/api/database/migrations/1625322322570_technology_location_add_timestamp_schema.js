/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyLocationChangeSchema extends Schema {
	up() {
		this.table('technology_location', (table) => {
			// alter table
			table.timestamps();
		});
	}

	down() {
		this.table('technology_location', (table) => {
			// reverse alternations
			table.dropColumn('created_at');
			table.dropColumn('updated_at');
		});
	}
}

module.exports = TechnologyLocationChangeSchema;
