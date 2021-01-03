/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');
Route.get('services', 'ServiceController.index').middleware(['handleParams']);
Route.get('services/:id', 'ServiceController.show').middleware(['handleParams']);
Route.post('services', 'ServiceController.store')
	.middleware(['auth'])
	.validator('StoreService');
