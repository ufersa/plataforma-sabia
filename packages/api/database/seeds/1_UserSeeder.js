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

class UserSeeder {
	async run() {
		await Factory.model('App/Models/User').createMany(10);

		await User.create({
			email: 'sabiatestinge2e@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'LastName',
			status: 'verified',
			company: 'UFERSA',
		});

		await User.create({
			email: 'sabiatestinge2eresetpw@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'ResetPassword',
			status: 'verified',
			company: 'UFPB',
		});

		await User.create({
			email: 'sabiatestinge2eprofile@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'ResetPassword',
			status: 'verified',
			company: 'UFRN',
		});

		await User.create({
			email: 'sabiatestingadmin@gmail.com',
			password: 'sabiatesting',
			first_name: 'AdminName',
			last_name: 'AdminLastName',
			status: 'verified',
			role: 'ADMIN',
			company: 'UFPA',
		});
	}
}

module.exports = UserSeeder;
