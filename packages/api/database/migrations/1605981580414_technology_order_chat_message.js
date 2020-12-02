/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyOrderChatMessages extends Schema {
	up() {
		this.create('technology_order_chat_messages', (table) => {
			table.increments();
			table
				.uuid('chatId')
				.references('id')
				.inTable('technology_order_chats');
			table.string('type');
			table.integer('fromUserId');
			table.json('content');
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_order_chat_messages');
	}
}

module.exports = TechnologyOrderChatMessages;
