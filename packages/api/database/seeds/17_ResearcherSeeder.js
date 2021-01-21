/*
|--------------------------------------------------------------------------
| ResearcherSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const { technologyStatuses } = require('../../app/Utils');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const KnowledgeArea = use('App/Models/KnowledgeArea');
const Taxonomy = use('App/Models/Taxonomy');

class ResearcherSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};
		const knowledgeAreas = await KnowledgeArea.all();
		const keywords = await Taxonomy.getTaxonomyTerms('KEYWORDS');
		const institution = await Factory.model('App/Models/Institution').create();
		const researchers = await Factory.model('App/Models/User').createMany(10, {
			first_name: 'Researcher',
			researcher: true,
			institution_id: institution.id,
		});
		await Promise.all(
			researchers.map(async (researcher) => {
				// Researcher areas
				const area1 = getRandom(knowledgeAreas);
				const area2 = getRandom(knowledgeAreas);
				const area3 = getRandom(knowledgeAreas);
				researcher
					.areas()
					.attach([
						area1.knowledge_area_id,
						area2.knowledge_area_id,
						area3.knowledge_area_id,
					]);
				// Researcher Technology
				const technology = await Factory.model('App/Models/Technology').create({
					knowledge_area_id: area1.knowledge_area_id,
					status: technologyStatuses.PUBLISHED,
				});
				const keyword = getRandom(keywords);
				const keyword2 = getRandom(keywords);
				const keyword3 = getRandom(keywords);
				await technology.terms().attach([keyword.id, keyword2.id, keyword3.id]);
				await researcher.technologies().attach([technology.id]);
			}),
		);
	}
}

module.exports = ResearcherSeeder;
