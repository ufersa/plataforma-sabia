const Route = use('Route');

/** Reviewer Routes */
Route.post('reviewers', 'ReviewerController.store');
Route.post('reviewers/:id/categories', 'ReviewerController.associateReviewerCategory');
Route.get('reviewers/:id/categories', 'ReviewerController.showReviewerCategories');
