/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyCostsSchema extends Schema {
	up() {
		this.create('technology_costs', (table) => {
			table.increments();
			table
				.boolean('funding_required')
				.notNullable()
				.defaultTo(0);
			table.string('funding_type');
			table.integer('funding_value');
			table.string('funding_status');
			table.text('notes');
			table
				.integer('technology_id')
				.unique()
				.unsigned()
				.references('id')
				.inTable('technologies')
				.onUpdate('cascade')
				.onDelete('cascade');
			table.timestamps();
		});
	}

	down() {
		this.drop('technology_costs');
	}
}

module.exports = TechnologyCostsSchema;
