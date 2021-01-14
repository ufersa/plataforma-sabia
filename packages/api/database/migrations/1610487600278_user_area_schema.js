/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserAreaSchema extends Schema {
	up() {
		this.create('user_areas', (table) => {
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table
				.bigInteger('knowledge_area_id')
				.unsigned()
				.references('knowledge_area_id')
				.inTable('knowledge_areas');
		});
	}

	down() {
		this.drop('user_areas');
	}
}

module.exports = UserAreaSchema;
