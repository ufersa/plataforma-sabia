/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyCommentSchema extends Schema {
	up() {
		this.create('technology_comments', (table) => {
			table.increments();
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
			table.text('comment').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_comments');
	}
}

module.exports = TechnologyCommentSchema;
