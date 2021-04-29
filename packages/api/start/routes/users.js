/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const {
	getMiddlewarePermissions,
	permissions,
	getMiddlewareRoles,
	roles,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** User Routes */
/**
 * @api {get} /users Lists All Users
 * @apiGroup Users
 * @apiUse Params
 * @apiPermission LIST_USERS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Object[]} users User Collection
 * @apiSuccess {Number} users.id User Id
 * @apiSuccess {String} users.first_name User First Name
 * @apiSuccess {String} users.last_name User Last Name
 * @apiSuccess {String} users.email User Email
 * @apiSuccess {String} users.company User Company
 * @apiSuccess {String} users.zipcode User Zipcode
 * @apiSuccess {String} users.cpf User CPF
 * @apiSuccess {String} users.birth_date User Birth Date
 * @apiSuccess {String} users.phone_number User Phone Number
 * @apiSuccess {String} users.lattes_id User Lattes Id
 * @apiSuccess {String} users.address User Address
 * @apiSuccess {String} users.address2 User Address2
 * @apiSuccess {String} users.district User District
 * @apiSuccess {String} users.city User City
 * @apiSuccess {String} users.state User State
 * @apiSuccess {String} users.country User Country
 * @apiSuccess {String} users.status User Status
 * @apiSuccess {Number} users.role_id User Role Id
 * @apiSuccess {String} users.full_name User Full Name
 * @apiSuccess {Date} users.created_at User Register date
 * @apiSuccess {Date} users.updated_at User Update date
 * @apiSuccess {Object[]} users.permissions Custom User Permissions
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *		...
 *		{
 *			"id": 2,
 *			"email": "jamica@ejacep.gr",
 *			"status": "pending",
 *			"first_name": "2%0evQDSUL36J0w",
 *			"last_name": "e0AHdT[vrG",
 *			"company": "u7^@fUnIUmm4y",
 *			"zipcode": "50257",
 *			"cpf": "99028587787",
 *			"birth_date": "2061-02-18 01:44:05.782",
 *			"phone_number": "84949664087",
 *			"lattes_id": "35480535448",
 *			"address": "E@AcSkEE0w1U@nhZNY",
 *			"address2": "V)jCJPsIq$hojj@D",
 *			"district": "Vy(SKF^A%ou@ek",
 *			"city": ")Rhs7E72eV",
 *			"state": "BvYdIH2",
 *			"country": "hGCqgpZT",
 *			"role_id": 1,
 *			"created_at": "2020-08-06 20:41:55",
 *			"updated_at": "2020-08-06 20:41:55",
 *			"full_name": "2%0evQDSUL36J0w e0AHdT[vrG",
 *			"permissions": []
 *		},
 *		{
 *			"id": 3,
 *			"email": "irilinu@urgif.eg",
 *			"status": "pending",
 *			"first_name": "Cmt4yWG&Z&",
 *			"last_name": "0PTcV*Fbh5[fxk",
 *			"company": "$TJyOnpi",
 *			"zipcode": "51064",
 *			"cpf": "31498507313",
 *			"birth_date": "2028-12-25 17:24:19.663",
 *			"phone_number": "81669579727",
 *			"lattes_id": "22910545842",
 *			"address": "CC1ExPIuQ4Cou6qdzxOF",
 *			"address2": "zWU2D3vy!w0$q",
 *			"district": "Lw1E)DtBt%bzI",
 *			"city": "9CMHCJ7(l",
 *			"state": "SpsKZ%yLa]yawN",
 *			"country": "JhEvblO9(ncUGd]9W",
 *			"role_id": 1,
 *			"created_at": "2020-08-06 20:41:55",
 *			"updated_at": "2020-08-06 20:41:55",
 *			"full_name": "Cmt4yWG&Z& 0PTcV*Fbh5[fxk",
 *			"permissions": []
 *		},
 *		...
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
Route.get('users', 'UserController.index').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_USERS]),
	'handleParams',
]);
/**
 * @api {post} /users Creates a new User
 * @apiGroup Users
 * @apiPermission CREATE_USERS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} full_name Mandatory if first_name is not provided.
 * @apiParam {String} first_name Mandatory if full_name is not provided.
 * @apiParam {String} [last_name] Optional LastName.
 * @apiParam {String} email Mandatory Unique User Email.
 * @apiParam {String} password Mandatory User Password.
 * @apiParam {String} [company] User Company
 * @apiParam {String} [zipcode] User Zipcode
 * @apiParam {String} [cpf] User CPF
 * @apiParam {String} [birth_date] User Birth Date
 * @apiParam {String} [phone_number] User Phone Number
 * @apiParam {String} [lattes_id] User Lattes Id
 * @apiParam {String} [address] User Address
 * @apiParam {String} [address2] User Address2
 * @apiParam {String} [district] User District
 * @apiParam {String} [city] User City
 * @apiParam {String} [state] User State
 * @apiParam {String} [country] User Country
 * @apiParam {String} [status] User Status
 * @apiParam {Number} [role] User Role
 * @apiParam {Number[]} [permissions] Permission ID Array
 * @apiParam {Number} [institution_id] Institution ID
 * @apiParam {Boolean} [researcher] Indicates if user is a researcher
 * @apiParam {Number[]} [areas] Knowledge area ID list
 * @apiParamExample  {json} Request sample:
 *	{
 *		"full_name": "Testing User",
 *		"email": "testinguser@gmail.com",
 *		"password": "123456",
 *		"company":"Sabia",
 *		"zipcode": "59600330",
 *		"cpf": "21989756026",
 *		"birth_date": "1984-08-11",
 *		"phone_number": "(84)99999999",
 *		"lattes_id":"1234567890",
 *		"address": "Rua Teste, 55",
 *		"address2": "AP 96",
 *		"district": "Teste",
 *		"city": "Mossoró",
 *		"state": "RN",
 *		"country": "Brasil",
 *		"status": "verified",
 *		"permissions":[1,2,3],
 *		"institution_id":2
 *	}
 * @apiSuccess {Number} id User Id
 * @apiSuccess {String} first_name User First Name
 * @apiSuccess {String} last_name User Last Name
 * @apiSuccess {String} email User Email
 * @apiSuccess {String} company User Company
 * @apiSuccess {String} zipcode User Zipcode
 * @apiSuccess {String} cpf User CPF
 * @apiSuccess {String} birth_date User Birth Date
 * @apiSuccess {String} phone_number User Phone Number
 * @apiSuccess {String} lattes_id User Lattes Id
 * @apiSuccess {String} address User Address
 * @apiSuccess {String} address2 User Address2
 * @apiSuccess {String} district User District
 * @apiSuccess {String} city User City
 * @apiSuccess {String} state User State
 * @apiSuccess {String} country User Country
 * @apiSuccess {String} status User Status
 * @apiSuccess {Number} role_id User Role Id
 * @apiSuccess {String} full_name User Full Name
 * @apiSuccess {Date} creeated_at User Register date
 * @apiSuccess {Date} updated_at User Update date
 * @apiSuccess {Object[]} users.permissions Custom User Permissions
 * @apiSuccess {Object} role User Role object
 * @apiSuccess {Number} role.id User Role id
 * @apiSuccess {Number} role.role User Role
 * @apiSuccess {Number} role.description User Role Description
 * @apiSuccess {Date} role.created_at Role Register date
 * @apiSuccess {Date} role.updated_at Role Update date
 * @apiSuccess {Object[]} permissions User Permission List
 * @apiSuccess {Number} permissions.id Permision ID
 * @apiSuccess {String} permissions.permission Permision
 * @apiSuccess {String} permissions.description Permision Description
 * @apiSuccess {String} permissions.description Permision Description
 * @apiSuccess {Date} permissions.created_at Permision Register date
 * @apiSuccess {Date} permissions.updated_at Permision Update date
 * @apiSuccess {Object} permissions.pivot Permision User Pivot row
 * @apiSuccess {Number} permissions.pivot.permission_id Permision ID
 * @apiSuccess {Number} permissions.pivot.user_id User ID
 * @apiSuccess {Object[]} technologies User Technologies
 * @apiSuccess {Object[]} reviews User Reviews
 * @apiSuccess {Object[]} bookmarks User Bookmarks
 * @apiSuccess {Object} institution User Institution
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 16,
 *		"email": "testinguser@gmail.com",
 *		"status": "verified",
 *		"first_name": "Testing",
 *		"last_name": "User",
 *		"company": "Sabia",
 *		"zipcode": "59600330",
 *		"cpf": "21989756026",
 *		"birth_date": "1984-08-11",
 *		"phone_number": "(84)99999999",
 *		"lattes_id": "1234567890",
 *		"address": "Rua Teste, 55",
 *		"address2": "AP 96",
 *		"district": "Teste",
 *		"city": "Mossoró",
 *		"state": "RN",
 *		"country": "Brasil",
 *		"role_id": 1,
 *		"created_at": "2020-08-12 20:02:21",
 *		"updated_at": "2020-08-12 20:02:21",
 *		"full_name": "Testing User",
 *		"role": {
 *			"id": 1,
 *			"role": "DEFAULT_USER",
 *			"description": "Usuário comum",
 *			"created_at": "2020-08-06 20:41:54",
 *			"updated_at": "2020-08-06 20:41:54"
 *		},
 *		"permissions": [
 *			{
 *			"id": 1,
 *			"permission": "create-roles",
 *			"description": "Permite criar papeis no sistema",
 *			"created_at": "2020-08-06 20:42:47",
 *			"updated_at": "2020-08-06 20:42:47",
 *			"pivot": {
 *				"permission_id": 1,
 *				"user_id": 16
 *			}
 *			},
 *			{
 *			"id": 2,
 *			"permission": "list-roles",
 *			"description": "Permite listar papeis no sistema",
 *			"created_at": "2020-08-06 20:42:47",
 *			"updated_at": "2020-08-06 20:42:47",
 *			"pivot": {
 *				"permission_id": 2,
 *				"user_id": 16
 *			}
 *			},
 *			{
 *			"id": 3,
 *			"permission": "details-roles",
 *			"description": "Permite detalhar papeis no sistema",
 *			"created_at": "2020-08-06 20:42:47",
 *			"updated_at": "2020-08-06 20:42:47",
 *			"pivot": {
 *				"permission_id": 3,
 *				"user_id": 16
 *			}
 *			}
 *		],
 *		"technologies": [],
 *		"reviews": [],
 *		"bookmarks": []
 *		"institution": {
 *    		"id": 2,
 *    		"responsible": 1,
 *    		"name": "Georgia-Pacific Corporation",
 *    		"initials": "VSOYL",
 *    		"cnpj": "41.513.995/1972-03",
 *    		"address": "1262 Hizdet View",
 *    		"district": "1TTx9Z8",
 *    		"zipcode": "76201",
 *    		"city": "Tizioso",
 *    		"state": "DE",
 *    		"lat": "42.00638",
 *    		"lng": "116.62478",
 *    		"created_at": "2020-12-14 21:08:26",
 *    		"updated_at": "2020-12-14 21:08:26",
 *    		"email": null,
 *    		"phone_number": null,
 *    		"website": null,
 *    		"logo_id": null,
 *    		"type": "other",
 *    		"category": "other"
 *  	},
 *  "ideas": []
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
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Unique Email
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The email has already been taken by someone else.",
 *       				"field": "email",
 *       				"validation": "unique"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Email Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The email is required.",
 *       				"field": "email",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: First Name Required if full_name is not present
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The first_name is required when none of (full_name) are present.",
 *       				"field": "first_name",
 *       				"validation": "requiredWithoutAll"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Full Name Required if first_name is not present
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The full_name is required when none of (first_name) are present.",
 *       				"field": "full_name",
 *       				"validation": "requiredWithoutAll"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Password Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The password is required.",
 *       				"field": "password",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Invalid CPF
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "Invalid cpf (xxxxxxxxxxx)",
 *       				"field": "cpf",
 *       				"validation": "cpf"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Invalid CPF field Length
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "Invalid cpf field Length (xx). expected 11 digits",
 *       				"field": "cpf",
 *       				"validation": "cpf"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.post('users', 'UserController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_USERS])])
	.validator('User');
/**
 * @api {get} /users/:id Gets a single User
 * @apiGroup Users
 * @apiUse Params
 * @apiPermission VIEW_USERS or VIEW_USER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory User ID
 * @apiParamExample  {json} Request sample:
 *	/users/16
 * @apiSuccess {Number} id User Id
 * @apiSuccess {String} first_name User First Name
 * @apiSuccess {String} last_name User Last Name
 * @apiSuccess {String} email User Email
 * @apiSuccess {String} company User Company
 * @apiSuccess {String} zipcode User Zipcode
 * @apiSuccess {String} cpf User CPF
 * @apiSuccess {String} birth_date User Birth Date
 * @apiSuccess {String} phone_number User Phone Number
 * @apiSuccess {String} lattes_id User Lattes Id
 * @apiSuccess {String} address User Address
 * @apiSuccess {String} address2 User Address2
 * @apiSuccess {String} district User District
 * @apiSuccess {String} city User City
 * @apiSuccess {String} state User State
 * @apiSuccess {String} country User Country
 * @apiSuccess {String} status User Status
 * @apiSuccess {Number} role_id User Role Id
 * @apiSuccess {String} full_name User Full Name
 * @apiSuccess {Date} creeated_at User Register date
 * @apiSuccess {Date} updated_at User Update date
 * @apiSuccess {Object[]} users.permissions Custom User Permissions
 * @apiSuccess {Object[]} permissions User Permission List
 * @apiSuccess {Number} permissions.id Permision ID
 * @apiSuccess {Object} permissions.pivot Permision User Pivot row
 * @apiSuccess {Number} permissions.pivot.permission_id Permision ID
 * @apiSuccess {Number} permissions.pivot.user_id User ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
	{
		"id": 16,
		"email": "testinguser@gmail.com",
		"status": "verified",
		"first_name": "Testing",
		"last_name": "User",
		"company": "Sabia",
		"zipcode": "59600330",
		"cpf": "21989756026",
		"birth_date": "1984-08-11",
		"phone_number": "(84)99999999",
		"lattes_id": "1234567890",
		"address": "Rua Teste, 55",
		"address2": "AP 96",
		"district": "Teste",
		"city": "Mossoró",
		"state": "RN",
		"country": "Brasil",
		"role_id": 1,
		"created_at": "2020-08-12 20:02:21",
		"updated_at": "2020-08-12 20:02:21",
		"full_name": "Testing User",
		"permissions": [
			{
				"id": 1,
				"pivot": {
					"permission_id": 1,
					"user_id": 16
				}
				},
				{
				"id": 2,
				"pivot": {
					"permission_id": 2,
					"user_id": 16
				}
				},
				{
				"id": 3,
				"pivot": {
					"permission_id": 3,
					"user_id": 16
				}
			}
		]
	}
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
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
 * 			}
 *		}
 */
Route.get('users/:id', 'UserController.show').middleware([
	'auth',
	getMiddlewarePermissions([permissions.VIEW_USERS, permissions.VIEW_USER]),
	'handleParams',
]);
/**
 * @api {put} /users/:id Updates a User
 * @apiGroup Users
 * @apiPermission UPDATE_USER or UPDATE_USERS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory User ID
 * @apiParam {String} [full_name] Full Name
 * @apiParam {String} [first_name] First Name
 * @apiParam {String} [last_name] LastName.
 * @apiParam {String} [email] Unique User Email.
 * @apiParam {String} [password] User Password.
 * @apiParam {String} [company] User Company
 * @apiParam {String} [zipcode] User Zipcode
 * @apiParam {String} [cpf] User CPF
 * @apiParam {String} [birth_date] User Birth Date
 * @apiParam {String} [phone_number] User Phone Number
 * @apiParam {String} [lattes_id] User Lattes Id
 * @apiParam {String} [address] User Address
 * @apiParam {String} [address2] User Address2
 * @apiParam {String} [district] User District
 * @apiParam {String} [city] User City
 * @apiParam {String} [state] User State
 * @apiParam {String} [country] User Country
 * @apiParam {String} [status] User Status
 * @apiParam {Number} [role] User Role
 * @apiParam {Number[]} [permissions] Permission ID Array
 * @apiParam {Number} [institution_id] Institution ID
 * @apiParam {Boolean} [researcher] Indicates if user is a researcher
 * @apiParam {Number[]} [areas] Knowledge area ID list
 * @apiParamExample  {json} Request sample:
 *	{
 *		"full_name": "Updated Testing User",
 *		"email": "updatedtestinguser@gmail.com",
 *		"password": "123456",
 *		"company":"Sabia",
 *		"zipcode": "59600330",
 *		"cpf": "21989756026",
 *		"birth_date": "1984-08-11",
 *		"phone_number": "(84)99999999",
 *		"lattes_id":"1234567890",
 *		"address": "Rua Teste, 55",
 *		"address2": "AP 96",
 *		"district": "Teste",
 *		"city": "Mossoró",
 *		"state": "RN",
 *		"country": "Brasil",
 *		"status": "verified",
 *		"permissions":[1,2,3],
 *		"institution_id":2
 *	}
 * @apiSuccess {Number} id User Id
 * @apiSuccess {String} first_name User First Name
 * @apiSuccess {String} last_name User Last Name
 * @apiSuccess {String} email User Email
 * @apiSuccess {String} company User Company
 * @apiSuccess {String} zipcode User Zipcode
 * @apiSuccess {String} cpf User CPF
 * @apiSuccess {String} birth_date User Birth Date
 * @apiSuccess {String} phone_number User Phone Number
 * @apiSuccess {String} lattes_id User Lattes Id
 * @apiSuccess {String} address User Address
 * @apiSuccess {String} address2 User Address2
 * @apiSuccess {String} district User District
 * @apiSuccess {String} city User City
 * @apiSuccess {String} state User State
 * @apiSuccess {String} country User Country
 * @apiSuccess {String} status User Status
 * @apiSuccess {Number} role_id User Role Id
 * @apiSuccess {String} full_name User Full Name
 * @apiSuccess {Date} creeated_at User Register date
 * @apiSuccess {Date} updated_at User Update date
 * @apiSuccess {Object[]} users.permissions Custom User Permissions
 * @apiSuccess {Object} role User Role object
 * @apiSuccess {Number} role.id User Role id
 * @apiSuccess {Number} role.role User Role
 * @apiSuccess {Number} role.description User Role Description
 * @apiSuccess {Date} role.created_at Role Register date
 * @apiSuccess {Date} role.updated_at Role Update date
 * @apiSuccess {Object[]} permissions User Permission List
 * @apiSuccess {Number} permissions.id Permision ID
 * @apiSuccess {String} permissions.permission Permision
 * @apiSuccess {String} permissions.description Permision Description
 * @apiSuccess {String} permissions.description Permision Description
 * @apiSuccess {Date} permissions.created_at Permision Register date
 * @apiSuccess {Date} permissions.updated_at Permision Update date
 * @apiSuccess {Object} permissions.pivot Permision User Pivot row
 * @apiSuccess {Number} permissions.pivot.permission_id Permision ID
 * @apiSuccess {Number} permissions.pivot.user_id User ID
 * @apiSuccess {Object[]} technologies User Technologies
 * @apiSuccess {Object[]} reviews User Reviews
 * @apiSuccess {Object[]} bookmarks User Bookmarks
 * @apiSuccess {Object} institution User Institution
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 16,
 *		"email": "testinguser@gmail.com",
 *		"status": "verified",
 *		"first_name": "Updated",
 *		"last_name": "User",
 *		"company": "Sabia",
 *		"zipcode": "59600330",
 *		"cpf": "21989756026",
 *		"birth_date": "1984-08-11",
 *		"phone_number": "(84)99999999",
 *		"lattes_id": "1234567890",
 *		"address": "Rua Teste, 55",
 *		"address2": "AP 96",
 *		"district": "Teste",
 *		"city": "Mossoró",
 *		"state": "RN",
 *		"country": "Brasil",
 *		"role_id": 1,
 *		"created_at": "2020-08-12 20:02:21",
 *		"updated_at": "2020-08-12 20:47:24",
 *		"full_name": "Updated User",
 *		"role": {
 *			"id": 1,
 *			"role": "DEFAULT_USER",
 *			"description": "Usuário comum",
 *			"created_at": "2020-08-06 20:41:54",
 *			"updated_at": "2020-08-06 20:41:54"
 *		},
 *		"permissions": [
 *			{
 *				"id": 1,
 *				"permission": "create-roles",
 *				"description": "Permite criar papeis no sistema",
 *				"created_at": "2020-08-06 20:42:47",
 *				"updated_at": "2020-08-06 20:42:47",
 *				"pivot": {
 *					"permission_id": 1,
 *					"user_id": 16
 *				}
 *				},
 *				{
 *				"id": 2,
 *				"permission": "list-roles",
 *				"description": "Permite listar papeis no sistema",
 *				"created_at": "2020-08-06 20:42:47",
 *				"updated_at": "2020-08-06 20:42:47",
 *				"pivot": {
 *					"permission_id": 2,
 *					"user_id": 16
 *				}
 *				},
 *				{
 *				"id": 3,
 *				"permission": "details-roles",
 *				"description": "Permite detalhar papeis no sistema",
 *				"created_at": "2020-08-06 20:42:47",
 *				"updated_at": "2020-08-06 20:42:47",
 *				"pivot": {
 *					"permission_id": 3,
 *					"user_id": 16
 *				}
 *			}
 *		],
 *		"technologies": [],
 *		"reviews": [],
 *		"bookmarks": []
 *		"institution": {
 *    		"id": 2,
 *    		"responsible": 1,
 *    		"name": "Georgia-Pacific Corporation",
 *    		"initials": "VSOYL",
 *    		"cnpj": "41.513.995/1972-03",
 *    		"address": "1262 Hizdet View",
 *    		"district": "1TTx9Z8",
 *    		"zipcode": "76201",
 *    		"city": "Tizioso",
 *    		"state": "DE",
 *    		"lat": "42.00638",
 *    		"lng": "116.62478",
 *    		"created_at": "2020-12-14 21:08:26",
 *    		"updated_at": "2020-12-14 21:08:26",
 *    		"email": null,
 *    		"phone_number": null,
 *    		"website": null,
 *    		"logo_id": null,
 *    		"type": "other",
 *    		"category": "other"
 *  	},
 *  "ideas": []
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
 * @apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
 * 			}
 *		}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {Object[]} error.message Error messages
 * @apiErrorExample {json} Validation Error: Unique Email
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The email has already been taken by someone else.",
 *       				"field": "email",
 *       				"validation": "unique"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Invalid CPF
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "Invalid cpf (xxxxxxxxxxx)",
 *       				"field": "cpf",
 *       				"validation": "cpf"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Invalid CPF field Length
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "Invalid cpf field Length (xx). expected 11 digits",
 *       				"field": "cpf",
 *       				"validation": "cpf"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.put('users/:id', 'UserController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_USER, permissions.UPDATE_USERS]),
	])
	.validator('UpdateUser');
/**
 * @api {post} /users/:id/permissions Associates permission(s) to User
 * @apiGroup Users
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory User ID.
 * @apiParam {String[]} permissions Permission Array
 * @apiParamExample  {json} Request sample:
 *	{
 *		"permissions":[
 *			"update-users","update-technologies"
 *		]
 *	}
 * @apiSuccess {Number} id User Id
 * @apiSuccess {String} first_name User First Name
 * @apiSuccess {String} last_name User Last Name
 * @apiSuccess {String} email User Email
 * @apiSuccess {String} company User Company
 * @apiSuccess {String} zipcode User Zipcode
 * @apiSuccess {String} cpf User CPF
 * @apiSuccess {String} birth_date User Birth Date
 * @apiSuccess {String} phone_number User Phone Number
 * @apiSuccess {String} lattes_id User Lattes Id
 * @apiSuccess {String} address User Address
 * @apiSuccess {String} address2 User Address2
 * @apiSuccess {String} district User District
 * @apiSuccess {String} city User City
 * @apiSuccess {String} state User State
 * @apiSuccess {String} country User Country
 * @apiSuccess {String} status User Status
 * @apiSuccess {Number} role_id User Role Id
 * @apiSuccess {String} full_name User Full Name
 * @apiSuccess {Date} creeated_at User Register date
 * @apiSuccess {Date} updated_at User Update date
 * @apiSuccess {Object[]} users.permissions Custom User Permissions
 * @apiSuccess {Object} role User Role object
 * @apiSuccess {Number} role.id User Role id
 * @apiSuccess {Number} role.role User Role
 * @apiSuccess {Number} role.description User Role Description
 * @apiSuccess {Date} role.created_at Role Register date
 * @apiSuccess {Date} role.updated_at Role Update date
 * @apiSuccess {Object[]} permissions User Permission List
 * @apiSuccess {Number} permissions.id Permision ID
 * @apiSuccess {String} permissions.permission Permision
 * @apiSuccess {String} permissions.description Permision Description
 * @apiSuccess {String} permissions.description Permision Description
 * @apiSuccess {Date} permissions.created_at Permision Register date
 * @apiSuccess {Date} permissions.updated_at Permision Update date
 * @apiSuccess {Object} permissions.pivot Permision User Pivot row
 * @apiSuccess {Number} permissions.pivot.permission_id Permision ID
 * @apiSuccess {Number} permissions.pivot.user_id User ID
 * @apiSuccess {Object[]} technologies User Technologies
 * @apiSuccess {Object[]} reviews User Reviews
 * @apiSuccess {Object[]} bookmarks User Bookmarks
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 16,
 *		"email": "testinguser@gmail.com",
 *		"status": "verified",
 *		"first_name": "Testing",
 *		"last_name": "User",
 *		"company": "Sabia",
 *		"zipcode": "59600330",
 *		"cpf": "21989756026",
 *		"birth_date": "1984-08-11",
 *		"phone_number": "(84)99999999",
 *		"lattes_id": "1234567890",
 *		"address": "Rua Teste, 55",
 *		"address2": "AP 96",
 *		"district": "Teste",
 *		"city": "Mossoró",
 *		"state": "RN",
 *		"country": "Brasil",
 *		"role_id": 1,
 *		"created_at": "2020-08-12 20:02:21",
 *		"updated_at": "2020-08-12 20:02:21",
 *		"full_name": "Testing User",
 *		"role": {
 *			"id": 1,
 *			"role": "DEFAULT_USER",
 *			"description": "Usuário comum",
 *			"created_at": "2020-08-06 20:41:54",
 *			"updated_at": "2020-08-06 20:41:54"
 *		},
 *		"permissions": [
 *			{
 *			"id": 1,
 *			"permission": "create-roles",
 *			"description": "Permite criar papeis no sistema",
 *			"created_at": "2020-08-06 20:42:47",
 *			"updated_at": "2020-08-06 20:42:47",
 *			"pivot": {
 *				"permission_id": 1,
 *				"user_id": 16
 *			}
 *			},
 *			{
 *			"id": 2,
 *			"permission": "list-roles",
 *			"description": "Permite listar papeis no sistema",
 *			"created_at": "2020-08-06 20:42:47",
 *			"updated_at": "2020-08-06 20:42:47",
 *			"pivot": {
 *				"permission_id": 2,
 *				"user_id": 16
 *			}
 *			},
 *			{
 *			"id": 3,
 *			"permission": "details-roles",
 *			"description": "Permite detalhar papeis no sistema",
 *			"created_at": "2020-08-06 20:42:47",
 *			"updated_at": "2020-08-06 20:42:47",
 *			"pivot": {
 *				"permission_id": 3,
 *				"user_id": 16
 *			}
 *			,
 *			{
 *			"id": 18,
 *			"permission": "update-technologies",
 *			"description": "Permite editar tecnologias no sistema",
 *			"created_at": "2020-08-06 20:42:49",
 *			"updated_at": "2020-08-06 20:42:49",
 *			"pivot": {
 *				"permission_id": 18,
 *				"user_id": 16
 *			}
 *			},
 *			{
 *			"id": 29,
 *			"permission": "update-users",
 *			"description": "Permite editar usuários no sistema",
 *			"created_at": "2020-08-06 20:42:49",
 *			"updated_at": "2020-08-06 20:42:49",
 *			"pivot": {
 *				"permission_id": 29,
 *				"user_id": 16
 *			}
 *			}
 *		],
 *		"technologies": [],
 *		"reviews": [],
 *		"bookmarks": []
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
 * @apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
 * 			}
 *		}
 */
Route.post('users/:id/permissions', 'UserController.associatePermissionUser').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {delete} /users/:id Deletes a User
 * @apiGroup Users
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory User ID.
 * @apiParamExample  {json} Request sample:
 *	/users/16
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
 * @apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
 * 			}
 *		}
 */
