/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class IdeaSchema extends Schema {
	up() {
		this.create('ideas', (table) => {
			table.increments();
			table.string('title').notNullable();
			table.text('description').notNullable();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table.timestamps();
		});
	}

	down() {
		this.drop('ideas');
	}
}

module.exports = IdeaSchema;
