const Route = use('Route');

Route.get('locations', 'LocationController.index').middleware(['handleParams']);

Route.post('locations', 'LocationController.store')
	.middleware(['auth'])
	.validator('StoreLocation');
