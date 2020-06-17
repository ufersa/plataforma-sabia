/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TechnologySchema extends Schema {
	up() {
		this.create('technologies', (table) => {
			table.increments();
			table.string('title').notNullable();
			table
				.string('slug')
				.notNullable()
				.index('slug')
				.unique();
			table.text('description').notNullable();
			table.boolean('private').notNullable();
			table.text('thumbnail').notNullable();
			table.integer('likes').notNullable();
			table.boolean('patent').notNullable();
			table.string('patent_number');
			table.text('primary_purpose').notNullable();
			table.text('secondary_purpose');
			table.text('application_mode').notNullable();
			table.text('application_examples');
			table.integer('installation_time').notNullable();
			table.text('solves_problem').notNullable();
			table.text('entailes_problem').notNullable();
			table.text('requirements');
			table.text('risks');
			table.text('contribution').notNullable();
			table
				.string('status')
				.notNullable()
				.defaultTo('DRAFT');
			table.timestamps();
		});
	}

	down() {
		this.drop('technologies');
	}
}

module.exports = TechnologySchema;
