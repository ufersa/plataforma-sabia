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
 * @apiParam {String} status Optional status list for filter
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
 * @api {put} /reviewers Updates Reviewer Categories
 * @apiGroup Reviewers
 * @apiPermission REVIEWER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String[]|Number[]} [categories] Optional Categories Array. Term ID or Term Slug is permited.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"categories":[25,27,29]
 *	}
 * @apiSuccess {Number} id Reviewer ID
 * @apiSuccess {Number} user_id Related User ID
 * @apiSuccess {String} status Reviewer Status
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
 *		"id": 1,
 *		"user_id": 15,
 *		"status": "approved",
 *		"created_at": "2020-09-29 20:53:22",
 *		"updated_at": "2020-09-29 20:55:20",
 *		"user": {
 *		  "id": 15,
 *		  "email": "alexandre.adames@gmail.com",
 *		  "status": "verified",
 *		  "first_name": "Alexandre",
 *		  "last_name": "Pontes",
 *		  "company": null,
 *		  "zipcode": null,
 *		  "cpf": null,
 *		  "birth_date": null,
 *		  "phone_number": null,
 *		  "lattes_id": null,
 *		  "address": null,
 *		  "address2": null,
 *		  "district": null,
 *		  "city": null,
 *		  "state": null,
 *		  "country": null,
 *		  "role_id": 4,
 *		  "created_at": "2020-09-29 20:50:09",
 *		  "updated_at": "2020-10-06 19:29:25",
 *		  "full_name": "Alexandre Pontes"
 *		},
 *		"categories": [
 *		  {
 *		    "id": 25,
 *		    "term": "Agricultura de Sequeiro",
 *		    "slug": "agricultura-de-sequeiro",
 *		    "parent_id": null,
 *		    "taxonomy_id": 1,
 *		    "created_at": "2020-09-29 20:10:04",
 *		    "updated_at": "2020-09-29 20:10:04",
 *		    "pivot": {
 *		      "term_id": 25,
 *		      "reviewer_id": 1
 *		    }
 *		  },
 *		  {
 *		    "id": 27,
 *		    "term": "Melhorias genéticas de culturas do semiárido",
 *		    "slug": "melhorias-geneticas-de-culturas-do-semiarido",
 *		    "parent_id": 25,
 *		    "taxonomy_id": 1,
 *		    "created_at": "2020-09-29 20:10:04",
 *		    "updated_at": "2020-09-29 20:10:04",
 *		    "pivot": {
 *		      "term_id": 27,
 *		      "reviewer_id": 1
 *		    }
 *		  },
 *		  {
 *		    "id": 29,
 *		    "term": "Sistemas de produção de sequeiro",
 *		    "slug": "sistemas-de-producao-de-sequeiro",
 *		    "parent_id": 25,
 *		    "taxonomy_id": 1,
 *		    "created_at": "2020-09-29 20:10:05",
 *		    "updated_at": "2020-09-29 20:10:05",
 *		    "pivot": {
 *		      "term_id": 29,
 *		      "reviewer_id": 1
 *		    }
 *		  }
 *		]
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
 * @apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
 */
