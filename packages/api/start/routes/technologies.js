/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const {
	getMiddlewarePermissions,
	getMiddlewareRoles,
	permissions,
	roles,
} = require('../../app/Utils/roles_capabilities');

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
 *   "status": "pending",
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
 *   	"status": "pending",
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
 *     "status": "pending",
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
 *     "status": "pending",
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
 *     "status": "pending",
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
 *     "status": "pending",
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
Route.get('technologies/:id', 'TechnologyController.show').middleware([
	'handleParams',
	'published',
]);
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
	'published',
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
	'published',
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
	'published',
]);
/**
 * @api {put} /technologies/:id/update-status Updates Technology Status
 * @apiGroup Technologies
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {String="draft","pending","in_review","requested_changes","changes_made","approved","rejected","published"} status Technology Status
 * @apiParamExample  {json} Request sample:
 *	{
 *		"status":"rejected"
 *	}
 * @apiSuccess {Number} id Technology ID.
 * @apiSuccess {String} title Technology Title.
 * @apiSuccess {String} description Technology Description
 * @apiSuccess {Boolean} private Private Param
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
 * @apiSuccess {String} status Technology Status
 * @apiSuccess {String} slug Technology Slug
 * @apiSuccess {String} objectID Technology ObjectID
 * @apiSuccess {Number} likes Technology likes
 * @apiSuccess {Date} created_at Technology Register date
 * @apiSuccess {Date} updated_at Technology Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 1,
 *	 "title": "Pujceitu as itrejig.",
 *	 "slug": "pujceitu-as-itrejig",
 *	 "description": "Rimun urfobna teb gur muwo nel bivbejar zad otesa gapsehlup pitim weep izu ruhsena izavifhu. Fu ok di jamufvi fuk paigo ve pe basbo olunu saup izgok cugro zemimaded befmeive pagwesog. Zotoko tacfiodi gobzubaz en cobfe ab tubupe cogvef zem sa avegojica fib dujibaw hatigdo ge bar zozkiz. Simibpiw owuhawzol pekmiw negaze fubeg kejuwu ol olguok la relged egu bofu ij.",
 *	 "private": 1,
 *	 "thumbnail_id": null,
 *	 "likes": 1,
 *	 "patent": 1,
 *	 "patent_number": "Jg0mQShE",
 *	 "primary_purpose": "Ucowib zazoj merad akfi zor gin ribpiz cevorgu ko zujda vadhes mud ugejuaga zoufva veveta temos haziw. Gumajke gej juacha nizab konsoznuj vel venpavte bujus apgap se huzune nibiv eca nido. Fum copahja icaficek cungiber us ci ziplam bi amo wule jobbegij poohka guwpulzic kuzrov fekwi. Ren bekla zotreap sa kajihfoj kujo mu ti ram ovpir nonruat asogundek numfa rita go co bac.",
 *	 "secondary_purpose": "Oszikvu sazhi tubasnac gudaga enecokop nusursa at vikuuzu va fenat vevo zezeas. Fogti eczo cobworwe sovhidog pip zeipfu bon ifnuza segeubi migega konjef ulab. Ekti uwohenu pem ci ralsapza pipi losbojis bawwijog rahibjib ecvuc reohiaf hezuswen. Ce poopo rezet amses ve urobe pifeh jause nojlodo ruos gig obedem cu mefdeho cazolih me muneg. Ba cevnogaj ifelos vedbisu ledakufec juzlidi we huntirpiv ucu hijvibge ukedo jej ceg huc minateka va. Ihanageh wohajner koh gawmez wutij ubge larlef puzke ibmiraz dohoni kavzawe pi esegak id sodar oluwagil cem hebok. Now zinagtu huwet inuninisu ijawusre zouz pekaf oksignu ot surkihmad pogwuc wejoj gahfumvak nuah.",
 *	 "application_mode": "Et govba ce vurun jepewe zol tobu carih ul dog hodva uwaugieje ijtu mo ecufu fivno obuw. Uc tiwi ikule hiv eh kahu izipe wutiv fuvi vijhool ugpawuk tamuv jijsew agocakjad. Muzok waw imocifiwa siet lilcucco sefadca zuzfimro egoutu zan eluviam anane motzekuf waun wi wublomwa zunhag tok. Ha tacoz siv pemkioj diama dogupiko ose pokakoc gabwajeh nu cib vadik ep luw pawki.",
 *	 "application_examples": "Hiz hus up ze rak upa dioh fuvcohi vop tabi behos ezelapo. Dawolze tacahgof buso boiwful cuvaz li voklaguk ki daz zekzivoc nonsalhe go hahbombik tozgomfo igowas red. Te lon ditezi luco vapukir vowoge anelunvi cinarow fiptu parro eh tem. Gih ewujabjiz tucruv joflor rudo iceigku na urubor decjam ve fup fid ule sosgas lud gisikuz oze ijgeh. Hubet de liwip lug vajza me ugeje fuire hofpa iwahennus rekboje ic rogpitif. Oteluj towum deudonu mute ke sula tam ebiba nobto oc getuluh reulasaz mabto fiboope hu gahpob foddoz. Mikla sacepdav ag bu ugeval vivi usedik mowuh obezekab jebir mewofu joih fofdam wih pow om so.",
 *	 "installation_time": 110,
 *	 "solves_problem": "De kokujve le koblutbo ubako ohdu bapzehhum ento jek baropaz cigditu pakip fad mer caw hokif nek. Oj to fakvoiga go vufagepi bujrifaz wi kahi sezolod palemmiv ko rokfik sitkaah pigo zena ur fab goip. Wircadna sunren sar vuze wizrilej tud diowitij jalucga luv inumu tileb dafjok wud. Fan cehcemas uru ru je ah ilortug zor log ehi kadir tocosdow behiodu lo lehe nel. Coliv nekrel he lila omof revteh ega bewmohkik hozowetuz mibjige bo wuzos ih. Kuscog ato hec un ne feopeha jedwo gazkiwne kiv ru zanfa ifmemor tuwobda.",
 *	 "entailes_problem": "Hakafpof fibubna sinrojeh ci puh guotaovi peb teki nusag onhizira ha mu mi odiere no inu vif. Ep lujnet fi umi riudi wi icce hepo ifa muvri zouz dadoc zaham cedhu fimukow. Ebojurvi jioge sachinpu cusun mu oz nejpodige it va ted urnikoc in danvuli cejne. Cezi tu giugi li rulid revfifva rebsava cumo uju masruta jeden nepirnek wecajo eborut caso ebihiog wu vene.",
 *	 "requirements": "Foh kunfustih zod lovgawhi di wimemijih so mizezur gabdaru ce uzwinot ebjus nif ekuzajgoz sutnunnob cazid. Kebbim wivijib pudmejha led aharid pubit andam kaluboes osomev vubo la ve ziec. La eh jahevu fom wu web nekid oko vejake pobo duhur gehfi. Pummuje kowekaz docsus ivbek rekpu cu dopfe mucvuwif wodutof sugejapi rec kujtaclav kerkijme vuj avna kufor. Evu ugaofoca nowud babcem zenowoc go bumuhku jorujfi jonoro wer ino von. Pav ninjoba an fupoki er laralru gew ed gudves geuwido erlor zemakim.",
 *	 "risks": "Rutluh piul ekhu jij fi udfo foifi puzu ogzo jafive jejfi kot juwgotec. Ozlogi etvej behib pudgowi tokonza evfe pegan lokamha fehloji jeosu gibniv zapolos bov rapuwcu od nihen. Kit ude ve keow fow sufo zidi hoowahij wijaog hadorsob penac mo. Ode bor igesep gafov fipzat vunohzi wema jolge fege pi kurvo pifmid kogemu namih duagu ruk ilidego ihaiv.",
 *	 "contribution": "Dumzi he le wovgo ni vaziki mopsolwef segzokki gocoode nufin vicwerdic ve kuna lop fe. Lo kickohir ko ivvosi fazo zujmi vecvacod be lesa cil idireg zecano wizavo cor uznuki kof kadgon fado. Po kuj hod hupizeh udtimres tulgo ocozeh amiviw idtow us osu cinaek.",
 *	 "status": "rejected",
 *	 "created_at": "2020-08-19 20:57:39",
 *	 "updated_at": "2020-08-31 20:18:23",
 *	 "objectID": "technology-1"
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
 *       				"message": "The status should fall within defined values of (pending,rejected,published).",
 *       				"field": "status",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.put('technologies/:id/update-status', 'TechnologyController.updateTechnologyStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdateTechnologyStatus');
/**
 * @api {put} /technologies/:id/finalize-registration Finalizes Technology Registration and send to revision
 * @apiGroup Technologies
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {String} [comment] Optional comment for send to reviewer
 * @apiParamExample  {json} Request sample:
 *	/technologies/1/finalize-registration
 * @apiSuccess {Number} id Technology ID.
 * @apiSuccess {String} title Technology Title.
 * @apiSuccess {String} description Technology Description
 * @apiSuccess {Boolean} private Private Param
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
 * @apiSuccess {String} status Technology Status
 * @apiSuccess {String} slug Technology Slug
 * @apiSuccess {String} objectID Technology ObjectID
 * @apiSuccess {Number} likes Technology likes
 * @apiSuccess {Date} created_at Technology Register date
 * @apiSuccess {Date} updated_at Technology Update date
 * @apiSuccess {Object[]} comments Comments Collection
 * @apiSuccess {Number} comments.id Comment ID
 * @apiSuccess {Number} comments.user_id User ID
 * @apiSuccess {Number} comments.technology_id Technology ID
 * @apiSuccess {String} comments.comment Comment
 * @apiSuccess {Date} comments.created_at Comment Register date
 * @apiSuccess {Date} comments.updated_at Comment Update date
 * @apiSuccess {Object} comments.user User comment owner
 * @apiSuccess {Number} comments.user.id User ID
 * @apiSuccess {String} comments.user.email User Email
 * @apiSuccess {String} comments.user.status User Status
 * @apiSuccess {String} comments.user.first_name User First Name
 * @apiSuccess {String} comments.user.last_name User Last Name
 * @apiSuccess {String} comments.user.full_name User Full Name
 * @apiSuccess {String} comments.user.secondary_email User Secondary Email
 * @apiSuccess {String} comments.user.company User Company
 * @apiSuccess {String} comments.user.zipcode User ZipCode
 * @apiSuccess {String} comments.user.cpf User CPF
 * @apiSuccess {String} comments.user.birth_date User Birth date
 * @apiSuccess {String} comments.user.phone_number User Phone Number
 * @apiSuccess {String} comments.user.lattes_id User Lattes Id
 * @apiSuccess {String} comments.user.address User Address
 * @apiSuccess {String} comments.user.address2 User Address2
 * @apiSuccess {String} comments.user.district User District
 * @apiSuccess {String} comments.user.city User City
 * @apiSuccess {String} comments.user.state User State
 * @apiSuccess {String} comments.user.country User Country
 * @apiSuccess {Number} comments.user.role_id User Role ID
 * @apiSuccess {Date} comments.user.created_at User Register date
 * @apiSuccess {Date} comments.user.updated_at User Update date
 * @apiSuccess {Boolean} comments.user.registration_completed Registration Completed Flag
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 2,
 *	 "title": "Tonih jivutat tos.",
 *	 "slug": "tonih-jivutat-tos",
 *	 "description": "Hu rut ujwig daehe gebablu es ic edipru fowcemib hufindos muvo hup. Wi zaoka eli kor mabbeovu uf azugojiv os zujip cagzi wijcuh mod camce ricbuhim faj go puhneug ubowavwi. Mod colbopco rolif okjur zipec pi wimu ota mok cac ofjeir dibkegho cudolzag.",
 *	 "private": 1,
 *	 "thumbnail_id": null,
 *	 "likes": 2,
 *	 "patent": 0,
 *	 "patent_number": "IiBjBSSC",
 *	 "primary_purpose": "Ci ta lizuga vihzulocu gurufedad muvcot mi satermo ufucep satmev lug zeb ez li ikfobuwu. De azo telkim torawi pigro saome ketvuw zi pouw gacjupa mafdun pagregaw jalve kog gic. Hu viwuhcub demacelil pi nu weroh mesijce me pa abotewud kub welvelvit bono okubaj. Ewute ona ril ofo jopowa nupouno zugbeuk dif wihtikor vaw fureg wis ziiduip pi mi wom vo nis. Ke hoejlu toc riv sepfog adraz duwoso silag kicufa mimawa he wakere pian gop ifkud epri rarkutun.",
 *	 "secondary_purpose": "Uvtobofi mipner jallu zulet big let bepoz uh uh irvep roufge nij. Hadke tuksav wunelo pu ofifi mec ob tud cizkelvog su rocenhu mak osose lubutrab gihorhu. Pevo zaije pa olujum enenasvir su kop ol ugebo nelum ca ice ujo. Tefatowa wapuite jekibi ocama ritotji ce pe kafpu gu tawe soetnu leg. Ati egkigu joegow losaras na hicuzpom ke huju velsubek azja lupabjot sorofu zem huigsu ebecef ja sol oci.",
 *	 "application_mode": "Gel ep fejaw togidde ga mulivuuh buj ihi isgozus rasokdug za pokejrud covur der. Omul utu sehor umrotuv wohulwo uwoarga rov no kaafi zuvbofeto ageop banidcu. Pa lograha pivfa mu rupcoka lona ogpi ewiku oluke gu izovumgi vew vohap vupi bu ad. Olu izkimruz vuzindu zamho fupgudaja ti ki celikfol lu liserkeh ziwvaawa bib fusun gafwec wo cum solted ijikiw. Ujahilbo acu odku holle idaaca favtajhu wopwimu vina kuawice gewu avize zewzasti ogsebid jonas egonori. Wep zahsaj doeno wuoku hego mejon katba edji jag ejego fizubol mizes. Nic umsu hif nu piwvo ge rumkohgow poczezu jarigi mefsuw sap uzebhiv tisojho ira muj fi.",
 *	 "application_examples": "Gosbodot sutavde pibenlu vezegukuj sasgod dulse mizta ze ak eflobep fe zerretava wuzugpi viwovo femen emo nuwute. Pofa virac na lazci orhu werrahtu joajzum awzalriz awa zih kijcughi pigvikit. Ihobahsat fohzud kiguk nipom ti bazleto wocida hoffur tekfe ricenem kamieh vavrohka covacazov. Coeraivi unnoc savegut agi vozogvo fowi fuhgo jijas dul ducpijni dicimas va urura su.",
 *	 "installation_time": 723,
 *	 "solves_problem": "Fezib iw vaewi otudeesu maovolu gujub ugul cakaberec det jatmaco pu ew fotcup husgoh ivkowun so. Pu udice aphu ko eg cug jim zilosraz loj waha od ho ne na is. Vos lulves jugeton tutzewap lezucbof tojuvret avo lijebpat dekiow fuhtoz to taun ovha. Mire av cu go hagos toco jun tez vojo lonro ji ba cusdil modpar rulek tutirofu lewliv keroep. Gag ciwu junnicar dognanoj geanoki ko meduzigi afjo bagaze re uviparu gilatwo zocosusa gise nokpuztap avcizu.",
 *	 "entailes_problem": "Acewu nedeh porup mizko fudohha segemen wu apaafe fa efu ifowa masmezub etop. Ob of gakvoj foluru lamocave zotwuogu ene guerudu omcuf jam dasgu ihobakot egelu si muk. Sipsos bewuntuj vuvwoguz ehofo zihep ile ra leekeci vehbegnas teemo tugav ke pobu pupwe obiachun padkukbod fu ha. Teb lake danozi at issu domno sepumhi salmov cup arowi owe uw apalihar wu fo. Das kehmipap ad ronmufce zereco da navaif orlezip lalme ositibide nib pivuwja suej vaem ano disoclek. Vopali guejaowa no cavjanej gapibo rebmi kadjid bidwezwa vep pozanaso wuh feojcez guhjec ihzog edovosuj wub nigioce buhnocas.",
 *	 "requirements": "Go seg tekite alzof herlev pul copo azu seahbem od puatizi cat mim panijic dic cebere urejun. Ho benup pu cibfub ari cu olu bomtuh utzevla tasalgi nuz ced vike vute. Pe zis suwe kut avpu vu vacovu gefudiga uzeivuav ot bag sicsaica enaru towkemro gom naris. Ewiwehrur at uri badgud ede bifde zammoz ni daisauw mor pi ewdetdut. Hibifu du el ta nojka ikozodwob as ufefep weki ken koci opowina efop isfaoh miwavvu wufo owwiv.",
 *	 "risks": "Pu duffizop sufrajle hat cuemezit vukimahi os uho cajecbe relrihe faw cu gipro. Komra te naz bucahaha guhli esanuto na bokwetvi tokuvu tueli buzzo piwoj nohiha ho ceujjo rirsiwfob sudrudzaj. Dem uvepaeh vigi zak eptudmaw atfi ebe ohoga lobugmek ecewufe penzoza gile suta uvozarru puzzufka. Dajso nut zuforu mipag zebpos jicmebgo safcuhker famwol pejzo oziti avonociw ebsijraw. Febu zomraklob le lifipsis penam tiduci kik hi ku nejkiwzu acibafe bivin ve zum cezvuvic. Ge ubinaalu homjenwam dozjo haloga orawowbo ov okomon gijgepej voffi bemejelef enle.",
 *	 "contribution": "Vesbeena caen mo zo dangit kipac mo nivum kuw worumuwi pa vamitcic opo poset bosgis uduhi rovzo. Irgekoni gutoj amoocaen pipoj ov merulad rusuci ko damik meme joko sutluezo sa firumlog na. Jedwu jag binip filcokoc ih ipruvdov nakti ocjuh ofijeewi favol dewhocki aphew. Ujwa tonipoir kefniini ral sula buh bil cezsudnug kivanih ur zibzoraw ibtikze hew bo. Ta bokhed sipowad gojnem kunhib zujde cu ij ibead zivipgo igmasiz as ciwi wak mid voke va rakwef. Aropiseh riwvohga uroze adogoda jof val gefihage ructeeme ceesi fotogcod of juma uribilse di teluene kuz. Zopuplis lijze opolib epnogep ra kesusa kidibjus wa dus wo wozo gebsofato algasif gulu isa vulavab.",
 *	 "status": "pending",
 *	 "created_at": "2020-10-13 18:20:53",
 *	 "updated_at": "2020-10-21 18:43:58",
 *	 "intellectual_property": 0,
 *	 "objectID": "technology-2",
 *	 "comments": [
 *	   {
 *	     "id": 1,
 *	     "user_id": 14,
 *	     "technology_id": 2,
 *	     "comment": "test comment",
 *	     "created_at": "2020-10-21 18:43:58",
 *	     "updated_at": "2020-10-21 18:43:58",
 *	     "user": {
 *	       "id": 14,
 *	       "email": "sabiatestingadmin@gmail.com",
 *	       "status": "verified",
 *	       "first_name": "AdminName",
 *	       "last_name": "AdminLastName",
 *	       "company": null,
 *	       "zipcode": null,
 *	       "cpf": null,
 *	       "birth_date": null,
 *	       "phone_number": null,
 *	       "lattes_id": null,
 *	       "address": null,
 *	       "address2": null,
 *	       "district": null,
 *	       "city": null,
 *	       "state": null,
 *	       "country": null,
 *	       "role_id": 5,
 *	       "created_at": "2020-10-13 18:20:47",
 *	       "updated_at": "2020-10-13 18:20:47",
 *	       "full_name": "AdminName AdminLastName",
 *	       "registration_completed": false
 *	     }
 *	   },
 *	   {
 *	     "id": 2,
 *	     "user_id": 14,
 *	     "technology_id": 2,
 *	     "comment": "test comment",
 *	     "created_at": "2020-10-21 18:45:33",
 *	     "updated_at": "2020-10-21 18:45:33",
 *	     "user": {
 *	       "id": 14,
 *	       "email": "sabiatestingadmin@gmail.com",
 *	       "status": "verified",
 *	       "first_name": "AdminName",
 *	       "last_name": "AdminLastName",
 *	       "company": null,
 *	       "zipcode": null,
 *	       "cpf": null,
 *	       "birth_date": null,
 *	       "phone_number": null,
 *	       "lattes_id": null,
 *	       "address": null,
 *	       "address2": null,
 *	       "district": null,
 *	       "city": null,
 *	       "state": null,
 *	       "country": null,
 *	       "role_id": 5,
 *	       "created_at": "2020-10-13 18:20:47",
 *	       "updated_at": "2020-10-13 18:20:47",
 *	       "full_name": "AdminName AdminLastName",
 *	       "registration_completed": false
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.put(
	'technologies/:id/finalize-registration',
	'TechnologyController.finalizeRegistration',
).middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
/**
 * @api {put} /technologies/:id/revision Sends Technology to Revision after requested changes was maded
 * @apiGroup Technologies
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {String} [comment] Optional comment for send to reviewer
 * @apiParamExample  {json} Request sample:
 *	/technologies/2/revision
 * @apiSuccess {Number} id Technology ID.
 * @apiSuccess {String} title Technology Title.
 * @apiSuccess {String} description Technology Description
 * @apiSuccess {Boolean} private Private Param
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
 * @apiSuccess {String} status Technology Status
 * @apiSuccess {String} slug Technology Slug
 * @apiSuccess {String} objectID Technology ObjectID
 * @apiSuccess {Number} likes Technology likes
 * @apiSuccess {Date} created_at Technology Register date
 * @apiSuccess {Date} updated_at Technology Update date
 * @apiSuccess {Object[]} comments Comments Collection
 * @apiSuccess {Number} comments.id Comment ID
 * @apiSuccess {Number} comments.user_id User ID
 * @apiSuccess {Number} comments.technology_id Technology ID
 * @apiSuccess {String} comments.comment Comment
 * @apiSuccess {Date} comments.created_at Comment Register date
 * @apiSuccess {Date} comments.updated_at Comment Update date
 * @apiSuccess {Object} comments.user User comment owner
 * @apiSuccess {Number} comments.user.id User ID
 * @apiSuccess {String} comments.user.email User Email
 * @apiSuccess {String} comments.user.status User Status
 * @apiSuccess {String} comments.user.first_name User First Name
 * @apiSuccess {String} comments.user.last_name User Last Name
 * @apiSuccess {String} comments.user.full_name User Full Name
 * @apiSuccess {String} comments.user.secondary_email User Secondary Email
 * @apiSuccess {String} comments.user.company User Company
 * @apiSuccess {String} comments.user.zipcode User ZipCode
 * @apiSuccess {String} comments.user.cpf User CPF
 * @apiSuccess {String} comments.user.birth_date User Birth date
 * @apiSuccess {String} comments.user.phone_number User Phone Number
 * @apiSuccess {String} comments.user.lattes_id User Lattes Id
 * @apiSuccess {String} comments.user.address User Address
 * @apiSuccess {String} comments.user.address2 User Address2
 * @apiSuccess {String} comments.user.district User District
 * @apiSuccess {String} comments.user.city User City
 * @apiSuccess {String} comments.user.state User State
 * @apiSuccess {String} comments.user.country User Country
 * @apiSuccess {Number} comments.user.role_id User Role ID
 * @apiSuccess {Date} comments.user.created_at User Register date
 * @apiSuccess {Date} comments.user.updated_at User Update date
 * @apiSuccess {Boolean} comments.user.registration_completed Registration Completed Flag
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 2,
 *	 "title": "Tonih jivutat tos.",
 *	 "slug": "tonih-jivutat-tos",
 *	 "description": "Hu rut ujwig daehe gebablu es ic edipru fowcemib hufindos muvo hup. Wi zaoka eli kor mabbeovu uf azugojiv os zujip cagzi wijcuh mod camce ricbuhim faj go puhneug ubowavwi. Mod colbopco rolif okjur zipec pi wimu ota mok cac ofjeir dibkegho cudolzag.",
 *	 "private": 1,
 *	 "thumbnail_id": null,
 *	 "likes": 2,
 *	 "patent": 0,
 *	 "patent_number": "IiBjBSSC",
 *	 "primary_purpose": "Ci ta lizuga vihzulocu gurufedad muvcot mi satermo ufucep satmev lug zeb ez li ikfobuwu. De azo telkim torawi pigro saome ketvuw zi pouw gacjupa mafdun pagregaw jalve kog gic. Hu viwuhcub demacelil pi nu weroh mesijce me pa abotewud kub welvelvit bono okubaj. Ewute ona ril ofo jopowa nupouno zugbeuk dif wihtikor vaw fureg wis ziiduip pi mi wom vo nis. Ke hoejlu toc riv sepfog adraz duwoso silag kicufa mimawa he wakere pian gop ifkud epri rarkutun.",
 *	 "secondary_purpose": "Uvtobofi mipner jallu zulet big let bepoz uh uh irvep roufge nij. Hadke tuksav wunelo pu ofifi mec ob tud cizkelvog su rocenhu mak osose lubutrab gihorhu. Pevo zaije pa olujum enenasvir su kop ol ugebo nelum ca ice ujo. Tefatowa wapuite jekibi ocama ritotji ce pe kafpu gu tawe soetnu leg. Ati egkigu joegow losaras na hicuzpom ke huju velsubek azja lupabjot sorofu zem huigsu ebecef ja sol oci.",
 *	 "application_mode": "Gel ep fejaw togidde ga mulivuuh buj ihi isgozus rasokdug za pokejrud covur der. Omul utu sehor umrotuv wohulwo uwoarga rov no kaafi zuvbofeto ageop banidcu. Pa lograha pivfa mu rupcoka lona ogpi ewiku oluke gu izovumgi vew vohap vupi bu ad. Olu izkimruz vuzindu zamho fupgudaja ti ki celikfol lu liserkeh ziwvaawa bib fusun gafwec wo cum solted ijikiw. Ujahilbo acu odku holle idaaca favtajhu wopwimu vina kuawice gewu avize zewzasti ogsebid jonas egonori. Wep zahsaj doeno wuoku hego mejon katba edji jag ejego fizubol mizes. Nic umsu hif nu piwvo ge rumkohgow poczezu jarigi mefsuw sap uzebhiv tisojho ira muj fi.",
 *	 "application_examples": "Gosbodot sutavde pibenlu vezegukuj sasgod dulse mizta ze ak eflobep fe zerretava wuzugpi viwovo femen emo nuwute. Pofa virac na lazci orhu werrahtu joajzum awzalriz awa zih kijcughi pigvikit. Ihobahsat fohzud kiguk nipom ti bazleto wocida hoffur tekfe ricenem kamieh vavrohka covacazov. Coeraivi unnoc savegut agi vozogvo fowi fuhgo jijas dul ducpijni dicimas va urura su.",
 *	 "installation_time": 723,
 *	 "solves_problem": "Fezib iw vaewi otudeesu maovolu gujub ugul cakaberec det jatmaco pu ew fotcup husgoh ivkowun so. Pu udice aphu ko eg cug jim zilosraz loj waha od ho ne na is. Vos lulves jugeton tutzewap lezucbof tojuvret avo lijebpat dekiow fuhtoz to taun ovha. Mire av cu go hagos toco jun tez vojo lonro ji ba cusdil modpar rulek tutirofu lewliv keroep. Gag ciwu junnicar dognanoj geanoki ko meduzigi afjo bagaze re uviparu gilatwo zocosusa gise nokpuztap avcizu.",
 *	 "entailes_problem": "Acewu nedeh porup mizko fudohha segemen wu apaafe fa efu ifowa masmezub etop. Ob of gakvoj foluru lamocave zotwuogu ene guerudu omcuf jam dasgu ihobakot egelu si muk. Sipsos bewuntuj vuvwoguz ehofo zihep ile ra leekeci vehbegnas teemo tugav ke pobu pupwe obiachun padkukbod fu ha. Teb lake danozi at issu domno sepumhi salmov cup arowi owe uw apalihar wu fo. Das kehmipap ad ronmufce zereco da navaif orlezip lalme ositibide nib pivuwja suej vaem ano disoclek. Vopali guejaowa no cavjanej gapibo rebmi kadjid bidwezwa vep pozanaso wuh feojcez guhjec ihzog edovosuj wub nigioce buhnocas.",
 *	 "requirements": "Go seg tekite alzof herlev pul copo azu seahbem od puatizi cat mim panijic dic cebere urejun. Ho benup pu cibfub ari cu olu bomtuh utzevla tasalgi nuz ced vike vute. Pe zis suwe kut avpu vu vacovu gefudiga uzeivuav ot bag sicsaica enaru towkemro gom naris. Ewiwehrur at uri badgud ede bifde zammoz ni daisauw mor pi ewdetdut. Hibifu du el ta nojka ikozodwob as ufefep weki ken koci opowina efop isfaoh miwavvu wufo owwiv.",
 *	 "risks": "Pu duffizop sufrajle hat cuemezit vukimahi os uho cajecbe relrihe faw cu gipro. Komra te naz bucahaha guhli esanuto na bokwetvi tokuvu tueli buzzo piwoj nohiha ho ceujjo rirsiwfob sudrudzaj. Dem uvepaeh vigi zak eptudmaw atfi ebe ohoga lobugmek ecewufe penzoza gile suta uvozarru puzzufka. Dajso nut zuforu mipag zebpos jicmebgo safcuhker famwol pejzo oziti avonociw ebsijraw. Febu zomraklob le lifipsis penam tiduci kik hi ku nejkiwzu acibafe bivin ve zum cezvuvic. Ge ubinaalu homjenwam dozjo haloga orawowbo ov okomon gijgepej voffi bemejelef enle.",
 *	 "contribution": "Vesbeena caen mo zo dangit kipac mo nivum kuw worumuwi pa vamitcic opo poset bosgis uduhi rovzo. Irgekoni gutoj amoocaen pipoj ov merulad rusuci ko damik meme joko sutluezo sa firumlog na. Jedwu jag binip filcokoc ih ipruvdov nakti ocjuh ofijeewi favol dewhocki aphew. Ujwa tonipoir kefniini ral sula buh bil cezsudnug kivanih ur zibzoraw ibtikze hew bo. Ta bokhed sipowad gojnem kunhib zujde cu ij ibead zivipgo igmasiz as ciwi wak mid voke va rakwef. Aropiseh riwvohga uroze adogoda jof val gefihage ructeeme ceesi fotogcod of juma uribilse di teluene kuz. Zopuplis lijze opolib epnogep ra kesusa kidibjus wa dus wo wozo gebsofato algasif gulu isa vulavab.",
 *	 "status": "changes_made",
 *	 "created_at": "2020-10-13 18:20:53",
 *	 "updated_at": "2020-10-21 18:43:58",
 *	 "intellectual_property": 0,
 *	 "objectID": "technology-2",
 *	 "comments": [
 *	   {
 *	     "id": 1,
 *	     "user_id": 14,
 *	     "technology_id": 2,
 *	     "comment": "test comment",
 *	     "created_at": "2020-10-21 18:43:58",
 *	     "updated_at": "2020-10-21 18:43:58",
 *	     "user": {
 *	       "id": 14,
 *	       "email": "sabiatestingadmin@gmail.com",
 *	       "status": "verified",
 *	       "first_name": "AdminName",
 *	       "last_name": "AdminLastName",
 *	       "company": null,
 *	       "zipcode": null,
 *	       "cpf": null,
 *	       "birth_date": null,
 *	       "phone_number": null,
 *	       "lattes_id": null,
 *	       "address": null,
 *	       "address2": null,
 *	       "district": null,
 *	       "city": null,
 *	       "state": null,
 *	       "country": null,
 *	       "role_id": 5,
 *	       "created_at": "2020-10-13 18:20:47",
 *	       "updated_at": "2020-10-13 18:20:47",
 *	       "full_name": "AdminName AdminLastName",
 *	       "registration_completed": false
 *	     }
 *	   },
 *	   {
 *	     "id": 2,
 *	     "user_id": 14,
 *	     "technology_id": 2,
 *	     "comment": "test comment",
 *	     "created_at": "2020-10-21 18:45:33",
 *	     "updated_at": "2020-10-21 18:45:33",
 *	     "user": {
 *	       "id": 14,
 *	       "email": "sabiatestingadmin@gmail.com",
 *	       "status": "verified",
 *	       "first_name": "AdminName",
 *	       "last_name": "AdminLastName",
 *	       "company": null,
 *	       "zipcode": null,
 *	       "cpf": null,
 *	       "birth_date": null,
 *	       "phone_number": null,
 *	       "lattes_id": null,
 *	       "address": null,
 *	       "address2": null,
 *	       "district": null,
 *	       "city": null,
 *	       "state": null,
 *	       "country": null,
 *	       "role_id": 5,
 *	       "created_at": "2020-10-13 18:20:47",
 *	       "updated_at": "2020-10-13 18:20:47",
 *	       "full_name": "AdminName AdminLastName",
 *	       "registration_completed": false
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.put('technologies/:id/revision', 'TechnologyController.sendToRevision').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
/**
 * @api {get} /technologies/:id/comments Gets Technology Comments
 * @apiGroup Technologies
 * @apiPermission LIST_TECHNOLOGY_COMMENTS or LIST_TECHNOLOGIES_COMMENTS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiSuccess {Object[]} comments Comments Collection
 * @apiSuccess {Number} comments.id Comment ID
 * @apiSuccess {Number} comments.user_id User ID
 * @apiSuccess {Number} comments.technology_id Technology ID
 * @apiSuccess {String} comments.comment Comment
 * @apiSuccess {Date} comments.created_at Comment Register date
 * @apiSuccess {Date} comments.updated_at Comment Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 1,
 *	   "user_id": 14,
 *	   "technology_id": 2,
 *	   "comment": "test comment",
 *	   "created_at": "2020-10-21 18:43:58",
 *	   "updated_at": "2020-10-21 18:43:58"
 *	 },
 *	 {
 *	   "id": 2,
 *	   "user_id": 14,
 *	   "technology_id": 2,
 *	   "comment": "test comment",
 *	   "created_at": "2020-10-21 18:45:33",
 *	   "updated_at": "2020-10-21 18:45:33"
 *	 },
 *	 {
 *	   "id": 3,
 *	   "user_id": 14,
 *	   "technology_id": 2,
 *	   "comment": "test comment",
 *	   "created_at": "2020-10-22 20:04:39",
 *	   "updated_at": "2020-10-22 20:04:39"
 *	 },
 *	 {
 *	   "id": 4,
 *	   "user_id": 14,
 *	   "technology_id": 2,
 *	   "comment": "test comment",
 *	   "created_at": "2020-10-22 20:05:48",
 *	   "updated_at": "2020-10-22 20:05:48"
 *	 },
 *	 {
 *	   "id": 5,
 *	   "user_id": 14,
 *	   "technology_id": 2,
 *	   "comment": "test comment",
 *	   "created_at": "2020-10-22 20:08:53",
 *	   "updated_at": "2020-10-22 20:08:53"
 *	 }
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
Route.get('technologies/:id/comments', 'TechnologyController.showComments').middleware([
	'auth',
	getMiddlewarePermissions([
		permissions.LIST_TECHNOLOGY_COMMENTS,
		permissions.LIST_TECHNOLOGIES_COMMENTS,
	]),
	'handleParams',
]);
/**
 * @api {post} /technologies/:id/orders Makes a technology order
 * @apiGroup Technologies
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {Number} quantity Technology unit quantities
 * @apiParam {String="private","enterprise","local_government","provincial_government","federal_government","other"} use Technology Use
 * @apiParam {String="has_funding","wants_funding","no_need_funding"} funding Technology Funding
 * @apiParam {String} [comment] Optional Comment
 * @apiParamExample  {json} Request sample:
 *	/technologies/2/orders
 * @apiSuccess {Number} id Order ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Number} user_id Buyer User ID.
 * @apiSuccess {Number} quantity Technology units acquired.
 * @apiSuccess {String} use Technology use.
 * @apiSuccess {String} funding Technology funding.
 * @apiSuccess {String} status Order status.
 * @apiSuccess {Date} created_at Order Register date
 * @apiSuccess {Date} updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "quantity": 1,
 *	 "use": "private",
 *	 "funding": "no_need_funding",
 *	 "status": "open",
 *	 "created_at": "2020-10-31 11:35:32",
 *	 "updated_at": "2020-10-31 11:35:32",
 *	 "id": 1,
 *	 "technology_id": 2,
 *	 "user_id": 18
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.post('technologies/:id/orders', 'TechnologyController.createOrder')
	.middleware(['auth', 'registrationCompleted:acquire_technology'])
	.validator('CreateOrder');

Route.get('technologies/:id/orders', 'TechnologyController.indexOrder').middleware([
	'auth',
	'handleParams',
]);
Route.get('orders/:id', 'TechnologyController.showOrder').middleware(['auth', 'handleParams']);
