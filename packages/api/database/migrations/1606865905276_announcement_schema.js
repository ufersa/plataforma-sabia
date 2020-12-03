/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const { announcementStatuses } = require('../../app/Utils');

class AnnouncementSchema extends Schema {
	up() {
		this.create('announcements', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.integer('institution_id')
				.unsigned()
				.references('id')
				.inTable('institutions');
			table.string('announcement_number').notNullable();
			table.string('title').notNullable();
			table.text('description').notNullable();
			table.integer('financial_resources');
			table.string('start_date');
			table.string('end_date');
			table.text('comment');
			table.string('url').notNullable();
			table.enu('status', Object.values(announcementStatuses)).notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('announcements');
	}
}

module.exports = AnnouncementSchema;
