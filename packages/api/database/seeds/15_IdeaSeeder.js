/*
|--------------------------------------------------------------------------
| IdeaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const Taxonomy = use('App/Models/Taxonomy');

class IdeaSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};

		const ideas = await Factory.model('App/Models/Idea').createMany(30);
		const users = await await User.query()
			.limit(5)
			.fetch();
		const keywords = await Taxonomy.getTaxonomyTerms('KEYWORDS');

		await Promise.all(
			ideas.map(async (idea) => {
				const user = getRandom(users);
				const keyword = getRandom(keywords);
				const keyword2 = getRandom(keywords);
				const keyword3 = getRandom(keywords);
				await idea.user().associate(user);
				await idea.terms().attach([keyword.id, keyword2.id, keyword3.id]);
			}),
		);
	}
}

module.exports = IdeaSeeder;
