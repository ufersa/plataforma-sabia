/*
|--------------------------------------------------------------------------
| TechnologyQuestionSeeder
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

class TechnologyQuestionSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};

		const questions = await Factory.model('App/Models/TechnologyQuestion').createMany(30);
		const technologies = await Technology.all();
		const users = await User.all();

		await Promise.all(
			questions.map(async (question) => {
				const user = getRandom(users);
				const technology = getRandom(technologies);
				await question.technology().associate(technology);
				await question.user().associate(user);
			}),
		);
	}
}

module.exports = TechnologyQuestionSeeder;
