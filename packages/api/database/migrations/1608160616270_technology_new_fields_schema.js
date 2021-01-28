/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const { technologiesTypes } = require('../../app/Utils');

class TechnologyNewFieldsSchema extends Schema {
	up() {
		this.alter('technologies', (table) => {
			// alter table
			table
				.enu('type', Object.values(technologiesTypes))
				.defaultTo(technologiesTypes.OTHER)
				.notNullable();
			table
				.boolean('public_domain')
				.notNullable()
				.defaultTo(false);
			table
				.bigInteger('knowledge_area_id')
				.unsigned()
				.references('knowledge_area_id')
				.inTable('knowledge_areas');
		});
	}

	down() {
		this.table('technologies', (table) => {
			// reverse alternations
			// alter table
			table.dropColumn('type');
			table.dropColumn('public_domain');
			table.dropForeign(['knowledge_area_id']).dropColumn('knowledge_area_id');
		});
	}
}

module.exports = TechnologyNewFieldsSchema;
