/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { technologyLocationsTypes } = require('../../app/Utils');

class TechnologyLocationTypeSchema extends Schema {
	up() {
		this.table('technology_location', (table) => {
			// alter table
			table
				.enu('location_type', Object.values(technologyLocationsTypes))
				.defaultTo(technologyLocationsTypes.WHERE_IS_ALREADY_IMPLEMENTED)
				.notNullable();
		});
	}

	down() {
		this.table('technology_location', (table) => {
			// reverse alternations
			table.dropColumn('location_type');
		});
	}
}

module.exports = TechnologyLocationTypeSchema;
