/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const { institutionsTypes, institutionsCategories } = require('../../app/Utils');

class InstitutionNewFieldsSchema extends Schema {
	up() {
		this.alter('institutions', (table) => {
			// alter table
			table.string('email');
			table.string('phone_number');
			table.string('website');
			table
				.integer('logo_id')
				.unsigned()
				.references('id')
				.inTable('uploads');
			table
				.enu('type', Object.values(institutionsTypes))
				.defaultTo(institutionsTypes.OTHER)
				.notNullable();
			table
				.enu('category', Object.values(institutionsCategories))
				.defaultTo(institutionsCategories.OTHER)
				.notNullable();
		});
	}

	down() {
		this.alter('institutions', (table) => {
			// alter table
			table.dropColumn('email');
			table.dropColumn('phone_number');
			table.dropColumn('website');
			table.dropForeign(['logo_id']).dropColumn('logo_id');
			table.dropColumn('type');
			table.dropColumn('category');
		});
	}
}

module.exports = InstitutionNewFieldsSchema;