Route.delete('users/:id', 'UserController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {delete} /users Delete multiple Users
 * @apiGroup Users
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} ids List of users IDs.
 * @apiParamExample  {json} Request sample:
 *	/users?ids=1,2,3
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
 *@apiErrorExample {json} Validation Error: Ids Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "ids é obrigatório e está faltando.",
 *                		"field": "ids",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 */
Route.delete('users/', 'UserController.destroyMany')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN]), 'handleParams'])
	.validator('DeleteMany');
/**
 * @api {get} /user/me Gets own user
 * @apiGroup Users
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Number} id User Id
 * @apiSuccess {String} first_name User First Name
 * @apiSuccess {String} last_name User Last Name
 * @apiSuccess {String} email User Email
 * @apiSuccess {String} company User Company
 * @apiSuccess {String} zipcode User Zipcode
 * @apiSuccess {String} cpf User CPF
 * @apiSuccess {String} birth_date User Birth Date
 * @apiSuccess {String} phone_number User Phone Number
 * @apiSuccess {String} lattes_id User Lattes Id
 * @apiSuccess {String} address User Address
 * @apiSuccess {String} address2 User Address2
 * @apiSuccess {String} district User District
 * @apiSuccess {String} city User City
 * @apiSuccess {String} state User State
 * @apiSuccess {String} country User Country
 * @apiSuccess {String} status User Status
 * @apiSuccess {Number} role_id User Role Id
 * @apiSuccess {Object} role User Role
 * @apiSuccess {String} full_name User Full Name
 * @apiSuccess {Date} creeated_at User Register date
 * @apiSuccess {Date} updated_at User Update date
 * @apiSuccess {Object} operations User operations
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 15,
 *		"email": "sabiatestingadmin@gmail.com",
 *		"status": "verified",
 *		"first_name": "AdminName",
 *		"last_name": "AdminLastName",
 *		"company": null,
 *		"zipcode": null,
 *		"cpf": null,
 *		"birth_date": null,
 *		"phone_number": null,
 *		"lattes_id": null,
 *		"address": null,
 *		"address2": null,
 *		"district": null,
 *		"city": null,
 *		"state": null,
 *		"country": null,
 *		"role_id": 5,
 *		"role": {
 *	 			"id": 5
 *				"role": "ADMIN"
 *				"description": "Usuário Administrador"
 *				"created_at": "2020-08-31 11:15:21"
 *				"updated_at": "2020-08-31 11:15:21"
 * 		},
 *		"created_at": "2020-08-06 20:41:56",
 *		"updated_at": "2020-08-06 20:41:56",
 *		"full_name": "AdminName AdminLastName"
 *	}
 * @apiUse AuthError
 */
