/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Technology routes */
/**
 * @api {post} /technologies Creates a new Technology
 * @apiGroup Technologies
 * @apiPermission CREATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} title Mandatory Technology Title.
 * @apiParam {String} description Mandatory Technology Description.
 * @apiParam {Boolean} [private] Optional Private Param
 * @apiParam {String} [thumbnail_id] Optional Thumbnail ID file
 * @apiParam {Boolean} intellectual_property Mandatory Technology intellectual property
 * @apiParam {Boolean} patent Mandatory Technology Patent.
 * @apiParam {String} [patent_number] Optional Patent Number
 * @apiParam {String} [primary_purpose] Optional Primary Purpose
 * @apiParam {String} [secondary_purpose] Optional Secondary Purpose
 * @apiParam {String} [application_mode] Optional Application Mode
 * @apiParam {String} [application_examples] Optional Application Examples
 * @apiParam {Number} [installation_time] Optional Installation Time in days
 * @apiParam {String} [solves_problem] Optional Solves Problem
 * @apiParam {String} [entailes_problem] Optional Entailes Problem
 * @apiParam {String} [requirements] Optional Requirements
 * @apiParam {String} [risks] Optional risks
 * @apiParam {String} [contribution] Optional Contribution
 * @apiParam {String} [status] Optional status
 * @apiParam {Object[]} [users] Optional Related Users
 * @apiParam {Number} [users.userId] User Related ID
 * @apiParam {String} [users.role] User Related Role
 * @apiParam {Number[]|String[]} [terms] Optional Related Terms
 * @apiParamExample  {json} Request sample:
 *    {
 * 		title: 'Test Title',
 * 		description: 'Test description',
 * 		private: 1,
 * 		thumbnail_id: 1
 * 		intellectual_property: 1,
 * 		patent: 1,
 * 		patent_number: '0001/2020',
 * 		primary_purpose: 'Test primary purpose',
 * 		secondary_purpose: 'Test secondary purpose',
 * 		application_mode: 'Test application mode',
 * 		application_examples: 'Test application example',
 * 		installation_time: 365,
 * 		solves_problem: 'Solves problem test',
 * 		entailes_problem: 'Entailes problem test',
 * 		requirements: 'Requirements test',
 * 		risks: 'Test risks',
 * 		contribution: 'Test contribution',
 * 		status: 'DRAFT',
 * 		users:[
 * 			{
 * 				userId: 1
 * 			},
 * 			{
 * 				userId: 2,
 * 				role: 'DEVELOPER',
 * 			}
 * 		],
 * 		terms:[105, 'meerkat']
 *    }
 * @apiSuccess {Number} id Technology ID.
 * @apiSuccess {String} title Technology Title.
 * @apiSuccess {String} description Technology Description
 * @apiSuccess {Boolean} private Private Param
 * @apiSuccess {Boolean} intellectual_property Technology Intellectual Property.
 * @apiSuccess {Boolean} patent Technology Patent.
 * @apiSuccess {String} patent_number Patent Number
 * @apiSuccess {String} primary_purpose Primary Purpose
 * @apiSuccess {String} secondary_purpose Secondary Purpose
 * @apiSuccess {String} application_mode Application Mode
 * @apiSuccess {String} application_examples Application Examples
 * @apiSuccess {Number} installation_time Installation Time in days
 * @apiSuccess {String} solves_problem Solves Problem
 * @apiSuccess {String} entailes_problem Entailes Problem
 * @apiSuccess {String} requirements Requirements
 * @apiSuccess {String} risks Technology risks
 * @apiSuccess {String} contribution Contribution
 * @apiSuccess {String} status status
 * @apiSuccess {String} slug Technology Slug
 * @apiSuccess {String} objectID Technology ObjectID
 * @apiSuccess {Number} likes Technology likes
 * @apiSuccess {Date} created_at Technology Register date
 * @apiSuccess {Date} updated_at Technology Update date
 * @apiSuccess {Object[]} users Technolgoy related users
 * @apiSuccess {Number} users.id User ID
 * @apiSuccess {String} users.email User Email
 * @apiSuccess {String} users.status User Status
 * @apiSuccess {String} users.first_name User First Name
 * @apiSuccess {String} users.last_name User Last Name
 * @apiSuccess {String} users.full_name User Full Name
 * @apiSuccess {String} users.secondary_email User Secondary Email
 * @apiSuccess {String} users.company User Company
 * @apiSuccess {String} users.zipcode User ZipCode
 * @apiSuccess {String} users.cpf User CPF
 * @apiSuccess {String} users.birth_date User Birth date
 * @apiSuccess {String} users.phone_number User Phone Number
 * @apiSuccess {String} users.lattes_id User Lattes Id
 * @apiSuccess {String} users.address User Address
 * @apiSuccess {String} users.address2 User Address2
 * @apiSuccess {String} users.district User District
 * @apiSuccess {String} users.city User City
 * @apiSuccess {String} users.state User State
 * @apiSuccess {String} users.country User Country
 * @apiSuccess {Number} users.role_id User Role ID
 * @apiSuccess {Date} users.created_at User Register date
 * @apiSuccess {Date} users.updated_at User Update date
 * @apiSuccess {Object} users.pivot User Technology Relashionship
 * @apiSuccess {Number} users.pivot.user_id User ID
 * @apiSuccess {Number} users.pivot.technology_id Technology ID
 * @apiSuccess {String} users.pivot.role Technology User Role
 * @apiSuccess {Object[]} terms Related Terms
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Number} terms.parent_id Term Parent ID
 * @apiSuccess {Number} terms.taxonomy_id Term Taxonomy ID
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccess {Object} terms.taxonomy Term Taxonomy
 * @apiSuccess {Number} terms.taxonomy.id Taxonomy ID
 * @apiSuccess {String} terms.taxonomy.taxonomy Taxonomy
 * @apiSuccess {String} terms.taxonomy.description Taxonomy Description
 * @apiSuccess {Date} terms.taxonomy.created_at Taxonomy Register date
 * @apiSuccess {Date} terms.taxonomy.updated_at Taxonomy Update date
 * @apiSuccess {Object} terms.pivot Term Technology Relashionship
 * @apiSuccess {Number} terms.pivot.term_id Term ID
 * @apiSuccess {Number} terms.pivot.technology_id Technology ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *		{
 *   "title": "Test Title",
 *   "description": "Test description",
 *   "private": 1,
 *   "intellectual_property": 1,
 *   "patent": 1,
 *   "patent_number": "0001/2020",
 *   "primary_purpose": "Test primary purpose",
 *   "secondary_purpose": "Test secondary purpose",
 *   "application_mode": "Test application mode",
 *   "application_examples": "Test application example",
 *   "installation_time": 365,
 *   "solves_problem": "Solves problem test",
 *   "entailes_problem": "Entailes problem test",
 *   "requirements": "Requirements test",
 *   "risks": "Test risks",
 *   "contribution": "Test contribution",
 *   "status": "DRAFT",
 *   "slug": "test-title",
 *   "created_at": "2020-08-05 19:06:40",
 *   "updated_at": "2020-08-05 19:06:40",
 *   "id": 6,
 *   "likes": 0,
 *   "objectID": "technology-6",
 *   "users": [
 *     {
 *       "id": 1,
 *       "email": "inuz@nu.pf",
 *       "status": "pending",
 *       "first_name": "dnEUHJA7TD",
 *       "last_name": "y@5H5",
 *       "secondary_email": null,
 *       "company": "rb#w4j9rDRic",
 *       "zipcode": "39052",
 *       "cpf": "52095239252",
 *       "birth_date": "2085-09-01 13:22:14.438",
 *       "phone_number": "16928040263",
 *       "lattes_id": "28810456434",
 *       "address": "j3(@2%CF",
 *       "address2": "D9wYiK0",
 *       "district": "KIx2ov6E)*AJ",
 *       "city": "tt[AoL",
 *       "state": "3upVMv1R5fLkcBC11#",
 *       "country": "C%fpX$5[[",
 *       "role_id": 1,
 *       "created_at": "2020-07-28 18:40:31",
 *       "updated_at": "2020-07-28 18:40:31",
 *       "full_name": "dnEUHJA7TD y@5H5",
 *       "pivot": {
 *         "user_id": 1,
 *         "technology_id": 6,
 *         "role": "OWNER"
 *       }
 *     },
 *     {
 *       "id": 2,
 *       "email": "je@lan.za",
 *       "status": "pending",
 *       "first_name": "MHKUk(X*r",
 *       "last_name": "[][^d",
 *       "secondary_email": null,
 *       "company": "Xlq5)",
 *       "zipcode": "23361",
 *       "cpf": "57448477220",
 *       "birth_date": "2048-10-30 19:36:04.284",
 *       "phone_number": "86331181830",
 *       "lattes_id": "43487274724",
 *       "address": "yOtBZ^&Nk1F",
 *       "address2": "Lhym94Qq1)Yv3y",
 *       "district": "oK^mysm]Voi*5c",
 *       "city": "Z&Jdg8K02w0Fspozm",
 *       "state": "E)T7j",
 *       "country": "(J3WjL",
 *       "role_id": 1,
 *       "created_at": "2020-07-28 18:40:31",
 *       "updated_at": "2020-07-28 18:40:31",
 *       "full_name": "MHKUk(X*r [][^d",
 *       "pivot": {
 *         "user_id": 2,
 *         "technology_id": 6,
 *         "role": "DEVELOPER"
 *       }
 *     }
 *   ],
 *   "terms": [
 *     {
 *       "id": 105,
 *       "term": "Buffalo",
 *       "slug": "buffalo",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-07-28 18:40:47",
 *       "updated_at": "2020-07-28 18:40:48",
 *       "taxonomy": {
 *         "id": 2,
 *         "taxonomy": "KEYWORDS",
 *         "description": "Palavras-chave que definem a tecnologia.",
 *         "created_at": "2020-07-28 18:40:33",
 *         "updated_at": "2020-07-28 18:40:33"
 *       },
 *       "pivot": {
 *         "term_id": 105,
 *         "technology_id": 6
 *       }
 *     },
 *     {
 *       "id": 106,
 *       "term": "Meerkat",
 *       "slug": "meerkat",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-07-28 18:40:47",
 *       "updated_at": "2020-07-28 18:40:48",
 *       "taxonomy": {
 *         "id": 2,
 *         "taxonomy": "KEYWORDS",
 *         "description": "Palavras-chave que definem a tecnologia.",
 *         "created_at": "2020-07-28 18:40:33",
 *         "updated_at": "2020-07-28 18:40:33"
 *       },
 *       "pivot": {
 *         "term_id": 106,
 *         "technology_id": 6
 *       }
 *     }
 *   ]
 * }
 * @apiUse AuthError
 * @apiErrorExample {json} Validation Error: Title Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "title é obrigatório e está faltando.",
 *       				"field": "title",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Description Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "description é obrigatório e está faltando.",
 *       				"field": "description",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Patent Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "patent é obrigatório e está faltando.",
 *       				"field": "patent",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: The installation_time should be above 0
 *    HTTP/1.1 400 Bad Request
 *		{
 *		 "error": {
 *		   "error_code": "VALIDATION_ERROR",
 *		   "message": [
 *		     {
 *		       "message": "The installation_time should be above 0.",
 *		       "field": "installation_time",
 *		       "validation": "above"
 *		     }
 *		   ]
 *		 }
 *		}
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
Route.post('technologies', 'TechnologyController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TECHNOLOGIES])])
	.validator('StoreTechnology');
/**
 * @api {post} /technologies/:id/users Associates user(s) to Technology
 * @apiGroup Technologies
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {Object[]} users Users Object Array
 * @apiParam {String} users.email User Email
 * @apiParamExample  {json} Request sample:
 * 	"users":[
 * 			{
 *				"email": useremail01@mail.com,
 *			},
 *			{
 *				"email": useremail02@mail.com,
 *			},
 *	]
 * @apiSuccess {Object[]} users Technolgoy related users
 * @apiSuccess {Number} users.id User ID
 * @apiSuccess {String} users.email User Email
 * @apiSuccess {String} users.status User Status
 * @apiSuccess {String} users.first_name User First Name
 * @apiSuccess {String} users.last_name User Last Name
 * @apiSuccess {String} users.full_name User Full Name
 * @apiSuccess {String} users.secondary_email User Secondary Email
 * @apiSuccess {String} users.company User Company
 * @apiSuccess {String} users.zipcode User ZipCode
 * @apiSuccess {String} users.cpf User CPF
 * @apiSuccess {String} users.birth_date User Birth date
 * @apiSuccess {String} users.phone_number User Phone Number
 * @apiSuccess {String} users.lattes_id User Lattes Id
 * @apiSuccess {String} users.address User Address
 * @apiSuccess {String} users.address2 User Address2
 * @apiSuccess {String} users.district User District
 * @apiSuccess {String} users.city User City
 * @apiSuccess {String} users.state User State
 * @apiSuccess {String} users.country User Country
 * @apiSuccess {Number} users.role_id User Role ID
 * @apiSuccess {Date} users.created_at User Register date
 * @apiSuccess {Date} users.updated_at User Update date
 * @apiSuccess {Object} users.pivot User Technology Relashionship
 * @apiSuccess {Number} users.pivot.user_id User ID
 * @apiSuccess {Number} users.pivot.technology_id Technology ID
 * @apiSuccess {String} users.pivot.role Technology User Role
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *		{
 *			"id": 12,
 *			"email": "sabiatestinge2e@gmail.com",
 *			"status": "verified",
 *			"first_name": "FirstName",
 *			"last_name": "LastName",
 *			"company": null,
 *			"zipcode": null,
 *			"cpf": null,
 *			"birth_date": null,
 *			"phone_number": null,
 *			"lattes_id": null,
 *			"address": null,
 *			"address2": null,
 *			"district": null,
 *			"city": null,
 *			"state": null,
 *			"country": null,
 *			"role_id": 1,
 *			"created_at": "2020-08-06 20:41:55",
 *			"updated_at": "2020-08-06 20:41:55",
 *			"full_name": "FirstName LastName",
 *			"pivot": {
 *			"user_id": 12,
 *			"technology_id": 1,
 *			"role": "OWNER"
 *			}
 *		},
 *		{
 *			"id": 17,
 *			"email": "useremail01@mail.com",
 *			"status": "invited",
 *			"first_name": null,
 *			"last_name": null,
 *			"company": null,
 *			"zipcode": null,
 *			"cpf": null,
 *			"birth_date": null,
 *			"phone_number": null,
 *			"lattes_id": null,
 *			"address": null,
 *			"address2": null,
 *			"district": null,
 *			"city": null,
 *			"state": null,
 *			"country": null,
 *			"role_id": 1,
 *			"created_at": "2020-08-14 20:29:49",
 *			"updated_at": "2020-08-14 20:29:49",
 *			"full_name": "null null",
 *			"pivot": {
 *			"user_id": 17,
 *			"technology_id": 1,
 *			"role": "DEFAULT_USER"
 *			}
 *		},
 *		{
 *			"id": 18,
 *			"email": "useremail02@mail.com",
 *			"status": "invited",
 *			"first_name": null,
 *			"last_name": null,
 *			"company": null,
 *			"zipcode": null,
 *			"cpf": null,
 *			"birth_date": null,
 *			"phone_number": null,
 *			"lattes_id": null,
 *			"address": null,
 *			"address2": null,
 *			"district": null,
 *			"city": null,
 *			"state": null,
 *			"country": null,
 *			"role_id": 1,
 *			"created_at": "2020-08-14 20:29:49",
 *			"updated_at": "2020-08-14 20:29:49",
 *			"full_name": "null null",
 *			"pivot": {
 *			"user_id": 18,
 *			"technology_id": 1,
 *			"role": "DEFAULT_USER"
 *			}
 *		}
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
 * @apiErrorExample {json} Validation Error: Users Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The users is required.",
 *       				"field": "users",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: User Email Required when users exists
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The users.0.email is required when users exist.",
 *       				"field": "users.0.email",
 *       				"validation": "requiredIf"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.post('technologies/:id/users', 'TechnologyController.associateTechnologyUser')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
	])
	.validator('TechnologyUser');
/**
 * @api {post} /technologies/:id/terms Associates term(s) to Technology
 * @apiGroup Technologies
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {String[]|Number[]} terms Term Array, Term ID or Term Slug
 * @apiParamExample  {json} Request sample:
 * 	"terms":["ufersa",230, 231]
 * @apiSuccess {Object[]} terms Technolgoy related terms
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Number} terms.parent_id Term parent ID
 * @apiSuccess {Number} terms.taxonomy_id Taxonomy ID
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccess {Object} terms.pivot Term Technology Relashionship
 * @apiSuccess {Number} terms.pivot.term_id Term ID
 * @apiSuccess {Number} terms.pivot.technology_id Technology ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * 	[
 *		{
 *		  "id": 232,
 *		  "term": "UFERSA",
 *		  "slug": "ufersa",
 *		  "parent_id": null,
 *		  "taxonomy_id": 10,
 *		  "created_at": "2020-08-23 10:28:48",
 *		  "updated_at": "2020-08-23 10:28:48",
 *		  "pivot": {
 *		    "term_id": 232,
 *		    "technology_id": 1
 *		  }
 *		},
 *		{
 *		  "id": 230,
 *		  "term": "Llama",
 *		  "slug": "llama",
 *		  "parent_id": null,
 *		  "taxonomy_id": 2,
 *		  "created_at": "2020-08-19 20:58:30",
 *		  "updated_at": "2020-08-19 20:58:30",
 *		  "pivot": {
 *		    "term_id": 230,
 *		    "technology_id": 1
 *		  }
 *		},
 *		{
 *		  "id": 231,
 *		  "term": "Atlantic Wolffish",
 *		  "slug": "atlantic-wolffish",
 *		  "parent_id": null,
 *		  "taxonomy_id": 2,
 *		  "created_at": "2020-08-19 20:58:30",
 *		  "updated_at": "2020-08-19 20:58:30",
 *		  "pivot": {
 *		    "term_id": 231,
 *		    "technology_id": 1
 *		  }
 *		}
 * 	]
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
 * @apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Terms Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The terms is required.",
 *       				"field": "terms",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 
 */