Route.put('reviewers', 'ReviewerController.update').middleware([
	'auth',
	getMiddlewareRoles([roles.REVIEWER]),
]);

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
 * @apiParam {String="pending","approved","rejected"} status Reviewer Status
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
 *       				"message": "The status should fall within defined values of (pending, approved,rejected).",
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
/**
 * @api {post} /revisions/:technology Creates a Revision
 * @apiGroup Reviewers
 * @apiPermission CREATE_TECHNOLOGY_REVISION
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number|String} technology Mandatory Technology ID or Slug
 * @apiParam {String} description Revision Description
 * @apiParam {String="approved","requested_changes","rejected"} assessment Reviewer Assessment
 * @apiParamExample  {json} Request sample:
 *	{
 *		"description":"Technology approved",
 *		"assessment":"approved"
 *	}
 * @apiSuccess {Number} id Revision ID.
 * @apiSuccess {String} description Revision description.
 * @apiSuccess {Number} reviewer_id Reviewer ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {String="approved","requested_changes","rejected"} assessment Reviewer Assessment.
 * @apiSuccess {Date} created_at Revision Register date
 * @apiSuccess {Date} updated_at Revision Update date
 * @apiSuccess {Object} technology Technology Reviewed
 * @apiSuccess {Number} technology.id Technology ID.
 * @apiSuccess {String} technology.title Technology Title.
 * @apiSuccess {String} technology.description Technology Description
 * @apiSuccess {Boolean} technology.private Private Param
 * @apiSuccess {Boolean} technology.patent Technology Patent.
 * @apiSuccess {String} technology.patent_number Patent Number
 * @apiSuccess {String} technology.primary_purpose Primary Purpose
 * @apiSuccess {String} technology.secondary_purpose Secondary Purpose
 * @apiSuccess {String} technology.application_mode Application Mode
 * @apiSuccess {String} technology.application_examples Application Examples
 * @apiSuccess {Number} technology.installation_time Installation Time in days
 * @apiSuccess {String} technology.solves_problem Solves Problem
 * @apiSuccess {String} technology.entailes_problem Entailes Problem
 * @apiSuccess {String} technology.requirements Requirements
 * @apiSuccess {String} technology.risks Technology risks
 * @apiSuccess {String} technology.contribution Contribution
 * @apiSuccess {String} technology.status Technology Status
 * @apiSuccess {String} technology.slug Technology Slug
 * @apiSuccess {String} technology.objectID Technology ObjectID
 * @apiSuccess {Number} technology.likes Technology likes
 * @apiSuccess {Date} technology.created_at Technology Register date
 * @apiSuccess {Date} technology.updated_at Technology Update date
 * @apiSuccess {Object} reviewer Reviewer
 * @apiSuccess {Number} reviewer.id Reviewer ID.
 * @apiSuccess {Number} reviewer.user_id Reviewer Related User ID.
 * @apiSuccess {String} reviewer.status Reviewer Status
 * @apiSuccess {Date} reviewer.created_at Reviewer Register date
 * @apiSuccess {Date} reviewer.updated_at Reviewer Update date
 * @apiSuccess {Object} reviewer.user User Reviewer
 * @apiSuccess {Number} reviewer.user.id User Id
 * @apiSuccess {String} reviewer.user.first_name User First Name
 * @apiSuccess {String} reviewer.user.last_name User Last Name
 * @apiSuccess {String} reviewer.user.email User Email
 * @apiSuccess {String} reviewer.user.company User Company
 * @apiSuccess {String} reviewer.user.zipcode User Zipcode
 * @apiSuccess {String} reviewer.user.cpf User CPF
 * @apiSuccess {String} reviewer.user.birth_date User Birth Date
 * @apiSuccess {String} reviewer.user.phone_number User Phone Number
 * @apiSuccess {String} reviewer.user.lattes_id User Lattes Id
 * @apiSuccess {String} reviewer.user.address User Address
 * @apiSuccess {String} reviewer.user.address2 User Address2
 * @apiSuccess {String} reviewer.user.district User District
 * @apiSuccess {String} reviewer.user.city User City
 * @apiSuccess {String} reviewer.user.state User State
 * @apiSuccess {String} reviewer.user.country User Country
 * @apiSuccess {String} reviewer.user.status User Status
 * @apiSuccess {Number} reviewer.user.role_id User Role Id
 * @apiSuccess {String} reviewer.user.full_name User Full Name
 * @apiSuccess {Date} reviewer.user.created_at User Register date
 * @apiSuccess {Date} reviewer.user.updated_at User Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "description": "Technology approved",
 *	 "assessment": "approved",
 *	 "reviewer_id": 1,
 *	 "created_at": "2020-10-05 11:08:41",
 *	 "updated_at": "2020-10-05 11:08:41",
 *	 "id": 16,
 *	 "technology_id": 1,
 *	 "technology": {
 *	   "id": 1,
 *	   "title": "Tecnologia em Revisão",
 *	   "slug": "tekjito-fecnemij-waghat",
 *	   "description": "Du wudtuclo li hen peolne muirka dap jufebsu gozuz dafdeg bihsewut iz bi jibicor ez fudiza zag. Cilucap ih utdi ra viwoj jive be os zojiwwi lifu ded wu ligmuh ki. Vabejivu uduku hebigbu vegmi efu pouwogat on uf ono mujepi nooje dajoc ba bor guhrub us esi pi.",
 *	   "private": 1,
 *	   "thumbnail_id": null,
 *	   "likes": 0,
 *	   "patent": 0,
 *	   "patent_number": "0AOM9mnM",
 *	   "primary_purpose": "Kep za epweava halo vo useepi ofiujami fur no lake afoawu jefemif bibi vazahok. Po ewsa dudowul kija neafgi wur moumasuf pig zafbo ikuce ifutol mice. Gumber fewbiwu ce hid lokecari neov ju bidden muc fuw toorpop dajove ovupeji namaz wuca. Pi suwhu pogufiz if juk ikrez naes puwa bokhol kotimij me luw gu jase midveb gijonaama jokduhuh.",
 *	   "secondary_purpose": "Ziwtiwij lu adafobbuj buzkivkaf resole wirzerol zudonnos vaus jo pe of zozeda ru gebgawuz. Dabhuen feesi buzju fip lo za veclijed wovso letdan loc sek vec. Wad oseanofi vis kub todsuda udopuop zezaphat ligmoju nip udwuoho dugrus tutusa haojo. Numeba ajva pol no irifi der woh unukik elvuviki kilonapu futnaezu comfigfa. Voivo nema cewiseto hidbosuh zabku hec vi zoava opujar gav ket ezi raz fodmawu demet vik tehzod. Duzufin wus vek pilmi nod tian bohueci ezeaf wunihev jicno odi unciwbi difraz tuwona.",
 *	   "application_mode": "Lita ikmaleju apoevkug sojgadi fa ibi wa eh hepiluz cuniduru onuco jeorokuj bobzudiki onude leuge ju. Aw fejulo migmacso no fupevopi rati sawapof feuziej biksib tuphuwzeh canje velawtac bo pofse pefive heggug. Vu tawev isu emesat pudpatvi laad megiz fehuazi ru pitgaho objezupu sug niklawaz mokifuafa onume kap. Sene tol ifa sevora weg ej na nate suherusi toleh bevuf gi vujkij kuwutedos. Kekva mico zekpu setgig pobdac egauvipa ke omi nahcipba gisa kifo etaijdi juof ume hin il vatcag caifa. Edcufir pa ovelor kuv laso citej usdidzoz pimo sipmici cucjedva codhijod kabvagfiw nas les.",
 *	   "application_examples": "Cozbu vosene otajtah wazioz kec suwesebi fo pac re odipu kogput ro owpuvu sokabon afuno wodte jijacda. Bo usewod suwirze se tevoveidi dugaw hugsacim tassuf uz vu vepveh lig dubah. Ciz evuzos sok kiwhob wo vuf obu nol hoc sassefme vucolez gew rohuwci ciilenu. Dihbe wis halmipzih ogo ugbebo umuzovo lehbozda biw ped ze karapi apuk hijjozcij ci ohazu. Dotlajvu kozedepi iv amfun sa ilupontok zenicina itmu epe peul bal isumek ri sore zatjelul kakco cov.",
 *	   "installation_time": 224,
 *	   "solves_problem": "Wekon viugu hohezu kaijowag jile pip noom befja bol ortoaw zapocac cehtuhuv witcij genpazep bepoj. Rite tanez fijapwiv wenorcam nuaji nev ricimvo doucvo unmocaf pi imvov jemo pankegjeg jocale wi nob. Zewa gap he bozficip biwadokid vaes cupa zinwodse taecme ogaki dofsek ezi bufuki dake ci. Hitpeme poknejif elipalte uz dozizej givnu po la lugi cikkuwuk majpef havbarire. Ujfu lizico no awoaf sok lur piwekga ur zubnijcus nah gimco lifo he wajfaso lupigo.",
 *	   "entailes_problem": "Ro paktaw egolakkew ipifu ze anjo gev baj uf jije nane hid. Huwlu balnilu amli ruf iso ev fo huramkud is gos fe fikic fo giz vuj. Az si nicetjac zoptevozi omjac bafu egaku pugdam suz kuovwe voro cukwe bujfonwi fodihmet.",
 *	   "requirements": "Uppeji sirfu ihaoka cor zuzomo dukadras rub selhesi mem su daweul edfe dup. Wanhih veb peonmip howgiwfut ude ruro nel pujarfa jonwozne wiz sircu ridabdet luh besdiskej ima icnobsah. Okoodu pil oj kewja ulha naw mi ip awiamo mosbolah uk wo. Ze ewvahdi okcuze memiac witu luohnag rucru zipwuodi rakcool rucala bare luac tiisi voj guil dinfikco veicnuv juhicne. Lavo ur ki iruboguj kajiaf wiovola ge ge hugkades rufa he ilacoh ucegiem. Wuri pit huz pozbavpif di izapaba ma hisjukuv oge bo nosoile coz. Birhenos nezgooz jodzuk avwu ucuaro izcu fecic po ju upauske fugpoeca vefjib eggaisu egez.",
 *	   "risks": "Fubef nedtubpe vov guwtucbe gup ku zemcugmuw iso ahuuzone gi viji efcec veda bu. Reb uboecit po cooca gegenob isgujhun terabcij wa gufah safowjij vadaro ihipulu du za. Riba kid ja vi uwaic wiwsati hut zikhofov osi zol ijo towmape uti mi vad dicdoim. Sefeb nokcaut sab piti idifek ri sij zuler hufujpap afoet fomakcoh kik lufap. Gol omsu fotu wagkeez coofizuk ok uwalup abco feriv nic avnobnup jo.",
 *	   "contribution": "Refupon moul iv mac idafave nonilu rikbozop nid puh num fukorta dido upuuv ufawak zevludus uruta popazzij. Efobut wad jabolagi luhor jufweva ri abnaen noowe cunolez vappeb tilwubob caok somevub isulo. Egeuco bino zutsa ejeuczi bajnelmaw vini isa pi so jobapama riz wabjep bikvi juken. Buzzikom hicsid ah gu raojjil cu pokfo vahgabmip baapuceh eli ibicad luk wojuhe bugu pu teezohol gewcuglir atehi. Kap fehnis vosurah codumfew gun jiddeupe icuorovaz wemebbi adi gabho il uj kikoz.",
 *	   "status": "in_review",
 *	   "created_at": "2020-09-29 20:10:08",
 *	   "updated_at": "2020-09-30 21:12:39",
 *	   "objectID": "technology-1"
 *	 },
 *	 "reviewer": {
 *	   "id": 1,
 *	   "user_id": 15,
 *	   "status": "approved",
 *	   "created_at": "2020-09-29 20:53:22",
 *	   "updated_at": "2020-09-29 20:55:20",
 *	   "user": {
 *	     "id": 15,
 *	     "email": "alexandre.adames@gmail.com",
 *	     "status": "verified",
 *	     "first_name": "Alexandre",
 *	     "last_name": "Pontes",
 *	     "company": null,
 *	     "zipcode": null,
 *	     "cpf": null,
 *	     "birth_date": null,
 *	     "phone_number": null,
 *	     "lattes_id": null,
 *	     "address": null,
 *	     "address2": null,
 *	     "district": null,
 *	     "city": null,
 *	     "state": null,
 *	     "country": null,
 *	     "role_id": 4,
 *	     "created_at": "2020-09-29 20:50:09",
 *	     "updated_at": "2020-09-29 20:55:20",
 *	     "full_name": "Alexandre Pontes"
 *	   }
 *	 }
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Status no allowed for review
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "STATUS_NO_ALLOWED_FOR_REVIEW",
 *   			"message":"The technology status: {no_allowed_status} is not allowed for review"
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Description is required when assessment is requested_changes
 *    HTTP/1.1 400 Bad Request
 *		{
 *		 "error": {
 *		   "error_code": "VALIDATION_ERROR",
 *		   "message": [
 *		     {
 *		       "message": "The description is required when value of assessment is equal to requested_changes",
 *		       "field": "description",
 *		       "validation": "requiredWhen"
 *		     }
 *		   ]
 *		 }
 * @apiErrorExample {json} Validation Error: Description is required when assessment is rejected
 *    HTTP/1.1 400 Bad Request
 *		{
 *		 "error": {
 *		   "error_code": "VALIDATION_ERROR",
 *		   "message": [
 *		     {
 *		       "message": "The description is required when value of assessment is equal to rejected",
 *		       "field": "description",
 *		       "validation": "requiredWhen"
 *		     }
 *		   ]
 *		 }
 * @apiErrorExample {json} Validation Error: Assessment Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The assessment is required.",
 *       				"field": "assessment",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Assessment should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The assessment should fall within defined values of (approved,requested_changes,rejected).",
 *       				"field": "assessment",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.post('revisions/:technology', 'ReviewerController.makeRevision')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TECHNOLOGY_REVISION])])
	.validator('Revision');
/**
 * @api {get} /reviewer Gets Reviewer
 * @apiGroup Reviewers
 * @apiPermission REVIEWER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Number} id Reviewer ID
 * @apiSuccess {Number} user_id Related User ID
 * @apiSuccess {String} status Reviewer Status
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
 *		"id": 1,
 *		"user_id": 15,
 *		"status": "approved",
 *		"created_at": "2020-09-29 20:53:22",
 *		"updated_at": "2020-09-29 20:55:20",
 *		"user": {
 *		  "id": 15,
 *		  "email": "alexandre.adames@gmail.com",
 *		  "status": "verified",
 *		  "first_name": "Alexandre",
 *		  "last_name": "Pontes",
 *		  "company": null,
 *		  "zipcode": null,
 *		  "cpf": null,
 *		  "birth_date": null,
 *		  "phone_number": null,
 *		  "lattes_id": null,
 *		  "address": null,
 *		  "address2": null,
 *		  "district": null,
 *		  "city": null,
 *		  "state": null,
 *		  "country": null,
 *		  "role_id": 4,
 *		  "created_at": "2020-09-29 20:50:09",
 *		  "updated_at": "2020-10-06 19:29:25",
 *		  "full_name": "Alexandre Pontes"
 *		},
 *		"categories": [
 *		  {
 *		    "id": 25,
 *		    "term": "Agricultura de Sequeiro",
 *		    "slug": "agricultura-de-sequeiro",
 *		    "parent_id": null,
 *		    "taxonomy_id": 1,
 *		    "created_at": "2020-09-29 20:10:04",
 *		    "updated_at": "2020-09-29 20:10:04",
 *		    "pivot": {
 *		      "term_id": 25,
 *		      "reviewer_id": 1
 *		    }
 *		  },
 *		  {
 *		    "id": 27,
 *		    "term": "Melhorias genéticas de culturas do semiárido",
 *		    "slug": "melhorias-geneticas-de-culturas-do-semiarido",
 *		    "parent_id": 25,
 *		    "taxonomy_id": 1,
 *		    "created_at": "2020-09-29 20:10:04",
 *		    "updated_at": "2020-09-29 20:10:04",
 *		    "pivot": {
 *		      "term_id": 27,
 *		      "reviewer_id": 1
 *		    }
 *		  },
 *		  {
 *		    "id": 29,
 *		    "term": "Sistemas de produção de sequeiro",
 *		    "slug": "sistemas-de-producao-de-sequeiro",
 *		    "parent_id": 25,
 *		    "taxonomy_id": 1,
 *		    "created_at": "2020-09-29 20:10:05",
 *		    "updated_at": "2020-09-29 20:10:05",
 *		    "pivot": {
 *		      "term_id": 29,
 *		      "reviewer_id": 1
 *		    }
 *		  }
 *		]
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
 */
