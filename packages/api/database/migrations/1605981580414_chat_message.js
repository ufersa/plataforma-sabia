/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChatMessages extends Schema {
	up() {
		this.create('chat_messages', (table) => {
			table.increments();
			table
				.uuid('chat_id')
				.references('id')
				.inTable('chats')
				.onUpdate('cascade')
				.onDelete('cascade');
			table.string('type');
			table.integer('from_user_id');
			table.json('content');
			table.timestamps();
		});
	}

	down() {
		this.drop('chat_messages');
	}
}

module.exports = ChatMessages;
