/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const {
	getMiddlewareRoles,
	roles,
	getMiddlewarePermissions,
	permissions,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Reviewer Routes */
/**
 * @api {get} /reviewers Lists All Reviewers
 * @apiGroup Reviewers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiSuccess {Object[]} reviewers Reviewers Collection
 * @apiSuccess {Number} reviewers.id Reviewer ID.
 * @apiSuccess {Number} reviewers.user_id Reviewer Related User ID.
 * @apiSuccess {String} reviewers.status Reviewer Status
 * @apiSuccess {Date} reviewers.created_at Reviewer Register date
 * @apiSuccess {Date} reviewers.updated_at Reviewer Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 	{
 *	 	  "id": 1,
 *	 	  "user_id": null,
 *	 	  "status": "approved",
 *	 	  "created_at": "2020-08-30 17:08:18",
 *	 	  "updated_at": "2020-09-02 21:49:02"
 *	 	},
 *	 	{
 *	 	  "id": 2,
 *	 	  "user_id": 15,
 *	 	  "status": "approved",
 *	 	  "created_at": "2020-08-30 17:10:09",
 *	 	  "updated_at": "2020-09-02 18:53:31"
 *	 	},
 *	 	{
 *	 	  "id": 3,
 *	 	  "user_id": 16,
 *	 	  "status": "approved",
 *	 	  "created_at": "2020-09-01 21:38:11",
 *	 	  "updated_at": "2020-09-02 21:49:11"
 *	 	},
 *	 	{
 *	 	  "id": 4,
 *	 	  "user_id": 1,
 *	 	  "status": "pending",
 *	 	  "created_at": "2020-09-02 21:27:34",
 *	 	  "updated_at": "2020-09-02 21:27:34"
 *	 	}
 *	]
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
 */
Route.get('reviewers', 'ReviewerController.index').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {get} /reviewers/:id Gets a single Reviewer
 * @apiGroup Reviewers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param){Number} id Mandatory Reviewer ID.
 * @apiParam embed Activate Embedding.
 * @apiParamExample  {json} Request sample:
 *	/reviewers/2?embed
 * @apiSuccess {Number} id Reviewer ID.
 * @apiSuccess {Number} user_id Reviewer Related User ID.
 * @apiSuccess {String} status Reviewer Status
 * @apiSuccess {Date} created_at Reviewer Register date
 * @apiSuccess {Date} updated_at Reviewer Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 2,
 *	 "user_id": 15,
 *	 "status": "approved",
 *	 "created_at": "2020-08-30 17:10:09",
 *	 "updated_at": "2020-09-02 18:53:31"
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
 * @apiErrorExample {json} Resource Reviewer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Reviewer was not found"
 * 			}
 *		}
 */
