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

const Route = use('Route');

Route.post('/auth/register', 'AuthController.register').validator('User');
Route.post('/auth/login', 'AuthController.auth').validator('Session');
Route.get('/auth/forgot-password', 'AuthController.forgotPassword').validator('ForgotPassword');
Route.post('/auth/reset-password', 'AuthController.resetPassword').validator('ResetPassword');
Route.post('/auth/confirm-account', 'AuthController.confirmAccount').validator('ConfirmAccount');
Route.post('/auth/resend-confirmation-email', 'AuthController.resendConfirmationEmail');

/** Role Routes */
Route.post('roles', 'RoleController.store')
	.middleware(['auth', 'role:admin'])
	.validator('StoreRole');
Route.put('roles/:id', 'RoleController.update')
	.middleware(['auth', 'role:admin'])
	.validator('UpdateRole');
Route.delete('roles/:id', 'RoleController.destroy').middleware(['auth', 'role:admin']);
Route.get('roles', 'RoleController.index').middleware(['auth', 'role:admin', 'handleParams']);
Route.get('roles/:id', 'RoleController.show').middleware(['auth', 'role:admin']);

/** Permission Routes */
Route.post('permissions', 'PermissionController.store')
	.middleware(['auth', 'role:admin'])
	.validator('StorePermission');
Route.put('permissions/:id', 'PermissionController.update')
	.middleware(['auth', 'role:admin'])
	.validator('UpdatePermission');
Route.delete('permissions/:id', 'PermissionController.destroy').middleware(['auth', 'role:admin']);
Route.get('permissions', 'PermissionController.index').middleware([
	'auth',
	'role:admin',
	'handleParams',
]);
Route.get('permissions/:id', 'PermissionController.show').middleware(['auth', 'role:admin']);

/** Technology routes */
Route.post('technologies', 'TechnologyController.store')
	.middleware(['auth', 'permission:create-technologies'])
	.validator('StoreTechnology');
Route.post('technologies/:id/users', 'TechnologyController.associateTechnologyUser').middleware([
	'auth',
	'permission:associate-technologies-users,associate-technology-users',
]);
Route.put('technologies/:id', 'TechnologyController.update').middleware([
	'auth',
	'permission:update-technologies,update-technology',
]);
Route.delete('technologies/:id', 'TechnologyController.destroy').middleware([
	'auth',
	'permission:delete-technologies,delete-technology',
]);
Route.delete(
	'technologies/:id/users/:idUser',
	'TechnologyController.deleteTechnologyUser',
).middleware(['auth', 'permission:delete-technologies-users,delete-technology-users']);
Route.delete(
	'technologies/:id/terms/:term',
	'TechnologyController.deleteTechnologyTerm',
).middleware(['auth', 'permission:delete-technologies-terms,delete-technology-terms']);

Route.get('technologies', 'TechnologyController.index').middleware(['handleParams']);
Route.get('technologies/:id', 'TechnologyController.show').middleware([
	'auth',
	'permission:details-technologies',
]);
Route.get('technologies/:id/terms', 'TechnologyController.showTechnologyTerms').middleware([
	'auth',
	'permission:list-technologies-terms',
]);
Route.get('technologies/:id/users', 'TechnologyController.showTechnologyUsers').middleware([
	'auth',
	'permission:list-technologies-users',
]);

/** Taxonomy routes */
Route.group(() => {
	Route.post('taxonomies', 'TaxonomyController.store').validator('StoreTaxonomy');
	Route.put('taxonomies/:id', 'TaxonomyController.update').validator('UpdateTaxonomy');
	Route.delete('taxonomies/:id', 'TaxonomyController.destroy');
}).middleware(['auth', 'role:admin']);

Route.get('taxonomies', 'TaxonomyController.index').middleware(['handleParams']);
Route.get('taxonomies/:id', 'TaxonomyController.show');
Route.get('taxonomies/:id/terms', 'TaxonomyController.showTerms');

/** Term routes */
Route.post('terms', 'TermController.store')
	.middleware(['auth', 'permission:create-terms'])
	.validator('StoreTerm');
Route.put('terms/:id', 'TermController.update').middleware(['auth', 'permission:update-terms']);
Route.delete('terms/:id', 'TermController.destroy').middleware(['auth', 'permission:delete-terms']);
Route.get('terms', 'TermController.index').middleware(['handleParams']);
Route.get('terms/:id', 'TermController.show');

/** User Routes */
Route.get('users', 'UserController.index').middleware([
	'auth',
	'permission:list-user,list-users',
	'handleParams',
]);
Route.post('users', 'UserController.store')
	.middleware(['auth', 'permission:create-users'])
	.validator('User');
Route.get('users/:id', 'UserController.show').middleware([
	'auth',
	'permission:details-users,details-user',
]);

Route.put('users/:id', 'UserController.update')
	.middleware(['auth', 'permission:update-user,update-users'])
	.validator('UpdateUser');
Route.post('users/:idUser/permissions', 'UserController.associatePermissionUser');
Route.delete('users/:id', 'UserController.destroy');

Route.get('/user/me', 'AuthController.getMe').middleware(['auth']);
Route.get('/', 'AppController.index');
