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

class MessageSeeder {
	async run() {
		const messages = await Factory.model('App/Models/Message').createMany(30);
		const testingUser = await User.findBy('email', 'sabiatestinge2e@gmail.com');

		await Promise.all(
			messages.map(async (message) => {
				await message.user().associate(testingUser);
			}),
		);
	}
}

module.exports = MessageSeeder;
