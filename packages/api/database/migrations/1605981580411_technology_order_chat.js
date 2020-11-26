/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyOrderChat extends Schema {
	up() {
		this.create('technology_order_chats', (table) => {
			table.uuid('id').primary();
			table.integer('lastMessageId');
			table.date('lastMessageDate');
			table.integer('technologyOrderId');
			table.integer('status');
			table.json('lastMessageReadBy');
			table.json('participants');
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_order_chats');
	}
}

module.exports = TechnologyOrderChat;
