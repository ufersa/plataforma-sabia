/*
|--------------------------------------------------------------------------
| ServiceSeeder
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

const { serviceOrderStatuses } = require('../../app/Utils');

class ServiceSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};
		const testingUser = await User.findBy('email', 'sabiatestinge2e@gmail.com');
		const institution = await Factory.model('App/Models/Institution').create();
		await testingUser.institution().associate(institution);
		const services = await Factory.model('App/Models/Service').createMany(10);
		const keywords = await Taxonomy.getTaxonomyTerms('KEYWORDS');
		const users = await await User.query()
			.limit(5)
			.fetch();
		await Promise.all(
			services.map(async (service) => {
				// Service
				await service.user().associate(testingUser);
				const keyword = getRandom(keywords);
				const keyword2 = getRandom(keywords);
				const keyword3 = getRandom(keywords);
				await service.keywords().attach([keyword.id, keyword2.id, keyword3.id]);

				// Service Order
				const user = getRandom(users);
				const serviceOrder = await user.serviceOrders().create({
					service_id: service.id,
					quantity: Math.floor(Math.random() * 100) + 1,
					status: serviceOrderStatuses.REQUESTED,
				});

				// Service Order Review
				const serviceOrderReview = await Factory.model(
					'App/Models/ServiceOrderReview',
				).create();
				await serviceOrderReview.serviceOrder().associate(serviceOrder);
				await serviceOrderReview.user().associate(user);
			}),
		);
	}
}

module.exports = ServiceSeeder;
