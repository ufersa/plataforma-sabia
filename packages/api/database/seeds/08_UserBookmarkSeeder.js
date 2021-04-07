/*
|--------------------------------------------------------------------------
| UserBookmarkSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Technology = use('App/Models/Technology');
const User = use('App/Models/User');
class UserBookmarkSeeder {
	async run() {
		const technologies = await Technology.all();
		const technologyIds = technologies.rows.map((technology) => technology.id);
		const users = await await User.query()
			.limit(5)
			.fetch();

		await Promise.all(
			users.rows.map(async (user) => {
				const sortedTechIds = [
					technologyIds[Math.floor(Math.random() * technologyIds.length)],
					technologyIds[Math.floor(Math.random() * technologyIds.length)],
					technologyIds[Math.floor(Math.random() * technologyIds.length)],
				];
				await user.technologyBookmarks().attach(sortedTechIds);
			}),
		);
		// syncronize likes in technologies
		// Update likes in technology
		await Promise.all(
			technologyIds.map(async (technologyId) => {
				const technology = await Technology.findOrFail(technologyId);
				const likes = await technology.bookmarkUsers().count('* as likes');
				technology.merge({ likes: likes[0].likes });
				await technology.save();
			}),
		);
	}
}

module.exports = UserBookmarkSeeder;
