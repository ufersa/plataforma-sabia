const KnowledgeArea = use('App/Models/KnowledgeArea');

class KnowledgeAreaController {
	async show({ params }) {
		const { knowledge_area_id } = params;
		const knowledgeArea = await KnowledgeArea.getKnowledgeArea(knowledge_area_id);
		await knowledgeArea.loadMany(['greatArea', 'area', 'subArea', 'speciality']);
		return knowledgeArea;
	}

	async index({ request }) {
		const filters = request.all();
		return KnowledgeArea.query()
			.withFilters(filters)
			.fetch();
	}
}

module.exports = KnowledgeAreaController;
