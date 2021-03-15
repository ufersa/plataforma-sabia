const KnowledgeArea = use('App/Models/KnowledgeArea');
const { cache } = require('../../Utils');

class KnowledgeAreaController {
	async show({ params }) {
		const { knowledge_area_id } = params;
		const knowledgeArea = await KnowledgeArea.getKnowledgeArea(knowledge_area_id);
		await knowledgeArea.loadMany(['greatArea', 'area', 'subArea', 'speciality']);
		return knowledgeArea;
	}

	async index({ request }) {
		const filters = request.all();
		const key = cache.generateKey(KnowledgeArea.name, filters);
		const oneDayInSeconds = 60 * 60 * 24;

		return cache.remember(key, oneDayInSeconds, async () => {
			return KnowledgeArea.query()
				.withFilters(filters)
				.fetch();
		});
	}
}

module.exports = KnowledgeAreaController;
