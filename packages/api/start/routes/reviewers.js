const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Reviewer Routes */
Route.get('reviewers', 'ReviewerController.index').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.ADMIN]),
]);
Route.get('reviewers/:id', 'ReviewerController.show').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.ADMIN]),
]);
Route.post('reviewers', 'ReviewerController.store')
	.middleware(['auth'])
	.validator('StoreReviewer');
Route.put('reviewers/:id/update-status', 'ReviewerController.updateReviewerStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('updateReviewerStatus');
