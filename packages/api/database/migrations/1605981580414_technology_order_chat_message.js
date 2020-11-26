/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyOrderChatMessages extends Schema {
	up() {
		this.create('technology_order_chat_messages', (table) => {
			table.uuid('id').primary();
			table.uuid('chatId');
			table.integer('type');
			table.integer('fromUserId');
			table.json('content');
			table.json('deleteBy');
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_order_chat_messages');
	}
}

module.exports = TechnologyOrderChatMessages;
