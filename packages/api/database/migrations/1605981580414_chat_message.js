/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChatMessages extends Schema {
	up() {
		this.create('chat_messages', (table) => {
			table.increments();
			table
				.uuid('chatId')
				.references('id')
				.inTable('chats');
			table.string('type');
			table.integer('fromUserId');
			table.json('content');
			table.timestamps();
		});
	}

	down() {
		this.drop('chat_messages');
	}
}

module.exports = ChatMessages;
