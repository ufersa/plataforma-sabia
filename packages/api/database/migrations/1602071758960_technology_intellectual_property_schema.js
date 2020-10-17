/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyIntellectualPropertySchema extends Schema {
	up() {
		this.alter('technologies', (table) => {
			table
				.boolean('intellectual_property')
				.notNullable()
				.defaultTo(0);
		});
	}

	down() {
		this.alter('technologies', (table) => {
			table.dropColumn('intellectual_property');
		});
	}
}

module.exports = TechnologyIntellectualPropertySchema;
