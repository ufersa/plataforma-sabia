/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');
Route.get('services', 'ServiceController.index').middleware(['handleParams']);
Route.get('services/orders', 'ServiceController.showServiceOrders').middleware([
	'auth',
	'handleParams',
]);
Route.get('services/:id', 'ServiceController.show').middleware(['handleParams']);
Route.post('services', 'ServiceController.store')
	.middleware(['auth'])
	.validator('StoreService');
Route.post('services/orders', 'ServiceController.storeServiceOrder')
	.middleware(['auth'])
	.validator('StoreServiceOrder');
Route.put('services/:id', 'ServiceController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_SERVICE, permissions.UPDATE_SERVICES]),
	])
	.validator('UpdateService');
Route.put('services/orders/:id', 'ServiceController.updateServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_SERVICE_ORDER, permissions.UPDATE_SERVICE_ORDERS]),
]);
Route.put('services/orders/:id/perform', 'ServiceController.performServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.PERFORM_SERVICE_ORDER]),
]);
Route.delete('services/:id', 'ServiceController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_SERVICE, permissions.DELETE_SERVICES]),
]);
Route.delete('services/orders/:id', 'ServiceController.destroyServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_SERVICE_ORDER, permissions.DELETE_SERVICE_ORDERS]),
]);
