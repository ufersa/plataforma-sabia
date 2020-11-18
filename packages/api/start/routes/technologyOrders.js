/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

Route.put('orders/:id/close', 'TechnologyOrderController.closeOrder')
	.middleware(['auth', getMiddlewarePermissions([permissions.CLOSE_TECHNOLOGY_ORDER])])
	.validator('CloseOrder');