Route.post('technologies/:id/terms', 'TechnologyController.associateTechnologyTerm')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
	])
	.validator('TechnologyTerm');
/**
 * @api {put} /technologies/:id Updates a Technology
 * @apiGroup Technologies
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {String} [title] Optional Technology Title.
 * @apiParam {String} [description] Optional Technology Description.
 * @apiParam {Boolean} [private] Optional Private Param
 * @apiParam {String} [thumbnail_id] Optional Thumbnail ID file
 * @apiParam {Boolean} intellectual_property Mandatory Technology intellectual property
 * @apiParam {Boolean} [patent] Optional Technology Patent.
 * @apiParam {String} [patent_number] Optional Patent Number
 * @apiParam {String} [primary_purpose] Optional Primary Purpose
 * @apiParam {String} [secondary_purpose] Optional Secondary Purpose
 * @apiParam {String} [application_mode] Optional Application Mode
 * @apiParam {String} [application_examples] Optional Application Examples
 * @apiParam {Number} [installation_time] Optional Installation Time in days
 * @apiParam {String} [solves_problem] Optional Solves Problem
 * @apiParam {String} [entailes_problem] Optional Entailes Problem
 * @apiParam {String} [requirements] Optional Requirements
 * @apiParam {String} [risks] Optional risks
 * @apiParam {String} [contribution] Optional Contribution
 * @apiParam {String} [status] Optional status
 * @apiParam {Object[]} [users] Optional Related Users
 * @apiParam {Number} [users.userId] User Related ID
 * @apiParam {String} [users.role] User Related Role
 * @apiParam {Number[]|String[]} [terms] Optional Related Terms
 * @apiParamExample  {json} Request sample:
 *    {
 * 		title: 'Updated Test Title',
 * 		description: 'Updated test Test description',
 * 		private: 1,
 * 		thumbnail_id: 1
 * 		intellectual_property: 1,
 * 		patent: 1,
 * 		patent_number: '0001/2020',
 * 		primary_purpose: 'Test primary purpose',
 * 		secondary_purpose: 'Test secondary purpose',
 * 		application_mode: 'Test application mode',
 * 		application_examples: 'Test application example',
 * 		installation_time: 365,
 * 		solves_problem: 'Solves problem test',
 * 		entailes_problem: 'Entailes problem test',
 * 		requirements: 'Requirements test',
 * 		risks: 'Test risks',
 * 		contribution: 'Test contribution',
 * 		status: 'DRAFT',
 * 		users:[
 * 			{
 * 				userId: 1
 * 			},
 * 			{
 * 				userId: 2,
 * 				role: 'DEVELOPER',
 * 			}
 * 		],
 * 		terms:[105, 'meerkat']
 *    }
 * @apiSuccess {Number} id Technology ID.
 * @apiSuccess {String} title Technology Title.
 * @apiSuccess {String} description Technology Description
 * @apiSuccess {Boolean} private Private Param
 * @apiSuccess {Boolean} intellectual_property Technology Intellectual Property
 * @apiSuccess {Boolean} patent Technology Patent.
 * @apiSuccess {String} patent_number Patent Number
 * @apiSuccess {String} primary_purpose Primary Purpose
 * @apiSuccess {String} secondary_purpose Secondary Purpose
 * @apiSuccess {String} application_mode Application Mode
 * @apiSuccess {String} application_examples Application Examples
 * @apiSuccess {Number} installation_time Installation Time in days
 * @apiSuccess {String} solves_problem Solves Problem
 * @apiSuccess {String} entailes_problem Entailes Problem
 * @apiSuccess {String} requirements Requirements
 * @apiSuccess {String} risks Technology risks
 * @apiSuccess {String} contribution Contribution
 * @apiSuccess {String} status status
 * @apiSuccess {String} slug Technology Slug
 * @apiSuccess {String} objectID Technology ObjectID
 * @apiSuccess {Number} likes Technology likes
 * @apiSuccess {Date} created_at Technology Register date
 * @apiSuccess {Date} updated_at Technology Update date
 * @apiSuccess {Object[]} users Technolgoy related users
 * @apiSuccess {Number} users.id User ID
 * @apiSuccess {String} users.email User Email
 * @apiSuccess {String} users.status User Status
 * @apiSuccess {String} users.first_name User First Name
 * @apiSuccess {String} users.last_name User Last Name
 * @apiSuccess {String} users.full_name User Full Name
 * @apiSuccess {String} users.secondary_email User Secondary Email
 * @apiSuccess {String} users.company User Company
 * @apiSuccess {String} users.zipcode User ZipCode
 * @apiSuccess {String} users.cpf User CPF
 * @apiSuccess {String} users.birth_date User Birth date
 * @apiSuccess {String} users.phone_number User Phone Number
 * @apiSuccess {String} users.lattes_id User Lattes Id
 * @apiSuccess {String} users.address User Address
 * @apiSuccess {String} users.address2 User Address2
 * @apiSuccess {String} users.district User District
 * @apiSuccess {String} users.city User City
 * @apiSuccess {String} users.state User State
 * @apiSuccess {String} users.country User Country
 * @apiSuccess {Number} users.role_id User Role ID
 * @apiSuccess {Date} users.created_at User Register date
 * @apiSuccess {Date} users.updated_at User Update date
 * @apiSuccess {Object} users.pivot User Technology Relashionship
 * @apiSuccess {Number} users.pivot.user_id User ID
 * @apiSuccess {Number} users.pivot.technology_id Technology ID
 * @apiSuccess {String} users.pivot.role Technology User Role
 * @apiSuccess {Object[]} terms Related Terms
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Number} terms.parent_id Term Parent ID
 * @apiSuccess {Number} terms.taxonomy_id Term Taxonomy ID
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccess {Object} terms.taxonomy Term Taxonomy
 * @apiSuccess {Number} terms.taxonomy.id Taxonomy ID
 * @apiSuccess {String} terms.taxonomy.taxonomy Taxonomy
 * @apiSuccess {String} terms.taxonomy.description Taxonomy Description
 * @apiSuccess {Date} terms.taxonomy.created_at Taxonomy Register date
 * @apiSuccess {Date} terms.taxonomy.updated_at Taxonomy Update date
 * @apiSuccess {Object} terms.pivot Term Technology Relashionship
 * @apiSuccess {Number} terms.pivot.term_id Term ID
 * @apiSuccess {Number} terms.pivot.technology_id Technology ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *   	"title": "Updated Test Titl",
 *   	"description": "Updated test Test description",
 *   	"private": 1,
 *   	"intellectual_property": 1,
 *   	"patent": 1,
 *   	"patent_number": "0001/2020",
 *   	"primary_purpose": "Test primary purpose",
 *   	"secondary_purpose": "Test secondary purpose",
 *   	"application_mode": "Test application mode",
 *   	"application_examples": "Test application example",
 *   	"installation_time": 365,
 *   	"solves_problem": "Solves problem test",
 *   	"entailes_problem": "Entailes problem test",
 *   	"requirements": "Requirements test",
 *   	"risks": "Test risks",
 *   	"contribution": "Test contribution",
 *   	"status": "DRAFT",
 *   	"slug": "updated-test-title",
 *   	"created_at": "2020-08-05 19:06:40",
 *   	"updated_at": "2020-08-06 18:24:38",
 *   	"id": 6,
 *   	"likes": 0,
 *   	"objectID": "technology-6",
 *   	"users": [
 *   	  {
 *   	    "id": 1,
 *   	    "email": "inuz@nu.pf",
 *   	    "status": "pending",
 *   	    "first_name": "dnEUHJA7TD",
 *   	    "last_name": "y@5H5",
 *   	    "secondary_email": null,
 *   	    "company": "rb#w4j9rDRic",
 *   	    "zipcode": "39052",
 *   	    "cpf": "52095239252",
 *   	    "birth_date": "2085-09-01 13:22:14.438",
 *   	    "phone_number": "16928040263",
 *   	    "lattes_id": "28810456434",
 *   	    "address": "j3(@2%CF",
 *   	    "address2": "D9wYiK0",
 *   	    "district": "KIx2ov6E)*AJ",
 *   	    "city": "tt[AoL",
 *   	    "state": "3upVMv1R5fLkcBC11#",
 *   	    "country": "C%fpX$5[[",
 *   	    "role_id": 1,
 *   	    "created_at": "2020-07-28 18:40:31",
 *   	    "updated_at": "2020-07-28 18:40:31",
 *   	    "full_name": "dnEUHJA7TD y@5H5",
 *   	    "pivot": {
 *   	      "user_id": 1,
 *   	      "technology_id": 6,
 *   	      "role": "OWNER"
 *   	    }
 *   	  },
 *   	  {
 *   	    "id": 2,
 *   	    "email": "je@lan.za",
 *   	    "status": "pending",
 *   	    "first_name": "MHKUk(X*r",
 *   	    "last_name": "[][^d",
 *   	    "secondary_email": null,
 *   	    "company": "Xlq5)",
 *   	    "zipcode": "23361",
 *   	    "cpf": "57448477220",
 *   	    "birth_date": "2048-10-30 19:36:04.284",
 *   	    "phone_number": "86331181830",
 *   	    "lattes_id": "43487274724",
 *   	    "address": "yOtBZ^&Nk1F",
 *   	    "address2": "Lhym94Qq1)Yv3y",
 *   	    "district": "oK^mysm]Voi*5c",
 *   	    "city": "Z&Jdg8K02w0Fspozm",
 *   	    "state": "E)T7j",
 *   	    "country": "(J3WjL",
 *   	    "role_id": 1,
 *   	    "created_at": "2020-07-28 18:40:31",
 *   	    "updated_at": "2020-07-28 18:40:31",
 *   	    "full_name": "MHKUk(X*r [][^d",
 *   	    "pivot": {
 *   	      "user_id": 2,
 *   	      "technology_id": 6,
 *   	      "role": "DEVELOPER"
 *   	    }
 *   	  }
 *   	],
 *   	"terms": [
 *   	  {
 *   	    "id": 105,
 *   	    "term": "Buffalo",
 *   	    "slug": "buffalo",
 *   	    "parent_id": null,
 *   	    "taxonomy_id": 2,
 *   	    "created_at": "2020-07-28 18:40:47",
 *   	    "updated_at": "2020-07-28 18:40:48",
 *   	    "taxonomy": {
 *   	      "id": 2,
 *   	      "taxonomy": "KEYWORDS",
 *   	      "description": "Palavras-chave que definem a tecnologia.",
 *   	      "created_at": "2020-07-28 18:40:33",
 *   	      "updated_at": "2020-07-28 18:40:33"
 *   	    },
 *   	    "pivot": {
 *   	      "term_id": 105,
 *   	      "technology_id": 6
 *   	    }
 *   	  },
 *   	  {
 *   	    "id": 106,
 *   	    "term": "Meerkat",
 *   	    "slug": "meerkat",
 *   	    "parent_id": null,
 *   	    "taxonomy_id": 2,
 *   	    "created_at": "2020-07-28 18:40:47",
 *   	    "updated_at": "2020-07-28 18:40:48",
 *   	    "taxonomy": {
 *   	      "id": 2,
 *   	      "taxonomy": "KEYWORDS",
 *   	      "description": "Palavras-chave que definem a tecnologia.",
 *   	      "created_at": "2020-07-28 18:40:33",
 *   	      "updated_at": "2020-07-28 18:40:33"
 *   	    },
 *   	    "pivot": {
 *   	      "term_id": 106,
 *   	      "technology_id": 6
 *   	    }
 *   	  }
 *   	]
 * 	}
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
Route.put('technologies/:id', 'TechnologyController.update').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
/**
 * @api {delete} /technologies/:id Deletes a Technology
 * @apiGroup Technologies
 * @apiPermission DELETE_TECHNOLOGIES or DELETE_TECHNOLOGY
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID.
 * @apiParamExample  {json} Request sample:
 *	/technologies/1
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.delete('technologies/:id', 'TechnologyController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_TECHNOLOGIES, permissions.DELETE_TECHNOLOGY]),
]);
/**
 * @api {delete} /technologies/:id/users/:idUser Deletes a Technology User
 * @apiGroup Technologies
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID.
 * @apiParam (Route Param) {Number} idUser Mandatory Technology User ID.
 * @apiParamExample  {json} Request sample:
 *	/technologies/1/1
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
 * 			}
 *		}
 */
