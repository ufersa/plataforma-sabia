/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const { roles } = require('../../app/Utils');

const Role = use('App/Models/Role');
class RoleSeeder {
	async run() {
		await Role.createMany([
			{
				role: roles.DEFAULT_USER,
				description: 'Usuário comum',
			},
			{
				role: roles.RESEARCHER,
				description: 'Usuário Pesquisador',
			},
			{
				role: roles.INVESTOR,
				description: 'Usuário Investidor',
			},
			{
				role: roles.REVIEWER,
				description: 'Usuário Curador/Revisor',
			},
			{
				role: roles.ADMIN,
				description: 'Usuário Administrador',
			},
		]);
	}
}

module.exports = RoleSeeder;
