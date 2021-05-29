/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyLocationSchema extends Schema {
	up() {
		this.create('technology_location', (table) => {
			table
				.integer('technology_id')
				.unsigned()
				.index('technology_id');
			table
				.integer('location_id')
				.unsigned()
				.index('location_id');
			table
				.foreign('technology_id')
				.references('technologies.id')
				.onDelete('cascade');
			table
				.foreign('location_id')
				.references('locations.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('technology_location');
	}
}

module.exports = TechnologyLocationSchema;
