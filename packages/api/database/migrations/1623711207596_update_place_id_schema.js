/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UpdatePlaceIdSchema extends Schema {
	up() {
		this.alter('locations', (table) => {
			table
				.text('place_id')
				.nullable()
				.alter();
		});
	}

	down() {
		this.alter('locations', (table) => {
			// reverse alternations
			table
				.text('place_id')
				.notNullable()
				.alter();
		});
	}
}

module.exports = UpdatePlaceIdSchema;
