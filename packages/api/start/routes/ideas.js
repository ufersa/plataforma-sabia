/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/**
 * @api {get} /ideas Lists All Ideas
 * @apiGroup Ideas
 * @apiParam (Query Param) {Number[]} [keywords] Filters by keyword list.
 * @apiParam (Query Param) {String} [title] Filters by title
 * @apiParam (Query Param) {String} [description] Filters by description
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /ideas?keywords=104,95
 * @apiSuccess {Object[]} ideas Idea Collection
 * @apiSuccess {Number} ideas.ideas.id idea ID.
 * @apiSuccess {Number} ideas.user_id User ID.
 * @apiSuccess {String} ideas.title Idea title.
 * @apiSuccess {String} ideas.description Idea description.
 * @apiSuccess {Date} ideas.created_at Idea Register date
 * @apiSuccess {Date} ideas.updated_at Idea Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 	{
 *	 	  "id": 21,
 *	 	  "title": "Lu mej du ehabuberi fig.",
 *	 	  "description": "Lag tofe od hevo ohuvuzu vekijih pitetodo nakkekud so unocam.",
 *	 	  "user_id": 3,
 *	 	  "created_at": "2020-12-01 16:40:17",
 *	 	  "updated_at": "2020-12-01 16:40:17"
 *	 	},
 *	 	{
 *	 	  "id": 37,
 *	 	  "title": "Fimuhmu adnicuj fucese elo kismujoz.",
 *	 	  "description": "Sefofi bi mumadkef bitaw megcevej huj jisub wa na mudmitraw.",
 *	 	  "user_id": 21,
 *	 	  "created_at": "2020-12-01 16:56:32",
 *	 	  "updated_at": "2020-12-01 16:56:32"
 *	 	},
 *	 	{
 *	 	  "id": 49,
 *	 	  "title": "Cejacmo weisva ubuwupa awajen re.",
 *	 	  "description": "Fubi sew apbo cogi ca su ho fagu ohlokluw go.",
 *	 	  "user_id": 1,
 *	 	  "created_at": "2020-12-01 16:56:32",
 *	 	  "updated_at": "2020-12-01 16:56:32"
 *	 	},
 *	 	{
 *	 	  "id": 55,
 *	 	  "title": "Besev uw dafwam cimarzo cuczeca.",
 *	 	  "description": "Rivodoj paweg cat tazuj soonubon ducvagal go ot goza zarigaw.",
 *	 	  "user_id": 22,
 *	 	  "created_at": "2020-12-01 16:56:32",
 *	 	  "updated_at": "2020-12-01 16:56:32"
 *	 	},
 *	 	{
 *	 	  "id": 60,
 *	 	  "title": "Jena vip bualu ikahu asweeru.",
 *	 	  "description": "Se ercejwa onikibe ab nibat suski jovticpu jahemzo zatu weczisji.",
 *	 	  "user_id": 18,
 *	 	  "created_at": "2020-12-01 16:56:32",
 *	 	  "updated_at": "2020-12-01 16:56:32"
 *	 	}
 *	]
 */
Route.get('ideas', 'IdeaController.index').middleware(['handleParams']);
/**
 * @api {get} /ideas/:id Gets an single idea
 * @apiGroup Ideas
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /ideas/1
 * @apiSuccess {Number} id idea ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} title Idea title.
 * @apiSuccess {String} description Idea description.
 * @apiSuccess {Date} created_at Idea Register date
 * @apiSuccess {Date} updated_at Idea Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 1,
 *	 "title": "Se ercejwa onikibe ab nibat suski",
 *	 "description": "Polru juz co wicenab saj ladu zeuwo pulra ba ruop.",
 *	 "user_id": 3,
 *	 "created_at": "2020-12-01 16:40:17",
 *	 "updated_at": "2020-12-01 16:40:17"
 *	}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Idea was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Idea was not found"
 * 			}
 *		}
 */
