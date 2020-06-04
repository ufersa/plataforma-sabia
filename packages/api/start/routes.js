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
	.middleware(['auth'])
	.middleware(new Map([[['roles.index'], ['handleParams']]]));

Route.resource('permissions', 'PermissionController')
	.validator(
		new Map([
			[['permissions.store'], ['StorePermission']],
			[['permissions.update'], ['UpdatePermission']],
		]),
	)
	.apiOnly()
	.middleware(['auth'])
	.middleware(new Map([[['permissions.index'], ['handleParams']]]));

/** Technology routes */
Route.group(() => {
	Route.post('technologies', 'TechnologyController.store').validator('StoreTechnology');
	Route.post('technologies/:idTechnology/users', 'TechnologyController.associateTechnologyUser');
	Route.put('technologies/:id', 'TechnologyController.update');
	Route.delete('technologies/:id', 'TechnologyController.destroy');
	Route.delete(
		'technologies/:idTechnology/users/:idUser',
		'TechnologyController.deleteTechnologyUser',
	);
	Route.delete(
		'technologies/:idTechnology/terms/:term',
		'TechnologyController.deleteTechnologyTerm',
	);
}).middleware('auth');

Route.get('technologies', 'TechnologyController.index').middleware(['handleParams']);
Route.get('technologies/:id', 'TechnologyController.show');
Route.get('technologies/:id/terms', 'TechnologyController.showTechnologyTerms');
Route.get('technologies/:id/users', 'TechnologyController.showTechnologyUsers');

/** Taxonomy routes */
Route.group(() => {
	Route.post('taxonomies', 'TaxonomyController.store').validator('StoreTaxonomy');
	Route.put('taxonomies/:id', 'TaxonomyController.update').validator('UpdateTaxonomy');
	Route.delete('taxonomies/:id', 'TaxonomyController.destroy');
}).middleware('auth');

Route.get('taxonomies', 'TaxonomyController.index').middleware(['handleParams']);
Route.get('taxonomies/:id', 'TaxonomyController.show');
Route.get('taxonomies/:id/terms', 'TaxonomyController.showTerms');

/** Term routes */
Route.group(() => {
	Route.post('terms', 'TermController.store').validator('StoreTerm');
	Route.put('terms/:id', 'TermController.update');
	Route.delete('terms/:id', 'TermController.destroy');
}).middleware('auth');

Route.get('terms', 'TermController.index').middleware(['handleParams']);
Route.get('terms/:id', 'TermController.show');

Route.get('/user/me', 'AuthController.getMe').middleware(['auth']);
Route.get('/', 'AppController.index');
