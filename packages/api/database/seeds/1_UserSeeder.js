/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const Role = use('App/Models/Role');

class UserSeeder {
	async run() {
		await Factory.model('App/Models/User').createMany(10);

		const user = await User.create({
			email: 'sabiatestinge2e@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'LastName',
			status: 'verified',
		});

		const role = await Role.getRole('DEFAULT_USER');

		await role.users().save(user);
	}
}

module.exports = UserSeeder;
