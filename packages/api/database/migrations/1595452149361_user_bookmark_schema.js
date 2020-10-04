/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserBookmarkSchema extends Schema {
	up() {
		this.create('user_bookmarks', (table) => {
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.integer('technology_id')
				.unsigned()
				.references('id')
				.inTable('technologies');
		});
	}

	down() {
		this.drop('user_bookmarks');
	}
}

module.exports = UserBookmarkSchema;
