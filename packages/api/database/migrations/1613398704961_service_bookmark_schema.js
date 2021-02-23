/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceBookmarkSchema extends Schema {
	up() {
		this.create('service_bookmarks', (table) => {
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.integer('service_id')
				.unsigned()
				.references('id')
				.inTable('services')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('service_bookmarks');
	}
}

module.exports = ServiceBookmarkSchema;
