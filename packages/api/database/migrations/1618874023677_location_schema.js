/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LocationSchema extends Schema {
	up() {
		this.create('locations', (table) => {
			table.increments();
			table.text('place_id').notNullable();
			table.text('address').notNullable();
			table.string('state').notNullable();
			table.integer('city_id').notNullable();
			table.string('lat').notNullable();
			table.string('lng').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('locations');
	}
}

module.exports = LocationSchema;
