/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AnnouncementTermSchema extends Schema {
	up() {
		this.create('announcement_term', (table) => {
			table
				.integer('announcement_id')
				.unsigned()
				.index('announcement_id');
			table
				.integer('term_id')
				.unsigned()
				.index('term_id');
			table
				.foreign('announcement_id')
				.references('announcements.id')
				.onDelete('cascade');
			table
				.foreign('term_id')
				.references('terms.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('announcement_term');
	}
}

module.exports = AnnouncementTermSchema;
