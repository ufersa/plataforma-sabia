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
		await Factory.model('App/Models/Institution').create(1);

		const users = await Factory.model('App/Models/User').createMany(10);
		const institution = await Factory.model('App/Models/Institution').create();
		await institution.responsible().associate(users[0]);

		const user = await User.find(users[0].id);
		await user.institution().associate(institution);

		await User.create({
			institution_id: institution.id,
			email: 'sabiatestinge2e@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'LastName',
			status: 'verified',
			company: 'UFERSA',
		});

		await User.create({
			institution_id: institution.id,
			email: 'sabiatestinge2eresetpw@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'ResetPassword',
			status: 'verified',
			company: 'UFPB',
		});

		await User.create({
			institution_id: institution.id,
			email: 'sabiatestinge2eprofile@gmail.com',
			password: 'sabiatesting',
			first_name: 'FirstName',
			last_name: 'ResetPassword',
			status: 'verified',
			company: 'UFRN',
		});

		await User.create({
			institution_id: institution.id,
			email: 'sabiatestingadmin@gmail.com',
			password: 'sabiatesting',
			first_name: 'AdminName',
			last_name: 'AdminLastName',
			status: 'verified',
			role: 'ADMIN',
			company: 'UFPA',
			address: 'Rua dos Calafates, 405',
			address2: 'Cond. Green Garden, apt 104',
			birth_date: '2020-12-24T03:00:00.000Z',
			city: 'Mossoró',
			country: 'Brasil',
			cpf: '01234567890',
			district: 'Alto de São Manoel',
			lattes_id: '1',
			phone_number: '99 9 9999-9999',
			state: 'RN',
			zipcode: '12345123',
		});
	}
}

module.exports = UserSeeder;
