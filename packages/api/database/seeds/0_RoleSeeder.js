/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('App/Models/Role');
class RoleSeeder {
	async run() {
		/** CREATE DEFAULT USER ROLE */
		const defaultUserRole = {
			role: 'DEFAULT_USER',
			description: 'Usuário comum do sistema',
		};

		await Role.create(defaultUserRole);
	}
}

module.exports = RoleSeeder;
