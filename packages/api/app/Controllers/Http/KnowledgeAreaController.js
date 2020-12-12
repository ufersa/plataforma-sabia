const KnowledgeArea = use('App/Models/KnowledgeArea');
class KnowledgeAreaController {
	async show({ params }) {
		const { knowledge_area_id } = params;
		const area = await KnowledgeArea.query()
			.where({
				knowledge_area_id,
			})
			.first();
		await area.loadMany(['greatArea', 'area', 'subArea', 'speciality']);
		return area;
	}

	async index({ request }) {
		const filters = request.all();
		return KnowledgeArea.query()
			.withFilters(filters)
			.fetch();
	}
}

module.exports = KnowledgeAreaController;