Route.get('ideas/:id', 'IdeaController.show').middleware(['handleParams']);
/**
 * @api {post} /ideas Creates a new idea
 * @apiGroup Ideas
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} title Mandatory Idea title
 * @apiParam {String} description Mandatory Idea description
 * @apiParam {Number[]|String[]} keywords Keyword Array, can be ID or slug
 * @apiSuccess {Number} id idea ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} title Idea title.
 * @apiSuccess {String} description Idea description.
 * @apiSuccess {Date} created_at Idea Register date
 * @apiSuccess {Date} updated_at Idea Update date
 * @apiSuccess {Object[]} idea.terms Terms Collection
 * @apiSuccess {Number} idea.terms.id Term ID
 * @apiSuccess {String} idea.terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} idea.terms.parent_id Parent ID
 * @apiSuccess {String} idea.terms.term Term
 * @apiSuccess {String} idea.terms.slug Term Slug
 * @apiSuccess {Date} idea.terms.created_at Term Register date
 * @apiSuccess {Date} idea.terms.updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 62,
 *	 "title": "Wonderful idea",
 *	 "description": "One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.",
 *	 "user_id": 1,
 *	 "created_at": "2020-12-03 13:18:07",
 *	 "updated_at": "2020-12-03 13:18:07",
 *	 "terms": [
 *	   {
 *	     "id": 234,
 *	     "term": "edatinputuowwu",
 *	     "slug": "edatinputuowwu",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 234,
 *	       "idea_id": 62
 *	     }
 *	   },
 *	   {
 *	     "id": 235,
 *	     "term": "peodeparokoto",
 *	     "slug": "peodeparokoto",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 235,
 *	       "idea_id": 62
 *	     }
 *	   },
 *	   {
 *	     "id": 88,
 *	     "term": "omcisisanokut",
 *	     "slug": "omcisisanokut",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 88,
 *	       "idea_id": 62
 *	     }
 *	   }
 *	 ]
 *	}
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Uncompleted Registration
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "REGISTRATION_UNCOMPLETED",
 *   			"message":"You need to complete your registration to access this resource"
 * 			}
 *		}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: title Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "title is required.",
 *                		"field": "title",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 *@apiErrorExample {json} Validation Error: description Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "description is required.",
 *                		"field": "description",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 *@apiErrorExample {json} Validation Error: keywords Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "keywords is required.",
 *                		"field": "keywords",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 */
Route.post('ideas', 'IdeaController.store')
	.middleware(['auth'])
	.validator('StoreIdea');
/**
 * @api {put} /ideas/:id Updates an idea
 * @apiGroup Ideas
 * @apiPermission UPDATE_IDEA
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} [title] Idea title
 * @apiParam {String} [description] Idea description
 * @apiParam {Number[]|String[]} [keywords] Keyword Array, can be ID or slug
 * @apiSuccess {Number} id idea ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} title Idea title.
 * @apiSuccess {String} description Idea description.
 * @apiSuccess {Date} created_at Idea Register date
 * @apiSuccess {Date} updated_at Idea Update date
 * @apiSuccess {Object[]} idea.terms Terms Collection
 * @apiSuccess {Number} idea.terms.id Term ID
 * @apiSuccess {String} idea.terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} idea.terms.parent_id Parent ID
 * @apiSuccess {String} idea.terms.term Term
 * @apiSuccess {String} idea.terms.slug Term Slug
 * @apiSuccess {Date} idea.terms.created_at Term Register date
 * @apiSuccess {Date} idea.terms.updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 62,
 *	 "title": "Wonderful idea Updated",
 *	 "description": "One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.",
 *	 "user_id": 1,
 *	 "created_at": "2020-12-03 13:18:07",
 *	 "updated_at": "2020-12-03 13:18:07",
 *	 "terms": [
 *	   {
 *	     "id": 234,
 *	     "term": "edatinputuowwu",
 *	     "slug": "edatinputuowwu",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 234,
 *	       "idea_id": 62
 *	     }
 *	   },
 *	   {
 *	     "id": 235,
 *	     "term": "peodeparokoto",
 *	     "slug": "peodeparokoto",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 235,
 *	       "idea_id": 62
 *	     }
 *	   },
 *	   {
 *	     "id": 88,
 *	     "term": "omcisisanokut",
 *	     "slug": "omcisisanokut",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 88,
 *	       "idea_id": 62
 *	     }
 *	   }
 *	 ]
 *	}
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Idea was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Idea was not found"
 * 			}
 *		}
 */
Route.put('ideas/:id', 'IdeaController.update').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_IDEA, permissions.UPDATE_IDEAS]),
]);
/**
 * @api {delete} /ideas/:id Deletes an Idea
 * @apiGroup Ideas
 * @apiPermission DELETE_IDEA
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Idea ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /ideas/1
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 * @apiErrorExample {json} Resource Idea was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Idea was not found"
 * 			}
 *		}
 */
Route.delete('ideas/:id', 'IdeaController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_IDEA, permissions.DELETE_IDEAS]),
]);
