/*
|--------------------------------------------------------------------------
| TechnologyOrderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
class TechnologyOrderSeeder {
	async run() {
		const users = await Factory.model('App/Models/User').createMany(5);
		users.map(async (user) => {
			const technology = await Factory.model('App/Models/Technology').create();
			const fakeUser = await Factory.model('App/Models/User').create();
			await technology.users().attach(fakeUser.id);

			const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create();
			await Promise.all([
				technologyOrder.technology().associate(technology),
				technologyOrder.user().associate(user),
			]);
		});
	}
}

module.exports = TechnologyOrderSeeder;
