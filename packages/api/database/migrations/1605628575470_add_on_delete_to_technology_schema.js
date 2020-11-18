/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddOnDeleteToTechnologySchema extends Schema {
	up() {
		this.alter('technologies', (table) => {
			table.dropForeign(['thumbnail_id']);
			table
				.integer('thumbnail_id')
				.unsigned()
				.references('id')
				.inTable('uploads')
				.onUpdate('CASCADE')
				.onDelete('SET NULL')
				.alter();
		});
	}

	down() {
		this.alter('technologies', (table) => {
			table.dropForeign(['thumbnail_id']);
			table
				.integer('thumbnail_id')
				.unsigned()
				.references('id')
				.inTable('uploads')
				.alter();
		});
	}
}

module.exports = AddOnDeleteToTechnologySchema;