Route.get('reviewers/:id', 'ReviewerController.show').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {post} /reviewers Creates a new Reviewer
 * @apiGroup Reviewers
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String[]|Number[]} categories Mandatory Categories Array. Term ID or Term Slug is permited.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"categories":["recursos-hidricos",13,14,15]
 *	}
 * @apiSuccess {Number} id Reviewer ID
 * @apiSuccess {Number} user_id Related User ID
 * @apiSuccess {Date} created_at Reviewer Register date
 * @apiSuccess {Date} updated_at Reviewer Update date
 * @apiSuccess {Object} user Related User
 * @apiSuccess {Number} user.id User Id
 * @apiSuccess {String} user.first_name User First Name
 * @apiSuccess {String} user.last_name User Last Name
 * @apiSuccess {String} user.email User Email
 * @apiSuccess {String} user.company User Company
 * @apiSuccess {String} user.zipcode User Zipcode
 * @apiSuccess {String} user.cpf User CPF
 * @apiSuccess {String} user.birth_date User Birth Date
 * @apiSuccess {String} user.phone_number User Phone Number
 * @apiSuccess {String} user.lattes_id User Lattes Id
 * @apiSuccess {String} user.address User Address
 * @apiSuccess {String} user.address2 User Address2
 * @apiSuccess {String} user.district User District
 * @apiSuccess {String} user.city User City
 * @apiSuccess {String} user.state User State
 * @apiSuccess {String} user.country User Country
 * @apiSuccess {String} user.status User Status
 * @apiSuccess {Number} user.role_id User Role Id
 * @apiSuccess {String} user.full_name User Full Name
 * @apiSuccess {Date} user.created_at User Register date
 * @apiSuccess {Date} user.updated_at User Update date
 * @apiSuccess {Object[]} categories Reviewer Related Categories
 * @apiSuccess {Number} categories.id Category ID
 * @apiSuccess {Number} categories.taxonomy_id Taxonomy ID
 * @apiSuccess {Number} categories.parent_id Parent ID
 * @apiSuccess {String} categories.term Category Term
 * @apiSuccess {String} categories.slug Category Term Slug
 * @apiSuccess {Date} categories.created_at Category Register date
 * @apiSuccess {Date} categories.updated_at Category Update date
 * @apiSuccess {Object} categories.pivot Category Reviewer Pivot Relashionship
 * @apiSuccess {Number} categories.pivot.term_id Term ID
 * @apiSuccess {Number} categories.pivot.reviewer_id Reviewer ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "created_at": "2020-09-02 21:27:34",
 *	 "updated_at": "2020-09-02 21:27:34",
 *	 "id": 4,
 *	 "user_id": 1,
 *	 "user": {
 *	   "id": 1,
 *	   "email": "nopuoro@ezazu.bj",
 *	   "status": "pending",
 *	   "first_name": "ziWEMG95K9gr3aZ!%",
 *	   "last_name": "%T0$v3Mr]",
 *	   "company": "xtqyxR2nk$P",
 *	   "zipcode": "39489",
 *	   "cpf": "75002359176",
 *	   "birth_date": "2085-03-05 23:55:20.859",
 *	   "phone_number": "92906561437",
 *	   "lattes_id": "74452478485",
 *	   "address": "VbMpMytJsy",
 *	   "address2": "Ur^R@3sedSti",
 *	   "district": "4ZOO68osgAWH*",
 *	   "city": "T3oh(GQ%W(IUB",
 *	   "state": "$@)X@w4I8!w$KvDc#*",
 *	   "country": "%reAZldfZD",
 *	   "role_id": 1,
 *	   "created_at": "2020-08-19 20:57:29",
 *	   "updated_at": "2020-08-19 20:57:29",
 *	   "full_name": "ziWEMG95K9gr3aZ!% %T0$v3Mr]"
 *	 },
 *	 "categories": [
 *	   {
 *	     "id": 12,
 *	     "term": "Recursos Hídricos",
 *	     "slug": "recursos-hidricos",
 *	     "parent_id": null,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 12,
 *	       "reviewer_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 13,
 *	     "term": "Oferta de Água/Armazenamento",
 *	     "slug": "oferta-de-aguaarmazenamento",
 *	     "parent_id": 12,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 13,
 *	       "reviewer_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 14,
 *	     "term": "Coleta de água de chuva",
 *	     "slug": "coleta-de-agua-de-chuva",
 *	     "parent_id": 12,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 14,
 *	       "reviewer_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 15,
 *	     "term": "Manejo de aquíferos",
 *	     "slug": "manejo-de-aquiferos",
 *	     "parent_id": 12,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 15,
 *	       "reviewer_id": 4
 *	     }
 *	   }
 *	 ]
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Categories Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The categories is required.",
 *       				"field": "categories",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
 */
Route.post('reviewers', 'ReviewerController.store')
	.middleware(['auth'])
	.validator('StoreReviewer');
/**
 * @api {put} /reviewers/:id/update-status Updates Reviewer Status
 * @apiGroup Reviewers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Reviewer ID
 * @apiParam {String="pending","approved"} status Reviewer Status
 * @apiParamExample  {json} Request sample:
 *	{
 *		"status":"approved"
 *	}
 * @apiSuccess {Number} id Reviewer ID.
 * @apiSuccess {Number} user_id Reviewer Related User ID.
 * @apiSuccess {String} status Reviewer Status
 * @apiSuccess {Date} created_at Reviewer Register date
 * @apiSuccess {Date} updated_at Reviewer Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 3,
 *	 "user_id": 16,
 *	 "status": "approved",
 *	 "created_at": "2020-09-01 21:38:11",
 *	 "updated_at": "2020-09-02 21:49:11"
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
 * @apiErrorExample {json} Resource Reviewer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Reviewer was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Status Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The status is required.",
 *       				"field": "status",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Status should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The status should fall within defined values of (pending, approved).",
 *       				"field": "status",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.put('reviewers/:id/update-status', 'ReviewerController.updateReviewerStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('updateReviewerStatus');

Route.post('revisions/:technology', 'ReviewerController.makeRevision')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TECHNOLOGY_REVISION])])
	.validator('Revision');
