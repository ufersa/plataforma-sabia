/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InstitutionSlugSchema extends Schema {
	up() {
		this.alter('institutions', (table) => {
			// alter table
			table
				.string('slug')
				.after('initials')
				.unique();
		});
	}

	down() {
		this.alter('institutions', (table) => {
			// alter table
			table.dropColumn('slug');
		});
	}
}

module.exports = InstitutionSlugSchema;
