/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');
Route.post('announcements', 'AnnouncementController.store')
	.middleware(['auth', 'registrationCompleted:acquire_technology'])
	.validator('StoreAnnouncement');

Route.put('announcements/:id', 'AnnouncementController.update').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_ANNOUNCEMENT]),
]);

Route.delete('announcements/:id', 'AnnouncementController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_ANNOUNCEMENT]),
]);
