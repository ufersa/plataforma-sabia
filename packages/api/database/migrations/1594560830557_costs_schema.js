/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CostsSchema extends Schema {
	up() {
		this.create('costs', (table) => {
			table.increments();
			table.enu('cost_type', ['DEVELOPMENT_COST', 'IMPLEMENTATION_COST', 'MAINTENANCE_COST']);
			table.text('description');
			table.string('type');
			table.integer('quantity');
			table.integer('value');
			table
				.integer('technology_cost_id')
				.unsigned()
				.references('id')
				.inTable('technology_costs');
			table.timestamps();
		});
	}

	down() {
		this.drop('costs');
	}
}

module.exports = CostsSchema;
