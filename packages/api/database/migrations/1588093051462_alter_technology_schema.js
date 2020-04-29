/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterTechnologySchema extends Schema {
	up() {
		// Delete columns
		this.table('technologies', (table) => {
			table.dropColumn('initials');
			table.dropColumn('site_url');
			table.dropColumn('logo');
			table.dropColumn('created_at');
			table.dropColumn('updated_at');
			table.dropColumn('private');
		});
		// Add Columns
		this.table('technologies', (table) => {
			table.string('site_url');
			table.boolean('private').notNullable();
			table.string('logo').notNullable();
			table.string('category').notNullable();
			table.float('price').notNullable();
			table.string('place').notNullable();
			table.datetime('date').notNullable();
			table.integer('likes').notNullable();
			table.integer('weeks').notNullable();
			table.string('region').notNullable();
			table.timestamps();
		});
	}

	down() {
		// Delete previously added columns
		this.table('technologies', (table) => {
			table.dropColumn('site_url');
			table.dropColumn('private');
			table.dropColumn('logo');
			table.dropColumn('category');
			table.dropColumn('price');
			table.dropColumn('place');
			table.dropColumn('date');
			table.dropColumn('likes');
			table.dropColumn('weeks');
			table.dropColumn('region');
			table.dropColumn('created_at');
			table.dropColumn('updated_at');
		});
		// Revert columns
		this.table('technologies', (table) => {
			table.string('initials');
			table.text('site_url');
			table.text('logo').notNullable();
			table.text('created_at');
			table.text('updated_at');
			table.boolean('private');
		});
	}
}

module.exports = AlterTechnologySchema;
