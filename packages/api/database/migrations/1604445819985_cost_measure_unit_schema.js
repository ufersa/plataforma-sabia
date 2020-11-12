/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CostMeasureUnitSchema extends Schema {
	up() {
		this.table('costs', (table) => {
			table
				.string('measure_unit')
				.notNullable()
				.defaultTo('');
		});
	}

	down() {
		this.table('costs', (table) => {
			table.dropColumn('measure_unit');
		});
	}
}

module.exports = CostMeasureUnitSchema;
