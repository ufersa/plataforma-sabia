/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceThumbnailSchema extends Schema {
	up() {
		this.table('services', (table) => {
			// alter table
			table
				.integer('thumbnail_id')
				.unsigned()
				.references('id')
				.inTable('uploads')
				.onUpdate('CASCADE')
				.onDelete('SET NULL');
		});
	}

	down() {
		this.table('services', (table) => {
			// reverse alternations
			table.dropForeign(['thumbnail_id']).dropColumn('thumbnail_id');
		});
	}
}

module.exports = ServiceThumbnailSchema;
