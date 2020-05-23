/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyUserSchema extends Schema {
	up() {
		this.create('technology_user', (table) => {
			table.increments();
			table
				.integer('technology_id')
				.unsigned()
				.index('technology_id');
			table
				.integer('user_id')
				.unsigned()
				.index('user_id');
			table.string('role').notNullable();
			table
				.foreign('technology_id')
				.references('technologies.id')
				.onDelete('cascade');
			table
				.foreign('user_id')
				.references('users.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('technology_user');
	}
}

module.exports = TechnologyUserSchema;
