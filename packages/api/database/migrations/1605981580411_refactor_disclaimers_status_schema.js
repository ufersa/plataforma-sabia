/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { disclaimersTypes } = require('../../app/Utils');

class RefactorDisclaimersStatusSchema extends Schema {
	up() {
		this.alter('disclaimers', (table) => {
			// alter table
			table
				.enu('type', Object.values(disclaimersTypes))
				.defaultTo(disclaimersTypes.PRIVACYPOLICY)
				.notNullable()
				.alter();
		});
	}

	down() {
		this.alter('disclaimers', (table) => {
			// reverse alternations
			table.dropColumn('type');
		});
	}
}

module.exports = RefactorDisclaimersStatusSchema;