Route.delete(
	'technologies/:id/users/:idUser',
	'TechnologyController.deleteTechnologyUser',
).middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
/**
 * @api {delete} /technologies/:id/terms/:term Deletes a Technology Term
 * @apiGroup Technologies
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID.
 * @apiParam (Route Param) {Number|String} term Mandatory Term ID ou Slug.
 * @apiParamExample  {json} Request sample:
 *	/technologies/1/1
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
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
Route.delete(
	'technologies/:id/terms/:term',
	'TechnologyController.deleteTechnologyTerm',
).middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
/**
 * @api {get} /technologies Lists All Technologies
 * @apiGroup Technologies
 * @apiUse Params
 * @apiSuccess {Object[]} technologies Technology Collection
 * @apiSuccess {Number} technologies.id Technology ID.
 * @apiSuccess {String} technologies.title Technology Title.
 * @apiSuccess {String} technologies.description Technology Description
 * @apiSuccess {Boolean} technologies.private Private Param
 * @apiSuccess {Boolean} technologies.intellectual_property Technology Intellectual Property
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
 *   {
 *     "id": 8,
 *     "title": "Test Title 2",
 *     "slug": "test-title-2",
 *     "description": "Test description",
 *     "private": 1,
 *     "thumbnail_id": null,
 *     "likes": null,
 *     "intellectual_property": 1,
 *     "patent": 1,
 *     "patent_number": "0001/2020",
 *     "primary_purpose": "Test primary purpose",
 *     "secondary_purpose": "Test secondary purpose",
 *     "application_mode": "Test application mode",
 *     "application_examples": "Test application example",
 *     "installation_time": 365,
 *     "solves_problem": "Solves problem test",
 *     "entailes_problem": "Entailes problem test",
 *     "requirements": "Requirements test",
 *     "risks": "Test risks",
 *     "contribution": "Test contribution",
 *     "status": "DRAFT",
 *     "created_at": "2020-08-06 18:58:29",
 *     "updated_at": "2020-08-06 18:58:29",
 *     "objectID": "technology-8"
 *   },
 *   {
 *     "id": 7,
 *     "title": "Test Title",
 *     "slug": "updated-test-title-1",
 *     "description": "Test description",
 *     "private": 1,
 *     "thumbnail_id": null,
 *     "likes": null,
 *     "intellectual_property": 1,
 *     "patent": 1,
 *     "patent_number": "0001/2020",
 *     "primary_purpose": "Test primary purpose",
 *     "secondary_purpose": "Test secondary purpose",
 *     "application_mode": "Test application mode",
 *     "application_examples": "Test application example",
 *     "installation_time": 365,
 *     "solves_problem": "Solves problem test",
 *     "entailes_problem": "Entailes problem test",
 *     "requirements": "Requirements test",
 *     "risks": "Test risks",
 *     "contribution": "Test contribution",
 *     "status": "DRAFT",
 *     "created_at": "2020-08-06 18:58:12",
 *     "updated_at": "2020-08-06 18:58:12",
 *     "objectID": "technology-7"
 *   },
 *   {
 *     "id": 6,
 *     "title": "Updated Test Title",
 *     "slug": "updated-test-title",
 *     "description": "Updated Test description",
 *     "private": 1,
 *     "thumbnail_id": null,
 *     "likes": null,
 *     "intellectual_property": 1,
 *     "patent": 1,
 *     "patent_number": "0001/2020",
 *     "primary_purpose": "Test primary purpose",
 *     "secondary_purpose": "Tests in apidoc",
 *     "application_mode": "Test application mode",
 *     "application_examples": "Test application example",
 *     "installation_time": 365,
 *     "solves_problem": "Solves problem test",
 *     "entailes_problem": "Entailes problem test",
 *     "requirements": "Requirements test",
 *     "risks": "Test risks",
 *     "contribution": "Test contribution",
 *     "status": "DRAFT",
 *     "created_at": "2020-08-05 19:06:40",
 *     "updated_at": "2020-08-06 18:30:37",
 *     "objectID": "technology-6"
 *   },
 *   ...
 */
