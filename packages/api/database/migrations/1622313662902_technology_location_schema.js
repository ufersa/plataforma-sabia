/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyLocationSchema extends Schema {
	up() {
		this.create('technology_location', (table) => {
			table
				.integer('technology_id')
				.unsigned()
				.references('id')
				.inTable('technologies')
				.onDelete('cascade');
			table
				.integer('location_id')
				.unsigned()
				.references('id')
				.inTable('locations')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('technology_location');
	}
}

module.exports = TechnologyLocationSchema;
