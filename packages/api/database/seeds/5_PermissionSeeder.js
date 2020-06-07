/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');
class PermissionSeeder {
	async run() {
		/* Create All Permissions */
		/** ROLE MANAGEMENT */
		const rolesPermissions = await Permission.createMany([
			{
				permission: 'create-roles',
				description: 'Permite criar papeis no sistema',
			},
			{
				permission: 'list-roles',
				description: 'Permite listar papeis no sistema',
			},
			{
				permission: 'details-roles',
				description: 'Permite detalhar papeis no sistema',
			},
			{
				permission: 'update-roles',
				description: 'Permite editar papeis no sistema',
			},
			{
				permission: 'delete-roles',
				description: 'Permite excluir papeis no sistema',
			},
		]);

		/** PERMISSION MANAGEMENT */
		const permissionsPermissions = await Permission.createMany([
			{
				permission: 'create-permissions',
				description: 'Permite criar permissões no sistema',
			},
			{
				permission: 'list-permissions',
				description: 'Permite listar permissões no sistema',
			},
			{
				permission: 'details-permissions',
				description: 'Permite detalhar permissões no sistema',
			},
			{
				permission: 'update-permissions',
				description: 'Permite editar permissões no sistema',
			},
			{
				permission: 'delete-permissions',
				description: 'Permite excluir permissões no sistema',
			},
		]);

		/** TAXONOMY MANAGEMENT */
		const taxonomiesPermissions = await Permission.createMany([
			{
				permission: 'create-taxonomies',
				description: 'Permite criar taxonomias no sistema',
			},
			{
				permission: 'list-taxonomies',
				description: 'Permite listar taxonomias no sistema',
			},
			{
				permission: 'list-taxonomy-terms',
				description: 'Permite listar os termos de uma taxonomia no sistema',
			},
			{
				permission: 'details-taxonomies',
				description: 'Permite detalhar taxonomias no sistema',
			},
			{
				permission: 'update-taxonomies',
				description: 'Permite editar taxonomias no sistema',
			},
			{
				permission: 'delete-taxonomies',
				description: 'Permite excluir taxonomias no sistema',
			},
		]);

		/** TERM MANAGEMENT */
		const termsPermissions = await Permission.createMany([
			{
				permission: 'create-terms',
				description: 'Permite criar termos no sistema',
			},
			{
				permission: 'list-terms',
				description: 'Permite listar termos no sistema',
			},
			{
				permission: 'details-terms',
				description: 'Permite detalhar termos no sistema',
			},
			{
				permission: 'update-terms',
				description: 'Permite editar termos no sistema',
			},
			{
				permission: 'delete-terms',
				description: 'Permite excluir termos no sistema',
			},
		]);

		/** TECHNOLOGY MANAGEMENT */
		const technologiesPermissions = await Permission.createMany([
			{
				permission: 'create-technologies',
				description: 'Permite criar tecnologias no sistema',
			},
			{
				permission: 'list-technologies',
				description: 'Permite listar tecnologias no sistema',
			},
			{
				permission: 'list-technologies-terms',
				description: 'Permite listar termos da tecnologias no sistema',
			},
			{
				permission: 'list-technologies-users',
				description: 'Permite listar os usuários atrelados a tecnologias no sistema',
			},
			{
				permission: 'details-technologies',
				description: 'Permite detalhar tecnologias no sistema',
			},
			{
				permission: 'update-technologies',
				description: 'Permite editar tecnologias no sistema',
			},
			{
				permission: 'associate-technologies-users',
				description: 'Permite associar usuários a uma tecnologia no sistema',
			},
			{
				permission: 'delete-technologies',
				description: 'Permite excluir tecnologias no sistema',
			},
			{
				permission: 'delete-technologies-terms',
				description: 'Permite desassociar um termo de uma tecnlogia',
			},
			{
				permission: 'delete-technologies-users',
				description: 'Permite desassociar um usuário de uma tecnlogia',
			},
		]);

		const technologyPermissions = await Permission.createMany([
			{
				permission: 'update-technology',
				description: 'Permite editar a própria tecnologia no sistema',
			},
			{
				permission: 'associate-technology-users',
				description: 'Permite associar usuários a sua própria tecnologia no sistema',
			},
			{
				permission: 'delete-technology',
				description: 'Permite excluir a própria tecnologia no sistema',
			},
			{
				permission: 'delete-technology-terms',
				description: 'Permite desassociar um termo de sua própria tecnlogia',
			},
			{
				permission: 'delete-technology-users',
				description: 'Permite desassociar um termo de sua própria tecnlogia',
			},
		]);

		/** USER MANAGEMENT */
		const usersPermissions = await Permission.createMany([
			{
				permission: 'create-users',
				description: 'Permite criar usuários no sistema',
			},
			{
				permission: 'list-users',
				description: 'Permite listar usuários no sistema',
			},
			{
				permission: 'details-users',
				description: 'Permite detalhar usuários no sistema',
			},
			{
				permission: 'update-users',
				description: 'Permite editar usuários no sistema',
			},
			{
				permission: 'delete-users',
				description: 'Permite excluir usuários no sistema',
			},
		]);

		const userPermissions = await Permission.createMany([
			{
				permission: 'details-user',
				description: 'Permite detalhar o próprio usuário no sistema',
			},
			{
				permission: 'update-user',
				description: 'Permite editar o próprio usuário no sistema',
			},
			{
				permission: 'delete-user',
				description: 'Permite excluir o próprio usuário no sistema',
			},
		]);

		/** ADMIN ROLE */
		/** The ADMIN user has all permissions */
		const rolesPermissionsIds = rolesPermissions.map((rp) => rp.id);
		const permissionsPermissionsIds = permissionsPermissions.map((pp) => pp.id);
		const taxonomiesPermissionsIds = taxonomiesPermissions.map((taxp) => taxp.id);
		const termsPermissionsIds = termsPermissions.map((termp) => termp.id);
		const technologiesPermissionsIds = technologiesPermissions.map((techp) => techp.id);
		const usersPermissionsIds = usersPermissions.map((up) => up.id);
		const adminRole = await Role.getRole('ADMIN');
		await adminRole
			.permissions()
			.attach([
				...rolesPermissionsIds,
				...permissionsPermissionsIds,
				...taxonomiesPermissionsIds,
				...termsPermissionsIds,
				...technologiesPermissionsIds,
				...usersPermissionsIds,
			]);

		/** RESEARCHER ROLE */
		/** Technology Permissions:
		 * create-technologies,
		 * list-technologies,
		 * list-technologies-terms,
		 * list-technologies-users,
		 * details-technologies,
		 * update-technology,
		 * associate-technology-users,
		 * delete-technology,
		 * delete-technology-terms,
		 * delete-technology-users
		 * User Permissions:
		 * details-user,
		 * update-user,
		 * delete-user,
		 */
		const technologyPermissionsIds = technologyPermissions.map((techp) => techp.id);
		const userPermissionsIds = userPermissions.map((up) => up.id);
		const researcherRole = await Role.getRole('RESEARCHER');
		await researcherRole
			.permissions()
			.attach([
				technologiesPermissions[0].id,
				technologiesPermissions[1].id,
				technologiesPermissions[2].id,
				technologiesPermissions[3].id,
				technologiesPermissions[4].id,
				...technologyPermissionsIds,
				...termsPermissionsIds,
				...userPermissionsIds,
			]);

		/** DEFAULT_USER ROLE */
		/** Technology Permissions:
		 * list-technologies,
		 * list-technologies-terms,
		 * list-technologies-users,
		 * details-technologies,
		 * User Permissions:
		 * details-user,
		 * update-user,
		 * delete-user,
		 */
		const defaultUserRole = await Role.getRole('DEFAULT_USER');
		await defaultUserRole
			.permissions()
			.attach([
				technologiesPermissions[1].id,
				technologiesPermissions[2].id,
				technologiesPermissions[3].id,
				technologiesPermissions[4].id,
				...userPermissionsIds,
			]);
	}
}

module.exports = PermissionSeeder;
