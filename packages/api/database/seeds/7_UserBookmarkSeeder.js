/* eslint-disable no-await-in-loop */
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
		const users = await User.all();
		for (const user of users.rows) {
			const sortedTechIds = [
				technologyIds[Math.floor(Math.random() * technologyIds.length)],
				technologyIds[Math.floor(Math.random() * technologyIds.length)],
				technologyIds[Math.floor(Math.random() * technologyIds.length)],
			];
			await user.bookmarks().attach(sortedTechIds);
		}
	}
}

module.exports = UserBookmarkSeeder;
