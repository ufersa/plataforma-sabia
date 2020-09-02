const Route = use('Route');

/** Reviewer Routes */
Route.post('reviewers', 'ReviewerController.store')
	.middleware(['auth'])
	.validator('StoreReviewer');
