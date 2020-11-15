/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Institution routes */

Route.get('institutions', 'InstitutionController.index').middleware(['handleParams', 'auth']);

Route.get('institutions/:id', 'InstitutionController.show').middleware(['handleParams', 'auth']);

Route.post('institutions', 'InstitutionController.store')
	.middleware(['auth'])
	.validator('StoreInstitution');

Route.put('institutions/:id', 'InstitutionController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_INSTITUTION, permissions.UPDATE_INSTITUTIONS]),
	])
	.validator('UpdateInstitution');

Route.delete('institutions/:id', 'InstitutionController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_INSTITUTION, permissions.DELETE_INSTITUTIONS]),
]);
