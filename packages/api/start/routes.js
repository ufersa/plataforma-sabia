/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const {
	getMiddlewarePermissions,
	permissions,
	getMiddlewareRoles,
	roles,
} = require('../app/Utils/roles_capabilities');

const Route = use('Route');

Route.post('/auth/register', 'AuthController.register').validator('User');
Route.post('/auth/login', 'AuthController.auth').validator('Session');
Route.get('/auth/forgot-password', 'AuthController.forgotPassword').validator('ForgotPassword');
Route.post('/auth/reset-password', 'AuthController.resetPassword').validator('ResetPassword');
Route.post('/auth/confirm-account', 'AuthController.confirmAccount').validator('ConfirmAccount');
Route.post('/auth/resend-confirmation-email', 'AuthController.resendConfirmationEmail');

/** Role Routes */
Route.post('roles', 'RoleController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('StoreRole');
Route.put('roles/:id', 'RoleController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdateRole');
Route.delete('roles/:id', 'RoleController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
Route.get('roles', 'RoleController.index').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
Route.get('roles/:id', 'RoleController.show').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);

/** Permission Routes */
Route.post('permissions', 'PermissionController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('StorePermission');
Route.put('permissions/:id', 'PermissionController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdatePermission');
Route.delete('permissions/:id', 'PermissionController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
Route.get('permissions', 'PermissionController.index').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
Route.get('permissions/:id', 'PermissionController.show').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);

/** Technology routes */
Route.post('technologies', 'TechnologyController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TECHNOLOGIES])])
	.validator('StoreTechnology');

Route.post('technologies/:id/users', 'TechnologyController.associateTechnologyUser').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
Route.put('technologies/:id', 'TechnologyController.update').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
Route.delete('technologies/:id', 'TechnologyController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_TECHNOLOGIES, permissions.DELETE_TECHNOLOGY]),
]);
Route.delete(
	'technologies/:id/users/:idUser',
	'TechnologyController.deleteTechnologyUser',
).middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
Route.delete(
	'technologies/:id/terms/:term',
	'TechnologyController.deleteTechnologyTerm',
).middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
	'handleParams',
]);

Route.get('technologies', 'TechnologyController.index').middleware(['handleParams']);
Route.get('technologies/:id', 'TechnologyController.show').middleware(['handleParams']);

Route.get('technologies/:id/terms', 'TechnologyController.showTechnologyTerms').middleware([
	'auth',
	'handleParams',
]);

Route.get('technologies/:id/users', 'TechnologyController.showTechnologyUsers').middleware([
	'auth',
]);

Route.get('technologies/:id/reviews', 'TechnologyController.showTechnologyReviews').middleware([
	'handleParams',
]);

/** Technology Review routes */
Route.get('technology_reviews', 'TechnologyReviewController.index').middleware(['handleParams']);
Route.post('reviews', 'TechnologyReviewController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TECHNOLOGY_REVIEWS])])
	.validator('StoreTechnologyReview');
Route.get('technology_reviews/:id', 'TechnologyReviewController.show').middleware(['handleParams']);
Route.put('reviews/:id', 'TechnologyReviewController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([
			permissions.UPDATE_TECHNOLOGY_REVIEW,
			permissions.UPDATE_TECHNOLOGY_REVIEWS,
		]),
	])
	.validator('UpdateTechnologyReview');
Route.delete('reviews/:id', 'TechnologyReviewController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);

/** Taxonomy routes */
Route.group(() => {
	Route.post('taxonomies', 'TaxonomyController.store').validator('StoreTaxonomy');
	Route.put('taxonomies/:id', 'TaxonomyController.update').validator('UpdateTaxonomy');
	Route.delete('taxonomies/:id', 'TaxonomyController.destroy');
}).middleware(['auth', getMiddlewareRoles([roles.ADMIN])]);

Route.get('taxonomies', 'TaxonomyController.index').middleware(['handleParams']);
Route.get('taxonomies/:id', 'TaxonomyController.show').middleware(['handleParams']);
Route.get('taxonomies/:id/terms', 'TaxonomyController.showTerms').middleware(['handleParams']);

/** Term routes */
Route.post('terms', 'TermController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TERMS])])
	.validator('StoreTerm');
Route.put('terms/:id', 'TermController.update')
	.middleware(['auth', getMiddlewarePermissions([permissions.UPDATE_TERMS])])
	.validator('UpdateTerm');
Route.put('terms/:id/meta', 'TermController.updateMeta')
	.middleware(['auth', getMiddlewarePermissions([permissions.UPDATE_TERMS])])
	.validator('UpdateMeta');
Route.delete('terms/:id', 'TermController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_TERMS]),
]);
Route.get('terms', 'TermController.index').middleware(['handleParams']);
Route.get('terms/:id', 'TermController.show').middleware(['handleParams']);

/** User Routes */
Route.get('users', 'UserController.index').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_USERS]),
	'handleParams',
]);
Route.post('users', 'UserController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_USERS])])
	.validator('User');
Route.get('users/:id', 'UserController.show').middleware([
	'auth',
	getMiddlewarePermissions([permissions.VIEW_USERS, permissions.VIEW_USER]),
	'handleParams',
]);

Route.put('users/:id', 'UserController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_USER, permissions.UPDATE_USERS]),
	])
	.validator('UpdateUser');

Route.post('users/:id/permissions', 'UserController.associatePermissionUser').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
Route.delete('users/:id', 'UserController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);

Route.get('/user/me', 'AuthController.getMe').middleware(['auth']);
Route.put('/user/change-password', 'UserController.changePassword')
	.middleware(['auth'])
	.validator('ChangeUserPassword');

Route.post('/user/change-email', 'UserController.changeEmail')
	.middleware(['auth'])
	.validator('ChangeUserEmail');

Route.put('/user/change-email', 'UserController.confirmNewEmail')
	.middleware(['auth'])
	.validator('ConfirmNewEmail');

/** BookMarks Routes */
Route.post('bookmarks', 'UserBookmarkController.store')
	.middleware(['auth'])
	.validator('StoreUserBookmark');
Route.get('/user/:id/bookmarks', 'UserBookmarkController.show').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_BOOKMARK, permissions.LIST_BOOKMARKS]),
	'handleParams',
]);
Route.get('user_bookmarks', 'UserBookmarkController.index').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_BOOKMARKS]),
	'handleParams',
]);
Route.delete('/user/:id/bookmarks', 'UserBookmarkController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_BOOKMARK, permissions.DELETE_BOOKMARKS]),
]);

/** TechnologyCosts Routes */
Route.get('/technologies/:id/costs', 'TechnologyCostController.show').middleware([
	'handleParams:technology_costs',
]);
Route.put('/technologies/:id/costs', 'TechnologyCostController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
	])
	.validator('UpdateTechnologyCost');

/** Uploads */
Route.post('/uploads', 'UploadController.store').middleware([
	'auth',
	getMiddlewarePermissions([permissions.CREATE_UPLOADS]),
	'upload',
]);
Route.delete('/uploads/:id', 'UploadController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_UPLOADS, permissions.DELETE_UPLOAD]),
]);
Route.get('/uploads', 'UploadController.index').middleware(['auth', 'handleParams']);
Route.get('/uploads/:filename', 'UploadController.show');
Route.get('/uploads/:object/:filename', 'UploadController.showWithObject');

Route.get('/', 'AppController.index');
