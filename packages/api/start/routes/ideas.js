/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');
Route.post('ideas', 'IdeaController.store')
	.middleware(['auth'])
	.validator('StoreIdea');
