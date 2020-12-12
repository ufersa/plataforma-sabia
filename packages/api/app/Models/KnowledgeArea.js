/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class KnowledgeArea extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	greatArea() {
		return this.belongsTo('App/Models/KnowledgeArea', 'great_area_id', 'knowledge_area_id');
	}

	area() {
		return this.belongsTo('App/Models/KnowledgeArea', 'area_id', 'knowledge_area_id');
	}

	subArea() {
		return this.belongsTo('App/Models/KnowledgeArea', 'sub_area_id', 'knowledge_area_id');
	}

	speciality() {
		return this.belongsTo('App/Models/KnowledgeArea', 'speciality_id', 'knowledge_area_id');
	}

	/**
	 * Runs the knowledge area query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters Filters
	 * @returns {object}
	 */
	static scopeWithFilters(query, filters) {
		if (filters.level) {
			query.where({ level: filters.level });
		}

		if (filters.name) {
			query.where('name', 'like', `%${filters.name}%`);
		}

		if (filters.greatArea) {
			query.where({ great_area_id: filters.greatArea });
		}

		if (filters.area) {
			query.where({ area_id: filters.area });
		}

		if (filters.subArea) {
			query.where({ sub_area_id: filters.subArea });
		}

		if (filters.speciality) {
			query.where({ speciality_id: filters.speciality });
		}

		return query;
	}
}

module.exports = KnowledgeArea;
