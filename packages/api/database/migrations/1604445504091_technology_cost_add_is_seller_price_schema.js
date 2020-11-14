/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologyCostAddIsSellerPriceSchema extends Schema {
	up() {
		this.table('technology_costs', (table) => {
			table
				.boolean('is_seller')
				.notNullable()
				.defaultTo(1);
			table.integer('price');
		});
	}

	down() {
		this.table('technology_costs', (table) => {
			table.dropColumn('is_seller');
			table.dropColumn('price');
		});
	}
}

module.exports = TechnologyCostAddIsSellerPriceSchema;
