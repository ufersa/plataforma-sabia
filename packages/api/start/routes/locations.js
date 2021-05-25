const Route = use('Route');

Route.get('locations', 'LocationController.index').middleware(['handleParams']);

Route.get('locations/:id', 'LocationController.show').middleware(['handleParams']);

Route.post('locations', 'LocationController.store')
	.middleware(['auth'])
	.validator('StoreLocation');

Route.put('locations/:id', 'LocationController.update')
	.middleware(['auth'])
	.validator('UpdateLocation');

Route.delete('locations/:id', 'LocationController.destroy').middleware(['auth']);
