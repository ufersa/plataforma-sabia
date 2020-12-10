const Route = use('Route');

Route.get('/messages', 'MessageController.index').middleware(['auth', 'handleParams']);
Route.get('/messages/:id', 'MessageController.show').middleware(['auth', 'handleParams']);
Route.put('/messages/mark-as-read', 'MessageController.markAsRead')
	.middleware(['auth'])
	.validator('markMessages');
Route.put('/messages/mark-as-new', 'MessageController.markAsNew')
	.middleware(['auth'])
	.validator('markMessages');
Route.delete('/messages', 'MessageController.destroyMany')
	.middleware(['auth', 'handleParams'])
	.validator('DeleteMany');
