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

Route.resource('roles', 'RoleController')
	.validator(
		new Map([
			[['roles.store'], ['StoreRole']],
			[['roles.update'], ['UpdateRole']],
		]),
	)
	.apiOnly()
	.middleware(['auth', 'role:admin']);

Route.resource('permissions', 'PermissionController')
	.validator(
		new Map([
			[['permissions.store'], ['StorePermission']],
			[['permissions.update'], ['UpdatePermission']],
		]),
	)
	.apiOnly()
	.middleware(['auth', 'role:admin']);

/** Technology routes */
Route.post('technologies', 'TechnologyController.store')
	.middleware(['auth', 'permission:create-technologies'])
	.validator('StoreTechnology');
Route.post(
	'technologies/:idTechnology/users',
	'TechnologyController.associateTechnologyUser',
).middleware(['auth', 'permission:associate-technologies-users,associate-technology-users']);
Route.put('technologies/:id', 'TechnologyController.update').middleware([
	'auth',
	'permission:update-technologies,update-technology',
]);
Route.delete('technologies/:id', 'TechnologyController.destroy').middleware([
	'auth',
	'permission:delete-technologies,delete-technology',
]);
Route.delete(
	'technologies/:idTechnology/users/:idUser',
	'TechnologyController.deleteTechnologyUser',
).middleware(['auth', 'permission:delete-technologies-users,delete-technology-users']);
Route.delete(
	'technologies/:idTechnology/terms/:term',
	'TechnologyController.deleteTechnologyTerm',
).middleware(['auth', 'permission:delete-technologies-terms,delete-technology-terms']);

Route.get('technologies', 'TechnologyController.index');
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

Route.get('taxonomies', 'TaxonomyController.index');
Route.get('taxonomies/:id', 'TaxonomyController.show');
Route.get('taxonomies/:id/terms', 'TaxonomyController.showTerms');

/** Term routes */
Route.post('terms', 'TermController.store')
	.middleware(['auth', 'permission:create-terms'])
	.validator('StoreTerm');
Route.put('terms/:id', 'TermController.update').middleware(['auth', 'permission:update-terms']);
Route.delete('terms/:id', 'TermController.destroy').middleware(['auth', 'permission:delete-terms']);
Route.get('terms', 'TermController.index');
Route.get('terms/:id', 'TermController.show');

/** User Routes */
// Route.group(() => {
Route.get('users', 'UserController.index').middleware(['auth', 'permission:list-user,list-users']);
Route.post('users', 'UserController.store');
Route.get('users/:id', 'UserController.show').middleware([
	'auth',
	'permission:details-users,details-user',
]);
Route.put('users/:id', 'UserController.update').middleware([
	'auth',
	'permission:update-user,update-users',
]);
Route.post('users/:idUser/permissions', 'UserController.associatePermissionUser');
Route.delete('users/:id', 'UserController.destroy');
// }).middleware('auth');

Route.get('/user/me', 'AuthController.getMe').middleware(['auth']);
Route.get('/', 'AppController.index').middleware(['auth']);
