/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

Route.get('messages', 'MessageController.index').middleware(['auth', 'handleParams']);
Route.get('messages/new', 'MessageController.getCountNewMessages').middleware(['auth']);
Route.get('messages/:id', 'MessageController.show').middleware(['auth', 'handleParams']);
Route.post('messages', 'MessageController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('storeMessage');
Route.put('messages/mark-as-read', 'MessageController.markAsRead')
	.middleware(['auth'])
	.validator('markMessages');
Route.put('messages/mark-as-new', 'MessageController.markAsNew')
	.middleware(['auth'])
	.validator('markMessages');
Route.delete('messages', 'MessageController.destroyMany')
	.middleware(['auth', 'handleParams'])
	.validator('DeleteMany');
