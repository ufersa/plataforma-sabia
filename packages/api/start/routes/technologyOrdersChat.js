/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const Route = use('Route');

Route.get(
	'technologies/:technology([0-9]+)/orders/:order([0-9]+)/chat',
	'TechnologyOrderChatController.index',
).middleware(['auth']);

Route.get(
	'technologies/:technology([0-9]+)/orders/:order([0-9]+)/chat/:chatId',
	'TechnologyOrderChatController.getMessages',
).middleware(['auth']);

Route.post(
	'technologies/:technology([0-9]+)/orders/:order([0-9]+)/chat/:chatId',
	'TechnologyOrderChatController.postMessage',
).middleware(['auth']);
