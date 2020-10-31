/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
/* eslint-disable */
const {
	getMiddlewarePermissions,
	permissions,
	getMiddlewareRoles,
	roles,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Institution routes */

Route.get('institutions', 'InstitutionController.index').middleware(['handleParams']);

Route.post('institutions', 'InstitutionController.store').middleware([
	'auth',
	// getMiddlewarePermissions([permissions.CREATE_TECHNOLOGY_REVIEWS]),
]);
// .validator(
// 'StoreTechnologyReview'
// );

Route.get('institutions/:id', 'InstitutionController.show').middleware(['handleParams']);

Route.put('institutions/:id', 'InstitutionController.update').middleware([
	'auth',
	// getMiddlewarePermissions([
	// 	permissions.UPDATE_TECHNOLOGY_REVIEW,
	// 	permissions.UPDATE_TECHNOLOGY_REVIEWS,
	// ]),
]);
// .validator('UpdateTechnologyReview');

Route.delete('institutions/:id', 'InstitutionController.destroy').middleware([
	'auth',
	// getMiddlewareRoles([roles.ADMIN]),
]);
