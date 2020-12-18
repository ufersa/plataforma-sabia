/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const { messageStatuses, messagesTypes } = require('../../app/Utils');

class MessageSchema extends Schema {
	up() {
		this.create('messages', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('SET NULL');
			table.string('subject').notNullable();
			table.text('content').notNullable();
			table
				.enu('status', Object.values(messageStatuses))
				.defaultTo(messageStatuses.NEW)
				.notNullable();
			table.enu('type', Object.values(messagesTypes)).notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('messages');
	}
}

module.exports = MessageSchema;
