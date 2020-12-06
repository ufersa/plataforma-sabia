/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const Route = use('Route');

Route.get('chat', 'ChatController.show').middleware(['auth']);

Route.get('chat/:chatId/messages', 'ChatController.getMessages').middleware(['auth']);

Route.post('chat/:chatId/messages', 'ChatController.postMessage')
	.middleware(['auth'])
	.validator('ChatPostMessage');