Route.get('technologies', 'TechnologyController.index').middleware(['handleParams']);
/**
 * @api {get} /technologies/:id Gets a single Technology
 * @apiGroup Technologies
 * @apiParam (Route Param){Number} id Mandatory Technology ID.
 * @apiParam embed Activate Embedding.
 * @apiParamExample  {json} Request sample:
 *	/technologies/6?embed
 * @apiSuccess {Number} id Technology ID.
 * @apiSuccess {String} title Technology Title.
 * @apiSuccess {String} description Technology Description
 * @apiSuccess {Boolean} private Private Param
 * @apiSuccess {Boolean} intellectual_property Technology Intellectual Property
 * @apiSuccess {Boolean} patent Technology Patent.
 * @apiSuccess {String} patent_number Patent Number
 * @apiSuccess {String} primary_purpose Primary Purpose
 * @apiSuccess {String} secondary_purpose Secondary Purpose
 * @apiSuccess {String} application_mode Application Mode
 * @apiSuccess {String} application_examples Application Examples
 * @apiSuccess {Number} installation_time Installation Time in days
 * @apiSuccess {String} solves_problem Solves Problem
 * @apiSuccess {String} entailes_problem Entailes Problem
 * @apiSuccess {String} requirements Requirements
 * @apiSuccess {String} risks Technology risks
 * @apiSuccess {String} contribution Contribution
 * @apiSuccess {String} status status
 * @apiSuccess {String} slug Technology Slug
 * @apiSuccess {String} objectID Technology ObjectID
 * @apiSuccess {Number} likes Technology likes
 * @apiSuccess {Date} created_at Technology Register date
 * @apiSuccess {Date} updated_at Technology Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *   {
 *     "id": 6,
 *     "title": "Updated Test Title",
 *     "slug": "updated-test-title",
 *     "description": "Updated Test description",
 *     "private": 1,
 *     "thumbnail_id": null,
 *     "likes": null,
 *     "intellectual_property": 1,
 *     "patent": 1,
 *     "patent_number": "0001/2020",
 *     "primary_purpose": "Test primary purpose",
 *     "secondary_purpose": "Tests in apidoc",
 *     "application_mode": "Test application mode",
 *     "application_examples": "Test application example",
 *     "installation_time": 365,
 *     "solves_problem": "Solves problem test",
 *     "entailes_problem": "Entailes problem test",
 *     "requirements": "Requirements test",
 *     "risks": "Test risks",
 *     "contribution": "Test contribution",
 *     "status": "DRAFT",
 *     "created_at": "2020-08-05 19:06:40",
 *     "updated_at": "2020-08-06 18:30:37",
 *     "objectID": "technology-6"
 *   }
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.get('technologies/:id', 'TechnologyController.show').middleware(['handleParams']);
/**
 * @api {get} /technologies/:id/terms Gets Technology Terms
 * @apiGroup Technologies
 * @apiParam (Route Param){Number} id Mandatory Technology ID.
 * @apiParam (Query Param){Number|String} [taxonomy] Optional Taxonomy Param.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 *	/technologies/6/terms
 * @apiSuccess {Object[]} terms Term Collection
 * @apiSuccess {Number} terms.id Term ID.
 * @apiSuccess {String} terms.term Term.
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Number} terms.taxonomy_id Term Taxonomy ID
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  [
 *   {
 *     "id": 105,
 *     "term": "Buffalo",
 *     "slug": "buffalo",
 *     "parent_id": null,
 *     "taxonomy_id": 2,
 *     "created_at": "2020-07-28 18:40:47",
 *     "updated_at": "2020-07-28 18:40:48"
 *   },
 *   {
 *     "id": 106,
 *     "term": "Meerkat",
 *     "slug": "meerkat",
 *     "parent_id": null,
 *     "taxonomy_id": 2,
 *     "created_at": "2020-07-28 18:40:47",
 *     "updated_at": "2020-07-28 18:40:48"
 *   }
 * ]
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Taxonomy was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Taxonomy was not found"
 * 			}
 *		}
 */
