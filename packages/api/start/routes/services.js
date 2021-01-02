/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');
Route.post('services', 'ServiceController.store')
	.middleware(['auth'])
	.validator('StoreService');
