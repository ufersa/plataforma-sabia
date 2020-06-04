/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');
class RoleSeeder {
	async run() {
		const user = await User.create({
			email: 'sabiatestinge2e@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'LastName',
		});
		user.status = 'verified';
		return user;
	}
}

module.exports = RoleSeeder;
