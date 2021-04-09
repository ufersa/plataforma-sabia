/*
|--------------------------------------------------------------------------
| InstitutionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');

class InstitutionSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};
		const institutions = await Factory.model('App/Models/Institution').createMany(15);
		const users = await await User.query()
			.limit(5)
			.fetch();
		await Promise.all(
			institutions.map(async (institution) => {
				const user = getRandom(users);
				await institution.responsible().associate(user);
			}),
		);
	}
}

module.exports = InstitutionSeeder;
