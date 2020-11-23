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
			permissions.LIST_TECHNOLOGIES_COMMENTS,
		]);

		const technologyPermissions = await Permission.createMany([
			permissions.UPDATE_TECHNOLOGY,
			permissions.DELETE_TECHNOLOGY,
			permissions.LIST_TECHNOLOGY_COMMENTS,
		]);

		const technologyRevisionPermissions = await Permission.createMany([
			permissions.UPDATE_TECHNOLOGY_STATUS,
			permissions.CREATE_TECHNOLOGY_REVISION,
		]);

		const technologyOrderPermissions = await Permission.createMany([
			permissions.CLOSE_TECHNOLOGY_ORDER,
			permissions.CANCEL_TECHNOLOGY_ORDER,
		]);

		/** TECHNOLOGY REVIEW MANAGEMENT */
		const technologyReviewsPermissions = await Permission.createMany([
			permissions.CREATE_TECHNOLOGY_REVIEWS,
			permissions.UPDATE_TECHNOLOGY_REVIEWS,
			permissions.DELETE_TECHNOLOGY_REVIEWS,
		]);

		const technologyReviewPermissions = await Permission.createMany([
			permissions.UPDATE_TECHNOLOGY_REVIEW,
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

		/** USERBOOKMARS MANAGEMENT */
		const bookmarksPermissions = await Permission.createMany([
			permissions.LIST_BOOKMARKS,
			permissions.DELETE_BOOKMARKS,
		]);
		const bookmarkPermissions = await Permission.createMany([
			permissions.LIST_BOOKMARK,
			permissions.DELETE_BOOKMARK,
		]);

		/** UPLOADS MANAGEMENT */
		const uploadsPermissions = await Permission.createMany([
			permissions.CREATE_UPLOADS,
			permissions.DELETE_UPLOADS,
		]);
		const uploadPermissions = await Permission.createMany([permissions.DELETE_UPLOAD]);

		/** INSTITUTION MANAGEMENT */
		const institutionsPermissions = await Permission.createMany([
			permissions.UPDATE_INSTITUTION,
			permissions.DELETE_INSTITUTION,
		]);
		const institutionPermissions = await Permission.createMany([
			permissions.UPDATE_INSTITUTIONS,
			permissions.DELETE_INSTITUTIONS,
		]);

		/** ADMIN ROLE */
		/** The ADMIN user has all permissions */
		const adminPermissionsIds = [
			...rolesPermissions,
			...permissionsPermissions,
			...taxonomiesPermissions,
			...termsPermissions,
			...technologiesPermissions,
			...technologyReviewsPermissions,
			...usersPermissions,
			...bookmarksPermissions,
			...uploadsPermissions,
			...technologyRevisionPermissions,
			...technologyOrderPermissions,
			...institutionsPermissions,
		].map((permission) => permission.id);
		const adminRole = await Role.getRole(roles.ADMIN);
		await adminRole.permissions().attach(adminPermissionsIds);

		/** RESEARCHER ROLE */
		const researcherPermissions = [
			...technologyPermissions,
			...userPermissions,
			...termsPermissions,
			...technologyReviewPermissions,
			...bookmarkPermissions,
			...uploadPermissions,
			...technologyOrderPermissions,
			...institutionPermissions,
		].map((permission) => permission.id);

		const researcherRole = await Role.getRole(roles.RESEARCHER);
		await researcherRole
			.permissions()
			.attach([
				technologiesPermissions[0].id,
				technologyReviewsPermissions[0].id,
				uploadsPermissions[0].id,
				...researcherPermissions,
			]);

		/** REVIEWER ROLE */
		const reviewerPermissions = [...technologyRevisionPermissions].map(
			(permission) => permission.id,
		);

		const reviewerRole = await Role.getRole(roles.REVIEWER);
		await reviewerRole
			.permissions()
			.attach([
				technologiesPermissions[0].id,
				technologyReviewsPermissions[0].id,
				uploadsPermissions[0].id,
				...researcherPermissions,
				...reviewerPermissions,
			]);

		/** DEFAULT_USER ROLE */
		const defaultUserRole = await Role.getRole(roles.DEFAULT_USER);
		await defaultUserRole
			.permissions()
			.attach([
				technologiesPermissions[0].id,
				technologyReviewsPermissions[0].id,
				uploadsPermissions[0].id,
				...researcherPermissions,
			]);
	}
}

module.exports = PermissionSeeder;
