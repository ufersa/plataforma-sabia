/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SetSlugAsIndex extends Schema {
	up() {
		this.table('technologies', (table) => {
			table.index('slug');
		});
	}

	down() {
		this.table('slugfies', (table) => {
			table.dropIndex('slug');
		});
	}
}

module.exports = SetSlugAsIndex;
