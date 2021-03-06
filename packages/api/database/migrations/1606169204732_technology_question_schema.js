const { questionStatuses } = require('../../app/Utils');

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyQuestionSchema extends Schema {
	up() {
		this.create('technology_questions', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('SET NULL');
			table
				.integer('technology_id')
				.unsigned()
				.references('id')
				.inTable('technologies')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.text('question').notNullable();
			table.text('answer');
			table.enu('status', Object.values(questionStatuses)).notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_questions');
	}
}

module.exports = TechnologyQuestionSchema;
