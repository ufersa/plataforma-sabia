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
			table
				.boolean('private')
				.notNullable()
				.defaultTo(0);
			table.text('thumbnail');
			table.integer('likes');
			table.boolean('patent');
			table.string('patent_number');
			table.text('primary_purpose');
			table.text('secondary_purpose');
			table.text('application_mode');
			table.text('application_examples');
			table.integer('installation_time');
			table.text('solves_problem');
			table.text('entailes_problem');
			table.text('requirements');
			table.text('risks');
			table.text('contribution');
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
