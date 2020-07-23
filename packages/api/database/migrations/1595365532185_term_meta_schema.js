/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TermMetaSchema extends Schema {
	up() {
		this.create('term_metas', (table) => {
			table.increments();
			table
				.integer('term_id')
				.unsigned()
				.references('id')
				.inTable('terms');
			table.string('meta_key').notNullable();
			table.string('meta_value').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('term_metas');
	}
}

module.exports = TermMetaSchema;