Route.get('/user/me', 'AuthController.getMe').middleware(['auth']);
/**
 * @api {put} /user/change-password Changes User Password
 * @apiGroup Users
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} currentPassword Mandatory Current Password.
 * @apiParam {String} newPassword Mandatory New Password.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"currentPassword": "currentpass",
 *		"newPassowrd":"newpass"
 *	}
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Current Password Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The currentPassword is required.",
 *       				"field": "currentPassword",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: New Password Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The newPassword is required.",
 *       				"field": "newPassword",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Current password does not match
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "PASSWORD_NOT_MATCH",
 *   			"message":"The current password does not match"
 * 			}
 *		}
 */
Route.put('/user/change-password', 'UserController.changePassword')
	.middleware(['auth'])
	.validator('ChangeUserPassword');
/**
 * @api {post} /user/change-email Changes User Email
 * @apiGroup Users
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} email Mandatory User Email.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"email": "newemail@mail.com",
 *	}
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {Object[]} error.message Error messages
 * @apiErrorExample {json} Validation Error: Email Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The email is required.",
 *       				"field": "email",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Unique Email
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The email has already been taken by someone else.",
 *       				"field": "email",
 *       				"validation": "unique"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.post('/user/change-email', 'UserController.changeEmail')
	.middleware(['auth'])
	.validator('ChangeUserEmail');
/**
 * @api {put} /user/change-email Confirms User Email
 * @apiGroup Users
 * @apiParam {String} token Mandatory Token.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"token": "<new-email token>",
 *	}
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {Object[]} error.message Error messages
 * @apiErrorExample {json} Validation Error: Token Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The token is required.",
 *       				"field": "token",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Provided token is invalid
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "INVALID_TOKEN",
 *   			"message":"The provided token is invalid."
 * 			}
 *		}
 */
Route.put('/user/change-email', 'UserController.confirmNewEmail').validator('ConfirmNewEmail');
