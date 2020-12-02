/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

Route.get('ideas', 'IdeaController.index').middleware(['handleParams']);

Route.get('ideas/:id', 'IdeaController.show').middleware(['handleParams']);

Route.post('ideas', 'IdeaController.store')
	.middleware(['auth'])
	.validator('StoreIdea');
