/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceTermSchema extends Schema {
	up() {
		this.create('service_term', (table) => {
			table
				.integer('service_id')
				.unsigned()
				.index('service_id');
			table
				.integer('term_id')
				.unsigned()
				.index('term_id');
			table
				.foreign('service_id')
				.references('services.id')
				.onDelete('cascade');
			table
				.foreign('term_id')
				.references('terms.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('service_term');
	}
}

module.exports = ServiceTermSchema;
