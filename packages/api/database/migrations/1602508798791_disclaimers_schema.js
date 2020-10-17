/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DisclaimersSchema extends Schema {
	up() {
		this.create('disclaimers', (table) => {
			table.increments();
			table.timestamps();

			table.text('description').notNullable();
			table.boolean('required').defaultTo(false);
			table
				.enu('type', ['privacypolicy', 'termsOfUseRegister', 'termsOfUseTechnology'])
				.notNullable();
			table.string('version', 254).notNullable();
		});
	}

	down() {
		this.drop('disclaimers');
	}
}

module.exports = DisclaimersSchema;
