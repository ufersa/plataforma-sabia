/*
|--------------------------------------------------------------------------
| TechnologySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const { roles } = require('../../app/Utils');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Taxonomy = use('App/Models/Taxonomy');
const User = use('App/Models/User');
const terms = Factory.model('App/Models/Term');

class TechnologySeeder {
	async run() {
		const technologies = await Factory.model('App/Models/Technology').createMany(30);

		// assign 5 technologies to the testing user
		const testingUser = await User.findBy('email', 'sabiatestinge2e@gmail.com');

		await Promise.all(
			technologies.slice(15, 21).map((technology) =>
				technology.users().attach(testingUser.id, (row) => {
					row.role = roles.OWNER;
				}),
			),
		);

		const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
		const classificationTerms = await Taxonomy.getTaxonomyTerms('CLASSIFICATION');
		const stageTerms = await Taxonomy.getTaxonomyTerms('STAGE');
		const dimensionTerms = await Taxonomy.getTaxonomyTerms('DIMENSION');
		const categoryTerms = await Taxonomy.getTaxonomyTerms('CATEGORY');
		const targetAudienceTerms = await Taxonomy.getTaxonomyTerms('TARGET_AUDIENCE');
		const biomeTerms = await Taxonomy.getTaxonomyTerms('BIOME');
		const governmentProgramTerms = await Taxonomy.getTaxonomyTerms('GOVERNMENT_PROGRAM');

		const getRandom = (taxonomyTerms) => {
			const result =
				taxonomyTerms.rows[Math.floor(Math.random() * taxonomyTerms.rows.length)];
			return result.id;
		};

		await Promise.all(
			technologies.map(async (technology) => {
				/** Get a CLASSIFICATION randomly from our terms */
				const classificationTerm = getRandom(classificationTerms);

				/** Get a STAGE randomly from our terms */
				const stageTerm = getRandom(stageTerms);

				/** Get a DIMENSION randomly from our terms */
				const dimensionTerm = getRandom(dimensionTerms);

				/** Get a CATEGORY randomly from our terms */
				const categoryTerm = getRandom(categoryTerms);

				/** Get a SUBCATEGORY randomly from our terms */
				const subCategoryTerms = await Taxonomy.getTaxonomyTerms(
					'CATEGORY',
					categoryTerm.id,
				);
				const subCategoryTerm = getRandom(subCategoryTerms);

				/** Get a TARGET_AUDIENCE randomly from our terms * */
				const targetAudienceTerm = getRandom(targetAudienceTerms);

				/** Get a BIOME randomly from our terms * */
				const biomeTerm = getRandom(biomeTerms);

				/** Get a GOVERNMENT_PROGRAM randomly from our terms * */
				const governmentProgramTerm = getRandom(governmentProgramTerms);

				/** Get KEYWORDS randomly from our terms */
				const keywordTerms = await terms.createMany(5);
				const keywordTerm = keywordTerms.map((keyword) => keyword.id);

				await keywordTaxonomy.terms().saveMany(keywordTerms);
				await technology
					.terms()
					.attach([
						governmentProgramTerm,
						biomeTerm,
						targetAudienceTerm,
						subCategoryTerm,
						categoryTerm,
						dimensionTerm,
						stageTerm,
						classificationTerm,
						...keywordTerm,
					]);
			}),
		);
	}
}

module.exports = TechnologySeeder;
