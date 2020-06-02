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
		const roles = [
			{
				role: 'DEFAULT_USER',
				description: 'Usuário comum',
			},
			{
				role: 'RESEARCHER',
				description: 'Usuário Pesquisador',
			},
			{
				role: 'INVESTOR',
				description: 'Usuário Investidor',
			},
			{
				role: 'REVIEWER',
				description: 'Usuário Curador/Revisor',
			},
			{
				role: 'ADMIN',
				description: 'Usuário Administrador',
			},
		];
		await Role.createMany(roles);
	}
}

module.exports = RoleSeeder;
