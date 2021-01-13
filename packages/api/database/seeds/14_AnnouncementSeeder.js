/*
|--------------------------------------------------------------------------
| AnnouncementSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const Institution = use('App/Models/Institution');
const Taxonomy = use('App/Models/Taxonomy');

class AnnouncementSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};

		const announcements = await Factory.model('App/Models/Announcement').createMany(30);
		const users = await User.all();
		const institutions = await Institution.all();
		const keywords = await Taxonomy.getTaxonomyTerms('KEYWORDS');

		await Promise.all(
			announcements.map(async (announcement) => {
				const user = getRandom(users);
				const institution = getRandom(institutions);
				const keyword = getRandom(keywords);
				const keyword2 = getRandom(keywords);
				const keyword3 = getRandom(keywords);
				await announcement.user().associate(user);
				await announcement.institution().associate(institution);
				return announcement.terms().attach([keyword.id, keyword2.id, keyword3.id]);
			}),
		);
	}
}

module.exports = AnnouncementSeeder;
