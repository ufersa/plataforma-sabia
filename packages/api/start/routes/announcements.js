/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const {
	getMiddlewarePermissions,
	getMiddlewareRoles,
	roles,
	permissions,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

Route.get('announcements', 'AnnouncementController.index').middleware(['handleParams']);

Route.post('announcements', 'AnnouncementController.store')
	.middleware(['auth', 'registrationCompleted:acquire_technology'])
	.validator('StoreAnnouncement');

Route.put('announcements/:id', 'AnnouncementController.update').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_ANNOUNCEMENT]),
]);

Route.put('announcements/:id/update-status', 'AnnouncementController.updateStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdateAnnouncementStatus');

Route.delete('announcements/:id', 'AnnouncementController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_ANNOUNCEMENT]),
]);
