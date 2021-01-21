const User = use('App/Models/User');
const Taxonomy = use('App/Models/Taxonomy');
const { roles, technologyStatuses } = require('../../Utils');

const Config = use('Adonis/Src/Config');
const { cnpqBasePath } = Config.get('researcher');

class ResearcherController {
	async index({ request }) {
		const filters = request.all();
		const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
		const users = await User.query()
			.researcher()
			.with('institution')
			.with('areas')
			.with('technologies', (builder) => {
				builder
					.where('status', technologyStatuses.PUBLISHED)
					.wherePivot('role', roles.OWNER)
					.with('terms', (query) => {
						query.where('taxonomy_id', keywordTaxonomy.id);
					});
			})
			.withResearcherFilters(filters)
			.withParams(request, { skipRelationships: ['technologies'] });
		const researchers = users.toJSON().map((user) => ({
			full_name: user.full_name,
			institution: user.institution.name,
			areas: user.areas,
			keywords: user.technologies.map((technology) => technology.terms).flat(1),
			lattes_link: `${cnpqBasePath}/${user.lattes_id}`,
		}));
		return researchers;
	}
}

module.exports = ResearcherController;
