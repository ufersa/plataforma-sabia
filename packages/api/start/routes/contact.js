const Route = use('Route');

Route.post('contact', 'ContactUsController.store').validator('StoreContactUs');
