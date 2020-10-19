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
			technologies.slice(0, 5).map((technology) =>
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
				/** Create a CLASSIFICATION in Technology */
				const classificationTerm = getRandom(classificationTerms);

				/** Create a STAGE in Technology */
				const stageTerm = getRandom(stageTerms);

				/** Create a DIMENSION in Technology */
				const dimensionTerm = getRandom(dimensionTerms);

				/** Create a CATEGORY in Technology */
				const categoryTerm = getRandom(categoryTerms);

				/** Create a SUBCATEGORY in Technology */
				const subCategoryTerms = await Taxonomy.getTaxonomyTerms('CATEGORY', categoryTerm.id);
				const subCategoryTerm = getRandom(subCategoryTerms);

				/** Create a TARGET_AUDIENCE in Technology * */
				const targetAudienceTerm = getRandom(targetAudienceTerms);

				/** Create a BIOME in Technology * */
				const biomeTerm = getRandom(biomeTerms);

				/** Create a GOVERNMENT_PROGRAM in Technology * */
				const governmentProgramTerm = getRandom(governmentProgramTerms);

				/** Create KEYWORDS in Technologies */
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
