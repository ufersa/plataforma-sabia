/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyOrderChat extends Schema {
	up() {
		this.create('chats', (table) => {
			table.uuid('id').primary();
			table.integer('object_id');
			table.string('object_type');
			table.string('status');
			table.json('participants');
			table.timestamps();
		});
	}

	down() {
		this.drop('chats');
	}
}

module.exports = TechnologyOrderChat;
