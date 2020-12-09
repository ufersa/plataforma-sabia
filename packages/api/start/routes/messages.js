const Route = use('Route');

Route.get('/messages', 'MessageController.index').middleware(['auth', 'handleParams']);