Route.get('technologies/:id/terms', 'TechnologyController.showTechnologyTerms').middleware([
	'handleParams',
]);
/**
 * @api {get} /technologies/:id/users Gets Technology Users
 * @apiGroup Technologies
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param){Number} id Mandatory Technology ID.
 * @apiParam (Query Param){String} [role] Optional Role Param.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 *	/technologies/1/users
 * @apiSuccess {Object[]} users User Collection
 * @apiSuccess {Number} users.id User ID
 * @apiSuccess {String} users.email User Email
 * @apiSuccess {String} users.status User Status
 * @apiSuccess {String} users.first_name User First Name
 * @apiSuccess {String} users.last_name User Last Name
 * @apiSuccess {String} users.full_name User Full Name
 * @apiSuccess {String} users.secondary_email User Secondary Email
 * @apiSuccess {String} users.company User Company
 * @apiSuccess {String} users.zipcode User ZipCode
 * @apiSuccess {String} users.cpf User CPF
 * @apiSuccess {String} users.birth_date User Birth date
 * @apiSuccess {String} users.phone_number User Phone Number
 * @apiSuccess {String} users.lattes_id User Lattes Id
 * @apiSuccess {String} users.address User Address
 * @apiSuccess {String} users.address2 User Address2
 * @apiSuccess {String} users.district User District
 * @apiSuccess {String} users.city User City
 * @apiSuccess {String} users.state User State
 * @apiSuccess {String} users.country User Country
 * @apiSuccess {Number} users.role_id User Role ID
 * @apiSuccess {Date} users.created_at User Register date
 * @apiSuccess {Date} users.updated_at User Update date
 * @apiSuccess {Object} users.pivot User Technology Relashionship
 * @apiSuccess {Number} users.pivot.user_id User ID
 * @apiSuccess {Number} users.pivot.technology_id Technology ID
 * @apiSuccess {String} users.pivot.role Technology User Role
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  [
 * 		{
 * 			"id": 12,
 * 			"email": "sabiatestinge2e@gmail.com",
 * 			"status": "verified",
 * 			"first_name": "FirstName",
 * 			"last_name": "LastName",
 * 			"company": null,
 * 			"zipcode": null,
 * 			"cpf": null,
 * 			"birth_date": null,
 * 			"phone_number": null,
 * 			"lattes_id": null,
 * 			"address": null,
 * 			"address2": null,
 * 			"district": null,
 * 			"city": null,
 * 			"state": null,
 * 			"country": null,
 * 			"role_id": 1,
 * 			"created_at": "2020-08-06 20:41:55",
 * 			"updated_at": "2020-08-06 20:41:55",
 * 			"full_name": "FirstName LastName",
 * 			"pivot": {
 * 			  "user_id": 12,
 * 			  "technology_id": 1,
 * 			  "role": "OWNER"
 * 			}
 * 		}
 * 	]
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.get('technologies/:id/users', 'TechnologyController.showTechnologyUsers').middleware([
	'auth',
	'handleParams',
]);
/**
 * @api {get} /technologies/:id/reviews Gets Technology Reviews
 * @apiGroup Technologies
 * @apiParam (Route Param){Number} id Mandatory Technology ID.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 *	/technologies/3/reviews
 * @apiSuccess {Object[]} reviews Review Collection
 * @apiSuccess {Number} reviews.id Review ID
 * @apiSuccess {Number} reviews.user_id User ID Review
 * @apiSuccess {Number} reviews.technology_id Technology ID Review
 * @apiSuccess {String} reviews.content Content Review
 * @apiSuccess {Number{1-5}} reviews.rating Rating Review
 * @apiSuccess {String[]} reviews.positive Positives Review
 * @apiSuccess {String[]} reviews.negative Negatives Review
 * @apiSuccess {Date} reviews.created_at Review Register date
 * @apiSuccess {Date} reviews.updated_at Review Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  [
 *   {
 *     "id": 6,
 *     "user_id": 12,
 *     "technology_id": 3,
 *     "content": "Ulma erogu ekrisol mopagob jogodci luetoadi ci pucoja avupimro nirdus ra uwe. Jaf selnejor be ziple ihziujo etoju al tajas kawdu icso betehkiw ucetowig duzfios vulmi noofeni anjendo kaef. Buhlerwip pomucke avgepeb mon it huwnapi biceggu sefvisic limbapame widcidal jigoil oz norfuv owsumi muodozi si izu.",
 *     "rating": 2,
 *     "positive": [
 *       "Erlupuhi hodaba caljuwsu guj efinaz owpot ja kazec uwu nogab zuvejgog uw cezeze ap siwejo.",
 *       "Ba fufuc waswu sa li bupofedur ojpodde fivi memuweza poutucej wot wa arini lilbo radbif ingo."
 *     ],
 *     "negative": [
 *       "Ikogok mazog colaw puhoko ribeze tusibo ozo fobrutoha fof az wedo mivwi ok.",
 *       "Guw iphiat da cuvat ikesof kod nojotnut mukifo zipek sev gegutvoj domluwzuw lo ajo dijumez."
 *     ],
 *     "created_at": "2020-08-06 20:42:55",
 *     "updated_at": "2020-08-06 20:42:56"
 *   },
 *   {
 *     "id": 8,
 *     "user_id": 13,
 *     "technology_id": 3,
 *     "content": "Lu ikjafzi pejhufaz fem je danirivi top ruldetha ziwupiru tuweropo dov fi. Opo gekkasaj tekinos olelozron agofigi so zo lepwiv deczih bibrukmoj ciktunog ikasetwij. Tihit cajobop bod guhetmig ci cealo vion campok oj rif taduvpog otu ra jaerafi. Gogvica kalgeamu podfa iwsebmi sonuhkum fu mevinzan gentum raogadev kajfus davir niah regaav du kalto maah. Zagosiv pohu sa jucekub cofuha fevun pa huvuva fo zun ciguv huvet ejopimzor.",
 *     "rating": 3,
 *     "positive": [
 *       "Uskibbuw im icowiz ude kazaf mugek kogisur wuhojuk ohohun afmagto ah ir bafoni ebo bifaviz ojuwefpu vobamer uhaczu.",
 *       "Ali ha inzuot red zuojeiso ekmofim haaso butzuzi losema dikebu gobnownem ted hac anesikweg epzovwaw."
 *     ],
 *     "negative": [
 *       "Feej ujje cuvarbe vanurfoj wugbudto bugowo temeduzij hazfa ta bigfehrov zuhom agku ezekav sic sah ovovoz.",
 *       "Veulu nogudhek mabvuc biop oleiwulu nobudju vonwi kojuwmik futmaoze rej hapvu gabo kuj ved veb."
 *     ],
 *     "created_at": "2020-08-06 20:42:55",
 *     "updated_at": "2020-08-06 20:42:55"
 *   }
 * ]
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.get('technologies/:id/reviews', 'TechnologyController.showTechnologyReviews').middleware([
	'handleParams',
]);
