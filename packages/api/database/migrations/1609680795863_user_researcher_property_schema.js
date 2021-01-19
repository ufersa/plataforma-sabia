/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserResearcherPropertySchema extends Schema {
	up() {
		this.table('users', (table) => {
			table
				.boolean('researcher')
				.notNullable()
				.defaultTo(0);
		});
	}

	down() {
		this.table('users', (table) => {
			table.dropColumn('researcher');
		});
	}
}

module.exports = UserResearcherPropertySchema;
