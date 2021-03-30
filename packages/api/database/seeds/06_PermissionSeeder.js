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
			permissions.UPDATE_TECHNOLOGY_ACTIVE,
		]);

		const technologyRevisionPermissions = await Permission.createMany([
			permissions.UPDATE_TECHNOLOGY_STATUS,
			permissions.CREATE_TECHNOLOGY_REVISION,
		]);

		const technologyOrderPermissions = await Permission.createMany([
			permissions.CLOSE_TECHNOLOGY_ORDER,
			permissions.CANCEL_TECHNOLOGY_ORDER,
		]);

		const technologyQuestionPermissions = await Permission.createMany([
			permissions.ANSWER_TECHNOLOGY_QUESTION,
			permissions.DISABLE_TECHNOLOGY_QUESTION,
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
			permissions.UPDATE_INSTITUTIONS,
			permissions.DELETE_INSTITUTIONS,
		]);
		const institutionPermissions = await Permission.createMany([
			permissions.UPDATE_INSTITUTION,
			permissions.DELETE_INSTITUTION,
		]);

		/** IDEA MANAGEMENT */
		const ideaPermissions = await Permission.createMany([
			permissions.UPDATE_IDEA,
			permissions.DELETE_IDEA,
		]);
		/** IDEA ADMIN MANAGEMENT */
		const ideasPermissions = await Permission.createMany([
			permissions.UPDATE_IDEAS,
			permissions.DELETE_IDEAS,
		]);

		/** ANNOUNCEMENT MANAGEMENT */
		const announcementPermissions = await Permission.createMany([
			permissions.UPDATE_ANNOUNCEMENT,
			permissions.DELETE_ANNOUNCEMENT,
		]);

		/** ANNOUNCEMENT ADMIN MANAGEMENT */
		const announcementsPermissions = await Permission.createMany([
			permissions.UPDATE_ANNOUNCEMENTS,
			permissions.DELETE_ANNOUNCEMENTS,
		]);

		/** SERVICE MANAGEMENT */
		const servicePermissions = await Permission.createMany([
			permissions.UPDATE_SERVICE,
			permissions.UPDATE_SERVICE_ACTIVE,
			permissions.DELETE_SERVICE,
		]);
		/** SERVICE ADMIN MANAGEMENT */
		const servicesPermissions = await Permission.createMany([
			permissions.UPDATE_SERVICES,
			permissions.UPDATE_SERVICES_ACTIVE,
			permissions.DELETE_SERVICES,
		]);

		/** SERVICE MANAGEMENT */
		const serviceOrderPermissions = await Permission.createMany([
			permissions.UPDATE_SERVICE_ORDER,
			permissions.PERFORM_SERVICE_ORDER,
			permissions.CLOSE_SERVICE_ORDER,
			permissions.CANCEL_SERVICE_ORDER,
			permissions.DELETE_SERVICE_ORDER,
		]);
		/** SERVICE ADMIN MANAGEMENT */
		const serviceOrdersPermissions = await Permission.createMany([
			permissions.UPDATE_SERVICE_ORDERS,
			permissions.DELETE_SERVICE_ORDERS,
		]);

		/** SERVICE ORDER REVIEW MANAGEMENT */
		const serviceOrderReviewPermissions = await Permission.createMany([
			permissions.CREATE_SERVICE_ORDER_REVIEW,
			permissions.UPDATE_SERVICE_ORDER_REVIEW,
			permissions.DELETE_SERVICE_ORDER_REVIEW,
		]);

		/** ORDER MANAGMENT */
		const ordersPermissions = await Permission.createMany([
			permissions.LIST_TECHNOLOGIES_ORDERS,
			permissions.LIST_SERVICES_ORDERS,
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
			...technologyQuestionPermissions,
			...announcementsPermissions,
			...ideasPermissions,
			...servicesPermissions,
			...serviceOrdersPermissions,
			...serviceOrderReviewPermissions,
			...ordersPermissions,
		].map((permission) => permission.id);
		const adminRole = await Role.getRole(roles.ADMIN);
		await adminRole
			.permissions()
			.attach(
				[
					serviceOrderPermissions[1]?.id || null,
					serviceOrderPermissions[2]?.id || null,
					serviceOrderPermissions[3]?.id || null,
					...adminPermissionsIds,
				].filter(Boolean),
			);

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
			...technologyQuestionPermissions,
			...announcementPermissions,
			...ideaPermissions,
			...servicePermissions,
			...serviceOrderPermissions,
			...serviceOrderReviewPermissions,
		].map((permission) => permission.id);

		const researcherRole = await Role.getRole(roles.RESEARCHER);
		await researcherRole
			.permissions()
			.attach(
				[
					technologiesPermissions[0]?.id || null,
					technologyReviewsPermissions[0]?.id || null,
					uploadsPermissions[0]?.id || null,
					...researcherPermissions,
				].filter(Boolean),
			);

		/** REVIEWER ROLE */
		const reviewerPermissions = [...technologyRevisionPermissions].map(
			(permission) => permission.id,
		);

		const reviewerRole = await Role.getRole(roles.REVIEWER);
		await reviewerRole
			.permissions()
			.attach(
				[
					technologiesPermissions[0]?.id || null,
					technologyReviewsPermissions[0]?.id || null,
					uploadsPermissions[0]?.id || null,
					...researcherPermissions,
					...reviewerPermissions,
				].filter(Boolean),
			);

		/** DEFAULT_USER ROLE */
		const defaultUserRole = await Role.getRole(roles.DEFAULT_USER);
		await defaultUserRole
			.permissions()
			.attach(
				[
					technologiesPermissions[0]?.id || null,
					technologyReviewsPermissions[0]?.id || null,
					uploadsPermissions[0]?.id || null,
					...researcherPermissions,
				].filter(Boolean),
			);
	}
}

module.exports = PermissionSeeder;
