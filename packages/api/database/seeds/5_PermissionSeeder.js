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
const { roles, permissions } = require('../../app/Utils');

class PermissionSeeder {
	async run() {
		/* Create All Permissions */

		/** ROLE MANAGEMENT */
		const rolesPermissions = await Permission.createMany([
			permissions.CREATE_ROLES,
			permissions.LIST_ROLES,
			permissions.VIEW_ROLES,
			permissions.UPDATE_ROLES,
			permissions.DELETE_ROLES,
		]);

		/** PERMISSION MANAGEMENT */
		const permissionsPermissions = await Permission.createMany([
			permissions.CREATE_PERMISSIONS,
			permissions.LIST_PERMISSIONS,
			permissions.VIEW_PERMISSIONS,
			permissions.UPDATE_PERMISSIONS,
			permissions.DELETE_PERMISSIONS,
		]);

		/** TAXONOMY MANAGEMENT */
		const taxonomiesPermissions = await Permission.createMany([
			permissions.CREATE_TAXONOMIES,
			permissions.UPDATE_TAXONOMIES,
			permissions.DELETE_TAXONOMIES,
		]);

		/** TERM MANAGEMENT */
		const termsPermissions = await Permission.createMany([
			permissions.CREATE_TERMS,
			permissions.UPDATE_TERMS,
			permissions.DELETE_TERMS,
		]);

		/** TECHNOLOGY MANAGEMENT */
		const technologiesPermissions = await Permission.createMany([
			permissions.CREATE_TECHNOLOGIES,
			permissions.UPDATE_TECHNOLOGIES,
			permissions.DELETE_TECHNOLOGIES,
		]);

		const technologyPermissions = await Permission.createMany([
			permissions.UPDATE_TECHNOLOGY,
			permissions.DELETE_TECHNOLOGY,
		]);

		/** USER MANAGEMENT */
		const usersPermissions = await Permission.createMany([
			permissions.CREATE_USERS,
			permissions.LIST_USERS,
			permissions.VIEW_USERS,
			permissions.UPDATE_USERS,
			permissions.DELETE_USERS,
		]);

		const userPermissions = await Permission.createMany([
			permissions.VIEW_USER,
			permissions.UPDATE_USER,
			permissions.DELETE_USER,
		]);

		/** ADMIN ROLE */
		/** The ADMIN user has all permissions */
		const adminPermissionsIds = [
			...rolesPermissions,
			...permissionsPermissions,
			...taxonomiesPermissions,
			...termsPermissions,
			...technologiesPermissions,
			...usersPermissions,
		].map((permission) => permission.id);
		const adminRole = await Role.getRole(roles.ADMIN);
		await adminRole.permissions().attach(adminPermissionsIds);

		/** RESEARCHER ROLE */
		const researcherPermissions = [
			...technologyPermissions,
			...userPermissions,
			...termsPermissions,
		].map((permission) => permission.id);

		const researcherRole = await Role.getRole(roles.RESEARCHER);
		await researcherRole
			.permissions()
			.attach([technologiesPermissions[0].id, ...researcherPermissions]);

		/** DEFAULT_USER ROLE */
		const defaultUserRole = await Role.getRole(roles.DEFAULT_USER);
		await defaultUserRole
			.permissions()
			.attach([technologiesPermissions[0].id, ...researcherPermissions]);
	}
}

module.exports = PermissionSeeder;
