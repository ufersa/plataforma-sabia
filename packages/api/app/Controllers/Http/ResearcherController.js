const User = use('App/Models/User');
const Taxonomy = use('App/Models/Taxonomy');

class ResearcherController {
	async index({ request }) {
		const filters = request.all();
		const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
		const users = await User.query()
			.where({ researcher: true })
			.with('institution')
			.with('areas')
			.with('technologies', (builder) => {
				builder.where('status', 'published');
				builder.wherePivot('role', 'OWNER');
				builder.with('terms', (builder2) => {
					builder2.where('taxonomy_id', keywordTaxonomy.id);
				});
			})
			.withResearcherFilters(filters)
			.withParams(request, { skipRelationships: ['technologies'] });
		const researchers = users.rows.map((user) => ({
			full_name: user.toJSON().full_name,
			institution: user.toJSON().institution.name,
			areas: user.toJSON().areas,
			keywords: user
				.toJSON()
				.technologies.map((technology) => technology.terms)
				.flat(1),
			lattes_link: `http://lattes.cnpq.br/${user.toJSON().lattes_id}`,
		}));
		return researchers;
	}
}

module.exports = ResearcherController;
