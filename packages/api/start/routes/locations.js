const Route = use('Route');

Route.post('locations', 'LocationController.store')
	.middleware(['auth'])
	.validator('StoreLocation');