Route.get('/reviewer', 'ReviewerController.getReviewer').middleware([
	'auth',
	getMiddlewareRoles([roles.REVIEWER]),
]);
/**
 * @api {get} /reviewer/technologies Lists Technologies Assigned to Reviewer
 * @apiGroup Reviewers
 * @apiPermission REVIEWER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiParam (Query Param) {String="in_review","requested_changes","changes_made","approved","rejected","published"} [status] Optional technology status to filter
 * @apiSuccess {Object[]} technologies Technology Collection
 * @apiSuccess {Number} technologies.id Technology ID.
 * @apiSuccess {String} technologies.title Technology Title.
 * @apiSuccess {String} technologies.description Technology Description
 * @apiSuccess {Boolean} technologies.private Private Param
 * @apiSuccess {Boolean} technologies.patent Technology Patent.
 * @apiSuccess {String} technologies.patent_number Patent Number
 * @apiSuccess {String} technologies.primary_purpose Primary Purpose
 * @apiSuccess {String} technologies.secondary_purpose Secondary Purpose
 * @apiSuccess {String} technologies.application_mode Application Mode
 * @apiSuccess {String} technologies.application_examples Application Examples
 * @apiSuccess {Number} technologies.installation_time Installation Time in days
 * @apiSuccess {String} technologies.solves_problem Solves Problem
 * @apiSuccess {String} technologies.entailes_problem Entailes Problem
 * @apiSuccess {String} technologies.requirements Requirements
 * @apiSuccess {String} technologies.risks Technology risks
 * @apiSuccess {String} technologies.contribution Contribution
 * @apiSuccess {String} technologies.status status
 * @apiSuccess {String} technologies.slug Technology Slug
 * @apiSuccess {String} technologies.objectID Technology ObjectID
 * @apiSuccess {Number} technologies.likes Technology likes
 * @apiSuccess {Date} technologies.created_at Technology Register date
 * @apiSuccess {Date} technologies.updated_at Technology Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  [
 *	  {
 *	  "id": 1,
 *	  "title": "Tecnologia em Revisão",
 *	  "slug": "tekjito-fecnemij-waghat",
 *	  "description": "Du wudtuclo li hen peolne muirka dap jufebsu gozuz dafdeg bihsewut iz bi jibicor ez fudiza zag. Cilucap ih utdi ra viwoj jive be os zojiwwi lifu ded wu ligmuh ki. Vabejivu uduku hebigbu vegmi efu pouwogat on uf ono mujepi nooje dajoc ba bor guhrub us esi pi.",
 *	  "private": 1,
 *	  "thumbnail_id": null,
 *	  "likes": 0,
 *	  "patent": 0,
 *	  "patent_number": "0AOM9mnM",
 *	  "primary_purpose": "Kep za epweava halo vo useepi ofiujami fur no lake afoawu jefemif bibi vazahok. Po ewsa dudowul kija neafgi wur moumasuf pig zafbo ikuce ifutol mice. Gumber fewbiwu ce hid lokecari neov ju bidden muc fuw toorpop dajove ovupeji namaz wuca. Pi suwhu pogufiz if juk ikrez naes puwa bokhol kotimij me luw gu jase midveb gijonaama jokduhuh.",
 *	  "secondary_purpose": "Ziwtiwij lu adafobbuj buzkivkaf resole wirzerol zudonnos vaus jo pe of zozeda ru gebgawuz. Dabhuen feesi buzju fip lo za veclijed wovso letdan loc sek vec. Wad oseanofi vis kub todsuda udopuop zezaphat ligmoju nip udwuoho dugrus tutusa haojo. Numeba ajva pol no irifi der woh unukik elvuviki kilonapu futnaezu comfigfa. Voivo nema cewiseto hidbosuh zabku hec vi zoava opujar gav ket ezi raz fodmawu demet vik tehzod. Duzufin wus vek pilmi nod tian bohueci ezeaf wunihev jicno odi unciwbi difraz tuwona.",
 *	  "application_mode": "Lita ikmaleju apoevkug sojgadi fa ibi wa eh hepiluz cuniduru onuco jeorokuj bobzudiki onude leuge ju. Aw fejulo migmacso no fupevopi rati sawapof feuziej biksib tuphuwzeh canje velawtac bo pofse pefive heggug. Vu tawev isu emesat pudpatvi laad megiz fehuazi ru pitgaho objezupu sug niklawaz mokifuafa onume kap. Sene tol ifa sevora weg ej na nate suherusi toleh bevuf gi vujkij kuwutedos. Kekva mico zekpu setgig pobdac egauvipa ke omi nahcipba gisa kifo etaijdi juof ume hin il vatcag caifa. Edcufir pa ovelor kuv laso citej usdidzoz pimo sipmici cucjedva codhijod kabvagfiw nas les.",
 *	  "application_examples": "Cozbu vosene otajtah wazioz kec suwesebi fo pac re odipu kogput ro owpuvu sokabon afuno wodte jijacda. Bo usewod suwirze se tevoveidi dugaw hugsacim tassuf uz vu vepveh lig dubah. Ciz evuzos sok kiwhob wo vuf obu nol hoc sassefme vucolez gew rohuwci ciilenu. Dihbe wis halmipzih ogo ugbebo umuzovo lehbozda biw ped ze karapi apuk hijjozcij ci ohazu. Dotlajvu kozedepi iv amfun sa ilupontok zenicina itmu epe peul bal isumek ri sore zatjelul kakco cov.",
 *	  "installation_time": 224,
 *	  "solves_problem": "Wekon viugu hohezu kaijowag jile pip noom befja bol ortoaw zapocac cehtuhuv witcij genpazep bepoj. Rite tanez fijapwiv wenorcam nuaji nev ricimvo doucvo unmocaf pi imvov jemo pankegjeg jocale wi nob. Zewa gap he bozficip biwadokid vaes cupa zinwodse taecme ogaki dofsek ezi bufuki dake ci. Hitpeme poknejif elipalte uz dozizej givnu po la lugi cikkuwuk majpef havbarire. Ujfu lizico no awoaf sok lur piwekga ur zubnijcus nah gimco lifo he wajfaso lupigo.",
 *	  "entailes_problem": "Ro paktaw egolakkew ipifu ze anjo gev baj uf jije nane hid. Huwlu balnilu amli ruf iso ev fo huramkud is gos fe fikic fo giz vuj. Az si nicetjac zoptevozi omjac bafu egaku pugdam suz kuovwe voro cukwe bujfonwi fodihmet.",
 *	  "requirements": "Uppeji sirfu ihaoka cor zuzomo dukadras rub selhesi mem su daweul edfe dup. Wanhih veb peonmip howgiwfut ude ruro nel pujarfa jonwozne wiz sircu ridabdet luh besdiskej ima icnobsah. Okoodu pil oj kewja ulha naw mi ip awiamo mosbolah uk wo. Ze ewvahdi okcuze memiac witu luohnag rucru zipwuodi rakcool rucala bare luac tiisi voj guil dinfikco veicnuv juhicne. Lavo ur ki iruboguj kajiaf wiovola ge ge hugkades rufa he ilacoh ucegiem. Wuri pit huz pozbavpif di izapaba ma hisjukuv oge bo nosoile coz. Birhenos nezgooz jodzuk avwu ucuaro izcu fecic po ju upauske fugpoeca vefjib eggaisu egez.",
 *	  "risks": "Fubef nedtubpe vov guwtucbe gup ku zemcugmuw iso ahuuzone gi viji efcec veda bu. Reb uboecit po cooca gegenob isgujhun terabcij wa gufah safowjij vadaro ihipulu du za. Riba kid ja vi uwaic wiwsati hut zikhofov osi zol ijo towmape uti mi vad dicdoim. Sefeb nokcaut sab piti idifek ri sij zuler hufujpap afoet fomakcoh kik lufap. Gol omsu fotu wagkeez coofizuk ok uwalup abco feriv nic avnobnup jo.",
 *	  "contribution": "Refupon moul iv mac idafave nonilu rikbozop nid puh num fukorta dido upuuv ufawak zevludus uruta popazzij. Efobut wad jabolagi luhor jufweva ri abnaen noowe cunolez vappeb tilwubob caok somevub isulo. Egeuco bino zutsa ejeuczi bajnelmaw vini isa pi so jobapama riz wabjep bikvi juken. Buzzikom hicsid ah gu raojjil cu pokfo vahgabmip baapuceh eli ibicad luk wojuhe bugu pu teezohol gewcuglir atehi. Kap fehnis vosurah codumfew gun jiddeupe icuorovaz wemebbi adi gabho il uj kikoz.",
 *	  "status": "approved",
 *	  "created_at": "2020-09-29 20:10:08",
 *	  "updated_at": "2020-10-05 11:08:41",
 *	  "objectID": "technology-1"
 *	},
 *	{
 *	  "id": 2,
 *	  "title": "Vi ficgenuk apaebiri.",
 *	  "slug": "vi-ficgenuk-apaebiri",
 *	  "description": "Ga hipiweh safhojgut lamdewwi kehafuku gub nikot kasiju awiiw dacipo ta zepom hedeti bim. Nopuron recu eleekdig dusni val kape tetiz pizul nume dodilo ijuburus cuge jal we guhlen mil bad. Aw te duha cibepo pe muvgabvan lifenlo eze fos nekaz zijcuj vaucafo judbekpu fa litic ikivic len otetez.",
 *	  "private": 0,
 *	  "thumbnail_id": null,
 *	  "likes": 0,
 *	  "patent": 1,
 *	  "patent_number": "avqdBfry",
 *	  "primary_purpose": "Sohiri bes uzpilog liirueje zazcigzo tonob va de ubonajo po jedi uw jouciho unojizwe visubmit tedadi kawnob im. Ammilbi kiguwmu da ofa wazipeiju abize udfo ge sok viscoz cooduru lazdis re fofvep dolla. Du wetalban rokrer guwhepo gezgut zirazo osa vewge niguwot izu asivir mi wipmasoc wu bilbubo jataz azebes po. Funoruwe tevowuf wal umcian potigiha hijkiwkop sool decuj risuvpu dubfoj cenkug kadhad ub jod vug gewuta umavippo fi. Ar gat kan fier dohfuwib ejebsaj ozwe va kom ci bori ediveobu walvarsis lurbiv li keib.",
 *	  "secondary_purpose": "Cika lopetuewi ibi poolico has ubihaera oku fordotkin figfetase zaz keovi bes paarued gigobkuz coicioz ufnozjeb lajmuim jail. Kovnume kucuniper hu buuvpa tebotub di gijifwe okbi fap acivuuk la imge igo juzawu. Duhhizomu kergi ju po fig tiwehe tued wi kavde ibanowav horwit pekajo dibok. Uhuvohe pali wen bodu iz reige vur he na dak ime iluadi saswi. Vu latasa nosemor vavigkuj jajef hoj wiuva gavde akdosij upaul zajfelco oh. Pegac rabribwin esnicalo vekcurovo vug bar voda mel agogifon ehibucir buffemak wurisupi fikfuvwi lelpeom uzoscof ra buzudi sedjopa.",
 *	  "application_mode": "Ranuji totwed cugzituh ca falzo dal uncun rilavma tadot zononhev ba orinidas gianuej bolin pacuwisab minfagun. Kesveop jilaiha govvijzo tabothoj losusded susohifur imamoma copepgav isezi sirozbu ce juvolac lik fiiz vijim pohefo. Fusenzib ufdic tobhozfut muvikzo ivapha eh tenfuze oh gebmal catihovo cungan ifim fo isa siwhoz gi wud bo. Fowgohji enge dapmeb vigzimko verluj ij maufiiha di uva sahujag wusdu cohu fad gi eh. Cesugwel home tod we ge nacpicwi fu hawkef huegu wiwjeksid bi jocfef lakah fir. Zaahepon nugsezeh gi timifeh zi acci ri zos busmop difahke gever vu gevcafuv gegir. Mawolum subbavtid nujpacku pe lihacunob genhohko hasuvune zeol dolmuvpup tehuf fogzuv useoj olupul numhadma ewpu ba idpi.",
 *	  "application_examples": "Fepzanzoz ezi lali umecuvi taw wiodamus dotusmuk tan jelon femiw ev betop kepmucopi igfa doge algah iwi zorsa. Paceve mus segu rav kafoc vuj miidupuk idezumudu wugucli jufuw dipemvuf erpa bic fejceh geezedop. Oppuvum li fonojoli hazzo gu para jibaiv ke keti ehonig vipuz ne. Um kera zenuj cebzu debas subhe utuoposo nozfagam etuvoz voneh apuwawti jezrobmu po obialbeb. Aloaloug kobhaw feih jekavweh sathupje ka tas bep kivas tifezjij ufaugu hufo zucko if. Rud geze osepaf demgojid sasas ci urizumura ir mu la disgace ko wun beczu corkon bumfoh.",
 *	  "installation_time": 460,
 *	  "solves_problem": "Aja pikji weheare subab fe idfewomo uli habpu nigic kulo kuswinli jaip meih. Wen difjeif enmam ed goc zij horzandel bosedlo ticvomob nid nontewo gi zapse davubu kodagcof vub upane ewa. Perbul uno ruvdew hapcapheg womecid gudlazmi wukeg kaco tuzwiswi gehewac dosde ega ilaupudez muhogov daecusa ujew ha. Tawnul uwici ila kab esutuceba ifdef biari bahuk bo arukab coz pipvemo affag olaji ficjo uni ir firod. Owobe amovhal tukji paotebef pu lit ser galiko atuful pidmemoso zo foda ci tef su. Fom opuud lonfozde dudrecuh kon mibe sevzatar hodoci ritja sufo siokutag we nuwic.",
 *	  "entailes_problem": "Pihmisru viikme otgan li sajho gi apitemni cosema rumemjas eweuwki os fenvi vabeh ozato hu fa rijeca. Bibpoztam fos rim hiw nij dikbuj ikehol ci vuhsafe vivgavazu vog koge gezaciv. Pezzu ivbovnuv ipajodza vepiek wup ri veczupib dim owneilu risem zerub nadukdil. Tiwej tiv guvukuap lageiti gofava lupo lukfehej lovborgu fehidu ic rufzafli ug kiz ba meowe wiwugsu anitema. Wuz ihheg wecrij reaco tajut jotmidfiv sododwop nijrunvub gutij zi julpib surisnu zomman. Cet baw subgobana opvaja leobo kofed eriab fe sulmuf pa ideli voci pal ibo tuc mo ed kihlo. Veal mivewa tenub dum ifkiw nudde ap ob nebvanene luilo du fabevuap acuiz wacedam oj owi edguaci.",
 *	  "requirements": "Gac jo webiic gamna wataas kobihe famom nos divsi wa obe ifdi ebcuvor pi neas gelri. Focwuj eg picac hukig ofsi silelhuw jelbomura tadive niz atuofesi risjo ul gazezku ligmacono pimzacpop. Gudborsu nohowpiv tuluhate mi eheroses fusuz eriak seb mizemirij lokuw ucewubo vaevbo coka. Favifo vice gafre ka nuufno jetuici ved imiuhape uno periw tozpih puirago iruorato gu giavaro abefar hucsavem appe. Saro erebam egujucuc ihi jofpajhu wer jubucvaj hiojek ce wuhor hon gure ubcugsew.",
 *	  "risks": "Foctopu du aneimuhor awolakom ki hiforsiz leis beneggar zajzab nepi tu ekugoar rodbubew wovubla wanis. Okoeku kelegik at cuesinor sem huf ziego conagco wiharga inootaho kerwakoke do giwib uja buczub fo. Buhmi cab jerca wir va cil vu bechev pib duvpicku ka cieba ocnup dija ihuekano lage.",
 *	  "contribution": "Widejegi belfa jot ho awugo vam mimupu so do ni hucve burenle damkit oco ahevopu hal guju. Giehuje maina kuze os zogom supod divwowir co ti si rolmawbiz rawmanaf ew cirim ve. Ta dej unimu rujzula laurten zag gutu awgoj it ni vi zuz. Conevet puwuw orucum vi uzbaef maw vapiki hemopva lokahmeg ziki cac hoita ugimeewu agela cogule zis pechiseg. Ohje posbih lelzu sebru ri ew baefcaj na dom eviemilaj mevikpoz pefhed. Ti bic nit uk jepija gibehere muzosazoh civkova ud nucic et edzurbot pofvoab joterma.",
 *	  "status": "draft",
 *	  "created_at": "2020-09-29 20:10:08",
 *	  "updated_at": "2020-09-29 20:10:08",
 *	  "objectID": "technology-2"
 *	},
 *	{
 *	  "id": 3,
 *	  "title": "Hiti wabgehum vakfizik.",
 *	  "slug": "hiti-wabgehum-vakfizik",
 *	  "description": "Ger jocif su komatva oz viogo pe actop guzok kaiwika ziveha zoapaeme. Tanivu am bectasrim bushevpok wi kid posuj vuleda om kuetgal kivukwi ahjif zezup kekene. Oloan asmodut fizes railu vaifju facfoz ced vopzez amulemo la rije sa gil ezo beb. Nin oc ef lud rok udo muv em mudotke du gukdere oscese vonojil ujhafiv ekoh zibiseupi itibof pacebgo.",
 *	  "private": 0,
 *	  "thumbnail_id": null,
 *	  "likes": 0,
 *	  "patent": 0,
 *	  "patent_number": "kn3uLO3X",
 *	  "primary_purpose": "Bo gu sazcol awroz ad gozob jeb ova ovu ojge nace napom pa sa ni igelobju. Idova fo gaezfot sulfac dojucbij seabeuha so mev bu sikal gaevuvi we gaj co. Ocamige hiksoz wiw huwozu ji ahsohli neze sa rejnoz zahocled dimakjov apkavkum soceje dehatzip kor. Nuhivi fugudako zumid udwib ireha dujda oh vefkel wavitoiw kow pitsabcu galap negupabo gannecpos uwisu rudiwba. Tuhajabic uztafe canhokmob famizpe kosni bur kih vatfanmog atetub ga riko koinu hof tamobikim.",
 *	  "secondary_purpose": "Wujow ni hiwli udtoga ci onuwhet kodec to web hewirobu cevercug hiod co tedwiek filfudeb ubead ceenfuj. Geoz beajouz fegajebem tugo fanusup ovzukak dar lod rucjag kilim ore ta acufi loztoza. Sijejure az lu enenu cubetsit sajolofu deuhet nicej fozkucna icitezu me riccuvrej igzece viw uheziego oza. Rih lasushaf usiwa tazpafik gifcidvob eplekpis dajhal ra piljiip tu wij di bezacejun. Niugijuc co fe koicum judnud vujeta bebcala bape rega di ja kockuf. Rawnewot kuabe hawacti dir apepa uvofibrof lafnusno uk dovec afuigifi nufudied tivo tuv kid. Cuzhozir vo nu amacevfo ijnezju zah ditceebu me zaopja pog bu dar copi odurob tehe silas.",
 *	  "application_mode": "Tacagam ropvec zok sec gebzimip doalobi ehuwuhuk kep lulcaw gujodev tawoud diviz tuuji. Fupaeh hava reza lajci nuwdom bobo tinhor gos wusu albajip rugume ju bifi tevag oro nejte. Busur meewofo wabtostu bupolem cehapo feurige lacpobtov sodibab ojugonis me wu piatirip di abzapkej koswej kelzeska ivosefog semar. Ce tulezoju jaihhus oconola cuwtuwme ihbot ko jordak eb azoudi parjub nudavni mecigbo var kec. Cahlad ganuaf voum ranos uthakir ge pon ace jegufuj vun milhazbu torvogwun luburik kegvuf nelum gulnadri.",
 *	  "application_examples": "Giziw ugli kuz bukbedun zena nek ozuatuof gi femdo ma kibzuwe bewo wugiwopu tedifeli. Uzuvi wema cuzfagkaj okajilip egij uwiukgow jashopmi duwjat no ecban us pu. Ohkon hozcob wif jeedi ripunep foteip kac zicutib fe jelakevot fohzocic nanlem hajati daije ezukuc adhehgil. Bug jitwibbob desfohal evepuk li vazcob ir zera bub nujhozo pongalsof furcadud uwe amiti. Rojfitjut vublan zozsimago ekveh goolarap zemoz vocredofe biziare hito tum wuetpa ajifeno dawogif watsofi mokulme neopikuf tib. Ociatzi fepge wuh zivzi domsabva feli peh law le nob ewi zirefza evsumaz cuf perrozse. Gizosod volarij omael kowa boko zuklul gip mutom kupvih ekocok pec kutdac sobaji sovva ref wom.",
 *	  "installation_time": 563,
 *	  "solves_problem": "Ijog evhilwe kofanzu zabjizo wemawi ro nedku vac kimif tu ojga oz uri faga fun ephib. Vuw huafice jitva abejodo veilu zutkir la dozwicuj gelzag va muma cokiazu omotewihi basaliw. Roto so ugeewija lone en aj vecuz nepvi amu rasafbo kisireh jecvad fiwalemi how. Uvini awimuwbe vecvufe zoigaho vag guhak biil wew upasagtul eve ne fudfu. Il ja gechisa ris doruba vo abmoeze vazjavip ka eciop fareb vev tu. Difipsop puvwoiha cod zoude haptinpub gitibiru uzu vuz veziwvov holsa oji suf neh vinras. Dobnokja di cujoz kul zoj devutes furko una bi mu uwfiv benoj nafrobot es ras ad.",
 *	  "entailes_problem": "Va peplik ahfod il saphobej fefkigcoj guf bine nenural zefmoh lezfujzah kaf nitvavbu gar tebsofhog. Tingojcor ko egu los ibu jodoke lecunu en rej buama tevda si. Dano jez jokowfi ola mazjobik osu vazzah wuzip koni beg ruhahno derome deud cacouti gujubgu santor zi ipagu.",
 *	  "requirements": "Ja ruw belaf eratirul got segsecok gogoc upgacfu duz gipa nepir burebu tirahwi hasug munekfo fizipa. Nomhonzu vedtuj fu tuh wetgek pashasvu le eli epvoud tusbo lophar bulaote. Cih buk ted variclo ac jo zifi kod te fiwwid hijwelaj ida.",
 *	  "risks": "Mavbihdu wuw gug huvulli bosfa zej co ku saf ber lefem benaeki fo lugocnek. Fohra ci gos surha fohsabma jibsu va avhamvos zir sa ih ek omuigigif mosas. Dipgoon rugaufi ulgefcek nadu viwipus ceme fib juk fo kim kenup uk ter. Vopoh fej hemiasa digefis ub usfedkap sij ro itbusveh jalebus lim egafoto guadefo bug ziso. Wiflub jomduvdo cuniphu lu kivtimfe si dupur be lo awpo wugvud zagahap cilrebgoj zujubucem wigfa. Pot jeoti fep leti bezterrez fawo zofgu bako voupahet ina ukefedis joplib za fefevuh zo vaztes dijowbu.",
 *	  "contribution": "Wom tuvsijcet zekpa vulbeguda puokiuwo kirdav de hej luzu re vepkow hez pahar ilvev fudcekzus af va ehhic. Dusivuc cih waotupe gadwe jaeh sa juecbuc ju ahelwaw gaimace bijevas rib vimsepfup givu puacdah rufeec bojo iri. Kemofnu te pabjukic ne rupogzoh huvsepmo zopihsa zumav livkom ka gasami duneadu. Ciwaso lejtupmid na ji dopnijal ohohzus kofep hon emhom wa hogget lopac juwraam mumgoko. Tafako ro haaf sounra juep jedlina leefu uzfuzili burugapuc ihe upive dowavow esipebe. Agofa wadecva ditju zofruvom kulmeni gujpuofe ep ivi itoke jurfeste nah pog.",
 *	  "status": "draft",
 *	  "created_at": "2020-09-29 20:10:08",
 *	  "updated_at": "2020-09-29 20:10:08",
 *	  "objectID": "technology-3"
 *	},
 *	{
 *	  "id": 4,
 *	  "title": "Cijwujuk eloeko toneca.",
 *	  "slug": "cijwujuk-eloeko-toneca",
 *	  "description": "Mabu rem mi hafubwit gu ipave zulla agoc ficmo ipva li ofdu ni hisfikcuz rocu. Gimile usce ce ezewe vazep seemo issodat wewuz vof wa agime kuckuz igpeor huehazez kuukisiv diike. Calhal jaeh kafuli adgotla nape kaal uce dunkevku asigan feb fejucgik nerawozo vokefaw zenzosis idvene. Bobubmel folcav dak zor pucus ceujaab calog ubzul tufwiru mundage ufhi bomorumo ruzeb calwuv. Ijeseebu piosu vajveesu te biad savusdig gefaru wajihew kimehik fi ce jeuwefi amoce tucfis fuzimji gos hagop. Cilufju fonosemu eloako uruocwan zulolow kopobel hicu wa ti aka atwo fe bas. Mavdawij muanbe fi rikfor rimmonel gevit vu abezebvu afezeedo vuzipot akzupor depuffu kusu ewi je do.",
 *	  "private": 1,
 *	  "thumbnail_id": null,
 *	  "likes": 0,
 *	  "patent": 1,
 *	  "patent_number": "2G5Ty4z7",
 *	  "primary_purpose": "Bippew catwe oke meih rof di cucurikiz bac fiaha birouhe zohiksuc echeh fel. Neckop ohci opbur fuvmoj olo gojseme za vek ja be omulo nagpi puvu az nakew zon rohwidat cipzud. Vitunel gi oseseova rumew ub guta la jowi bo tavzikwi mo azo jodpeb joptegniv vumuw fikifa re pemulit. Neawuir lufet hadibi tor togew dedenkev gidu kad uzcacmas wabjumsih tero dakzu zo no de ukohuf min. Dezpaer uhu te hivpi pipoj mif boup inheifi itujikoj ojhu jog be cin segendem toj.",
 *	  "secondary_purpose": "Lehezawo nuvisilun disevpuz tizvevu etcetu ojiwipfic cocaveolu ufjepmi co zodawon vubo cogof tu. Eso dejedek inwob ji wil enuna afi kad jihuphi newo diuwel rebu. Pogad midu ti ine iraajo si rok odawri fidve hajef sukwu ruzbiv mam sip ub od ga. Fuve eheuce lahoz sitpa famekuv agi igomut kib zocamohe wosopilu palaage iticar cuhhaawe ekworbo lirebeme ukco. Nepipzer uvefe upzojtu fa zuglagap owukab to icgur jum julbe zu duklawzug.",
 *	  "application_mode": "Gosam fih nejhijof gajze bu zuiloso majebgu ba nirorge lu dive enjon vibrivu. Du cuglowce fu zew owno uddokom uf sije kunum higinfov opeanfen jawubef ze giireuw cum celukooz. Tacufab poj eviju covuc legfabwo ufnamebe teizla hu gutugfif ogawid luthetuw fueve pa. Kad duj nuzut ipihunar vej lebahub rudhozi ince hev gavdovud sahuz lepoz zeadazi gigoeza suidtiv. Ecotoruri kurefuupu mu fu dagu sah et ji taj hajuc lewini lab ramme nu igduru me du jadga. Zehut vaewocis bibtoswo ovkaow bolrasfaz wor mi kilef votub hujvak ekva becnuv miguz. Lavfunte ci mezez pujzusmi za cugnotad ges se tu wu bozdus zowekzej wag.",
 *	  "application_examples": "Tu jeagifi cid ri sid puc ojatefha pasvu ma ajawotas imledju vusajat guvda jiconjuj decluwuni cemdapo. Kitu ewsig ahvi venuze hekuw om ehun jak sasab fivgieva kokicte jalusu rukgipvur ifkecah fitil weseffo zufelurej kisriwal. Wetolpoh os olgobonu ewoasasij duhbehsul fornercav zetlojalo needaga sa ofsah jidhapaza sesip ceplu uf lemoczop duki bape.",
 *	  "installation_time": 272,
 *	  "solves_problem": "Jotura dello tufledof hera reh nup co bidavav new ja etuduri mob kaned jo diz kobef minpeuj wet. Hizcod ebojotug bu ce etlab gougu nuzi ul mul gob maliv gahuwpof wuhobgaj tecdahjuc fos rejjemih. Tumuzsa vapfafon lucu suvbacvoc ra vu aze degejre gahipurum rodfek vumtib zosivuoci fag gub siz semco. Fewim icbi zi ovu pen unjiaja kejihke ubu zubneg subreuw lumunfe ano.",
 *	  "entailes_problem": "Cogomag ni gozi ednumep tuwos cu pu bameig do gemwobu resu vilalre zacvalur gam kuhez atuko mi pu. Gevpo tu wita paniz kav fupur ekozduv otnelfaz kata komjiad zuca pevgaj kive takvideto. Fotu bivkunol bogfuz ijenusis huijuwo cobu negki buvge iwme manmica zalti dimon wesac haufe. Ka dukegu diupe ika rebfiop ohteppu zu wotus tef cuw hifo bucefera waw zo. Moh oki fiudolo kuowofe cejza ferege ik ace lohlucot nozhu nibdu po sacol fo.",
 *	  "requirements": "Lumme zegodor rauhfet wu imujiaj ile jew gezpo jocti giv tatavvok vaejize wogipte. Efu dodafpo ode vikujbo hel pubkov akaacof fowe adehib odelo locus bewor loj dureveoc zu ifoetke tiizbe. Favzolat zeunebu gobubga imuva paver riz ene opeekbas ekepab nuptaete takecaav bembaf irrukgew wazim. Julir gogiti kevi foczizo in piwvuf conu javmemga kowwebwe up su fi tucza zuolzod gubivaci.",
 *	  "risks": "Tiv zubakdi sedal po iwi ji vuabe namud vuaco jiwvuwlep se aze cujcoko rosunjal fevap. Ofodiot bezekis jiwgermi fiten re cun goisnap hojluplam je sipcuru ok uzedot donhahtab. Ledeke nubav bikuz tut ra noro uwo kugipepi govhac kokura hewode fukfehves vum zoujevi ne juza. Oj egdu vedes irunebtom mu uhapu gilpok sirze vedcumtu bo owulo guckasov ecirocvu bi seuzole tapzu bunvop.",
 *	  "contribution": "Raz iha masik bubsur gej bazada zizebto uko ne baz mokisife mow kokunzec wunifzoh ipapubno. Hazufeh lif zevnicaja patjiv zum bob zooco zu de na izjug foboccel ijjova zaaja famalzer umiv ba di. Leg vo juktehi umkejpu nulgam wuce famluvmub roli japi vesod gal tu. Jakpik pafwoco bij esuhut viw mero etohabop me nasidmi pimirfis nuspagew deri erutugtek soik. Guja mudat wepgavfes givebaz ni rofab res ruc nufukeno gucwamug ra riku va je mo cujsenoh.",
 *	  "status": "draft",
 *	  "created_at": "2020-09-29 20:10:08",
 *	  "updated_at": "2020-09-29 20:10:08",
 *	  "objectID": "technology-4"
 *	}
 * ]
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
Route.get('/reviewer/technologies', 'ReviewerController.getReviewerTechnologies').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.REVIEWER]),
]);
/**
 * @api {get} /revisions/:technology Lists all Reviewer Technology Revisions
 * @apiGroup Reviewers
 * @apiPermission REVIEWER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiParam (Query Param) {String="approved","requested_changes","rejected"} [assessment] Optional reviewer assessment to filter
 * @apiParam (Route Param) {Number|String} technology Mandatory Technology ID or Slug
 * @apiSuccess {Object[]} revisions Revision Collection
 * @apiSuccess {Number} revisions.id Revision ID.
 * @apiSuccess {String} revisions.description Revision description.
 * @apiSuccess {Number} revisions.reviewer_id Reviewer ID.
 * @apiSuccess {Number} revisions.technology_id Technology ID.
 * @apiSuccess {String="approved","requested_changes","rejected"} revisions.assessment Reviewer Assessment.
 * @apiSuccess {Number} revisions.attachment_id Attachment ID.
 * @apiSuccess {Date} revisions.created_at Revision Register date
 * @apiSuccess {Date} revisions.updated_at Revision Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 	{
 *	 	  "id": 10,
 *	 	  "technology_id": 1,
 *	 	  "reviewer_id": 1,
 *	 	  "description": "Corrija o titulo da tecnologia",
 *	 	  "assessment": "requested_changes",
 *	 	  "attachment_id": null,
 *	 	  "created_at": "2020-09-30 20:55:03",
 *	 	  "updated_at": "2020-09-30 20:55:03"
 *	 	},
 *	 	{
 *	 	  "id": 11,
 *	 	  "technology_id": 1,
 *	 	  "reviewer_id": 1,
 *	 	  "description": "Outra coisa, faltou o objetivo especifico",
 *	 	  "assessment": "requested_changes",
 *	 	  "attachment_id": null,
 *	 	  "created_at": "2020-09-30 20:55:40",
 *	 	  "updated_at": "2020-09-30 20:55:40"
 *	 	},
 *	 	{
 *	 	  "id": 12,
 *	 	  "technology_id": 1,
 *	 	  "reviewer_id": 1,
 *	 	  "description": null,
 *	 	  "assessment": "approved",
 *	 	  "attachment_id": null,
 *	 	  "created_at": "2020-09-30 20:56:42",
 *	 	  "updated_at": "2020-09-30 20:56:42"
 *	 	},
 *	 	{
 *	 	  "id": 13,
 *	 	  "technology_id": 1,
 *	 	  "reviewer_id": 1,
 *	 	  "description": "Por favor inclua os objetivos secundarios",
 *	 	  "assessment": "requested_changes",
 *	 	  "attachment_id": null,
 *	 	  "created_at": "2020-09-30 21:06:27",
 *	 	  "updated_at": "2020-09-30 21:06:27"
 *	 	},
 *	 	{
 *	 	  "id": 14,
 *	 	  "technology_id": 1,
 *	 	  "reviewer_id": 1,
 *	 	  "description": "Inclua também o valor do financiamento",
 *	 	  "assessment": "requested_changes",
 *	 	  "attachment_id": null,
 *	 	  "created_at": "2020-09-30 21:07:09",
 *	 	  "updated_at": "2020-09-30 21:07:09"
 *	 	},
 *	 	{
 *	 	  "id": 15,
 *	 	  "technology_id": 1,
 *	 	  "reviewer_id": 1,
 *	 	  "description": "Infelizmente sua tecnnologia não se enquadra no semi-arido",
 *	 	  "assessment": "rejected",
 *	 	  "attachment_id": null,
 *	 	  "created_at": "2020-09-30 21:12:39",
 *	 	  "updated_at": "2020-09-30 21:12:39"
 *	 	},
 *	 	{
 *	 	  "id": 16,
 *	 	  "technology_id": 1,
 *	 	  "reviewer_id": 1,
 *	 	  "description": "Technology approved",
 *	 	  "assessment": "approved",
 *	 	  "attachment_id": null,
 *	 	  "created_at": "2020-10-05 11:08:41",
 *	 	  "updated_at": "2020-10-05 11:08:41"
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.get('/revisions/:technology', 'ReviewerController.getRevisions').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.REVIEWER]),
]);
