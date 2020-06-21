/* eslint-disable no-await-in-loop */
/*
|--------------------------------------------------------------------------
| TechnologyReviewSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Technology = use('App/Models/Technology');
const User = use('App/Models/User');
class TechnologyReviewSeeder {
	async run() {
		const technologies = await Technology.all();
		const users = await User.all();

		const reviews = await Factory.model('App/Models/TechnologyReview').createMany(10);
		for (const review of reviews) {
			await review
				.technology()
				.associate(technologies.rows[Math.floor(Math.random() * technologies.rows.length)]);
			await review
				.user()
				.associate(users.rows[Math.floor(Math.random() * users.rows.length)]);
		}
	}
}

module.exports = TechnologyReviewSeeder;
