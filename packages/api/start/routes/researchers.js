const Route = use('Route');

Route.get('researchers', 'ResearcherController.index').middleware(['handleParams']);
