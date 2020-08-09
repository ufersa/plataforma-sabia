/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Uploads */
Route.post('/uploads', 'UploadController.store').middleware([
	'auth',
	getMiddlewarePermissions([permissions.CREATE_UPLOADS]),
	'uploadAuthorization',
]);
Route.delete('/uploads/:id', 'UploadController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_UPLOADS, permissions.DELETE_UPLOAD]),
]);
Route.get('/uploads', 'UploadController.index').middleware(['auth', 'handleParams']);
Route.get('/uploads/:filename', 'UploadController.show');
Route.get('/uploads/:object/:filename', 'UploadController.showWithObject');
