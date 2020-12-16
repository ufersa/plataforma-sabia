/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const Route = use('Route');

Route.get('chat', 'ChatController.show').middleware(['auth']);

Route.get('chat/:id/messages', 'ChatController.index').middleware(['auth']);

Route.post('chat/:id/messages', 'ChatController.store')
	.middleware(['auth'])
	.validator('ChatPostMessage');
