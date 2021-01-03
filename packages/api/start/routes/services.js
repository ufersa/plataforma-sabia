/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');
Route.get('services', 'ServiceController.index').middleware(['handleParams']);
Route.get('services/:id', 'ServiceController.show').middleware(['handleParams']);
Route.post('services', 'ServiceController.store')
	.middleware(['auth'])
	.validator('StoreService');
Route.put('services/:id', 'ServiceController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_SERVICE, permissions.UPDATE_SERVICES]),
	])
	.validator('UpdateService');
Route.delete('services/:id', 'ServiceController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_SERVICE, permissions.DELETE_SERVICES]),
]);
