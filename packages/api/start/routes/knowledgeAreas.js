const Route = use('Route');
Route.get('areas/:knowledge_area_id', 'KnowledgeAreaController.show');
Route.get('areas', 'KnowledgeAreaController.index').middleware(['handleParams']);
