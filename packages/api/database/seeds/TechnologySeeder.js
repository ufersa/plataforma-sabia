/* eslint-disable no-await-in-loop */
/*
|--------------------------------------------------------------------------
| TechnologySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Taxonomy = use('App/Models/Taxonomy');

class TechnologySeeder {
	async run() {
		const technologies = await Factory.model('App/Models/Technology').createMany(5);
		const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
		const classificationTerms = await Taxonomy.getTaxonomyTerms('CLASSIFICATION');
		const stageTerms = await Taxonomy.getTaxonomyTerms('STAGE');
		const dimensionTerms = await Taxonomy.getTaxonomyTerms('DIMENSION');
		const categoryTerms = await Taxonomy.getTaxonomyTerms('CATEGORY');
		const targetAudienceTerms = await Taxonomy.getTaxonomyTerms('TARGET_AUDIENCE');
		const financingTypesTerms = await Taxonomy.getTaxonomyTerms('FINANCING_TYPES');
		for (const technology of technologies) {
			/** Create KEYWORDS in Technologies */
			const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
			await keywordTaxonomy.terms().saveMany(keywordTerms);
			await technology.terms().attach(keywordTerms.map((keywordTerm) => keywordTerm.id));

			/** Create a CLASSIFICATION in Technology */
			const classificationTerm =
				classificationTerms.rows[
					Math.floor(Math.random() * classificationTerms.rows.length)
				];
			await technology.terms().attach([classificationTerm.id]);

			/** Create a STAGE in Technology */
			const stageTerm = stageTerms.rows[Math.floor(Math.random() * stageTerms.rows.length)];
			await technology.terms().attach([stageTerm.id]);

			/** Create a DIMENSION in Technology */
			const dimensionTerm =
				dimensionTerms.rows[Math.floor(Math.random() * dimensionTerms.rows.length)];
			await technology.terms().attach([dimensionTerm.id]);

			/** Create a CATEGORY in Technology */
			const categoryTerm =
				categoryTerms.rows[Math.floor(Math.random() * categoryTerms.rows.length)];
			await technology.terms().attach([categoryTerm.id]);

			/** Create a SUBCATEGORY in Technology */
			const subCategoryTerms = await Taxonomy.getTaxonomyTerms('CATEGORY', categoryTerm.id);
			const subCategoryTerm =
				subCategoryTerms.rows[Math.floor(Math.random() * subCategoryTerms.rows.length)];
			await technology.terms().attach([subCategoryTerm.id]);

			/** Create a TARGET_AUDIENCE in Technology * */
			const targetAudienceTerm =
				targetAudienceTerms.rows[
					Math.floor(Math.random() * targetAudienceTerms.rows.length)
				];
			await technology.terms().attach([targetAudienceTerm.id]);

			/** Create a FINANCING_TYPES in Technology * */
			const financingTypesTerm =
				financingTypesTerms.rows[
					Math.floor(Math.random() * financingTypesTerms.rows.length)
				];
			await technology.terms().attach([financingTypesTerm.id]);
		}
	}
}

module.exports = TechnologySeeder;
