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
const { announcementStatuses } = require('../../app/Utils');

class AnnouncementSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};

		const publishedAnnouncements = async () =>
			Factory.model('App/Models/Announcement').createMany(15, {
				status: announcementStatuses.PUBLISHED,
			});

		const pendingAnnouncements = async () =>
			Factory.model('App/Models/Announcement').createMany(15, {
				status: announcementStatuses.PENDING,
			});

		const announcements = (
			await Promise.all([publishedAnnouncements(), pendingAnnouncements()])
		).flat();

		const users = await await User.query()
			.limit(5)
			.fetch();
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
