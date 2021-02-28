/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceLikesSchema extends Schema {
	up() {
		this.table('services', (table) => {
			// alter table
			table
				.integer('likes')
				.notNullable()
				.defaultTo(0);
		});
	}

	down() {
		this.table('services', (table) => {
			// reverse alternations
			table.dropColumn('likes');
		});
	}
}

module.exports = ServiceLikesSchema;
