/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyUserSchema extends Schema {
	up() {
		this.create('technology_user', (table) => {
			table
				.integer('technology_id')
				.unsigned()
				.references('id')
				.inTable('technologies');
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.string('role')
				.notNullable()
				.defaultTo('OWNER');
		});
	}

	down() {
		this.drop('technology_user');
	}
}

module.exports = TechnologyUserSchema;
