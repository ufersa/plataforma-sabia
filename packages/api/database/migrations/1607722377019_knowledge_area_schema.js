/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class KnowledgeAreaSchema extends Schema {
	up() {
		this.create('knowledge_areas', (table) => {
			table
				.bigInteger('knowledge_area_id')
				.unsigned()
				.notNullable()
				.primary();
			table
				.integer('level')
				.unsigned()
				.notNullable();
			table.string('name').notNullable();
			table
				.bigInteger('great_area_id')
				.unsigned()
				.index('great_area_id');
			table
				.foreign('great_area_id')
				.references('knowledge_areas.knowledge_area_id')
				.onDelete('cascade');
			table
				.bigInteger('area_id')
				.unsigned()
				.index('area_id');
			table
				.foreign('area_id')
				.references('knowledge_areas.knowledge_area_id')
				.onDelete('cascade');
			table
				.bigInteger('sub_area_id')
				.unsigned()
				.index('sub_area_id');
			table
				.foreign('sub_area_id')
				.references('knowledge_areas.knowledge_area_id')
				.onDelete('cascade');
			table
				.bigInteger('speciality_id')
				.unsigned()
				.index('speciality_id');
			table
				.foreign('speciality_id')
				.references('knowledge_areas.knowledge_area_id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('knowledge_areas');
	}
}

module.exports = KnowledgeAreaSchema;
