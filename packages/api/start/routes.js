/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const {
	getMiddlewarePermissions,
	permissions,
	getMiddlewareRoles,
	roles,
} = require('../app/Utils/roles_capabilities');

const Route = use('Route');

/**
 * @apiDefine ADMIN User access only
 * Only User with role ADMIN can access this route
 */

/**
 * @apiDefine Params
 * @apiParam {Number} [page] The page number for offset.
 * @apiParam {Number} [perPage] Number rows for page.
 * @apiParam {String="ASC","DESC"} [order] Sorts the records in ascending or descending order.
 * @apiParam {String} [orderBy] Sorts the records by one column.
 * @apiParam embed Activate Embedding.
 * @apiParam {Number[]} [ids] Filter by Id Array.
 * @apiParam {Number[]} [notIn] Exclude Ids from query.
 */

/**
 * @api {post} /auth/register Register a new user
 * @apiGroup Auth
 * @apiParam {String} [scope] Optional For send confirmation email.
 * @apiParam {String} full_name Mandatory if first_name is not provided.
 * @apiParam {String} first_name Mandatory if full_name is not provided.
 * @apiParam {String} [last_name] Optional LastName.
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} password Mandatory User Email.
 * @apiParamExample {json} Request sample:
 *{
 *      "scope": "admin"
 *      "first_name":"FirstName",
 *      "last_name":"LastName",
 *      "email": "user@testing.com",
 *      "password": "pass"
 *    }
 * @apiSuccess {String} first_name User First Name
 * @apiSuccess {String} last_name User Last Name
 * @apiSuccess {String} email User Email
 * @apiSuccess {Date} created_at User Register date
 * @apiSuccess {Date} updated_at User Update date
 * @apiSuccess {Number} id User Id
 * @apiSuccess {Number} role_id User Role Id
 * @apiSuccess {String} full_name User Full Name
 * @apiSuccess {object} role User Role object
 * @apiSuccess {number} role.id User Role id
 * @apiSuccess {number} role.role User Role
 * @apiSuccess {number} role.description User Role Description
 * @apiSuccess {number} role.created_at Role Register date
 * @apiSuccess {number} role.updated_at Role Update date
 * @apiSuccess {String} password Empty password
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"first_name": "FirstName",
 * 		"last_name": "LastName",
 * 		"email": "user@testing.com",
 * 		"created_at": "2020-07-31 15:39:02",
 * 		"updated_at": "2020-07-31 15:39:02",
 * 		"id": 1,
 * 		"role_id": 1,
 * 		"full_name": "FirstName LastName",
 *		 "role": {
 *			"id": 1,
 *			"role": "DEFAULT_USER",
 *			"description": "Usuário comum",
 *			"created_at": "2020-07-31 19:10:52",
 *			"updated_at": "2020-07-31 19:10:52"
 * 		},
 * 		"password": ""
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
Route.post('/auth/register', 'AuthController.register').validator('User');

/**
 * @api {post} /auth/login Authenticate a user
 * @apiGroup Auth
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} password Mandatory User Password.
 * @apiParamExample {json} Request sample:
 *    {
 *		"email": "user@testing.com",
 *		"password": "pass"
 *    }
 * @apiSuccess {String} type Token Type
 * @apiSuccess {String} token User Token
 * @apiSuccess {String} refreshToken=null Token Refresh
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"type": "bearer",
 *		"token": <token>,
 *		"refreshToken": null
 *    }
 *@apiError (401 Unauthorized) {Object} error Error object
 *@apiError (401 Unauthorized) {String} error.error_code Error code
 *@apiError (401 Unauthorized) {String} error.message Error message
 * @apiErrorExample {json} Invalid Credentials Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "INVALID_CREDENTIALS",
 *			"message": "As credenciais fornecidas são inválidas"
 *		}
 *    }
 * @apiErrorExample {json} Unverified Email Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "UNVERIFIED_EMAIL",
 *			"message": "O e-mail informado não foi verificado"
 *		}
 *    }
 *
 */
Route.post('/auth/login', 'AuthController.auth').validator('Session');

/**
 * @api {get} /auth/forgot-password Forgot Password Route
 * @apiGroup Auth
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} [scope] Optional Scope.
 * @apiParamExample  {json} Request sample:
 * ?email=test@test.com&scope=admin
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (400 Bad Request) {Object} error Error object
 *@apiError (400 Bad Request) {String} error.error_code Error code
 *@apiError (400 Bad Request) {String} error.message Error message
 *@apiErrorExample {json} Invalid Email Error
 *    HTTP/1.1 400 Bad Request
 *    {
 *		"error": {
 *			"error_code": "INVALID_EMAIL",
 *			"message": "O email é inválido ou não existe."
 *		}
 *    }
 */
Route.get('/auth/forgot-password', 'AuthController.forgotPassword').validator('ForgotPassword');

/**
 * @api {post} /auth/reset-password Reset Password Route
 * @apiGroup Auth
 * @apiParam {String} token Mandatory Token.
 * @apiParam {String} password Mandatory User Password.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"token": "<reset-pw token>",
 *		"password": "newpass"
 *    }
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (401 Unauthorized) {Object} error Error object
 *@apiError (401 Unauthorized) {String} error.error_code Error code
 *@apiError (401 Unauthorized) {String} error.message Error message
 *@apiErrorExample {json} Invalid Token Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "INVALID_TOKEN",
 *			"message": "O token é inválido."
 *		}
 *    }
 */
Route.post('/auth/reset-password', 'AuthController.resetPassword').validator('ResetPassword');

/**
 * @api {post} /auth/confirm-account Confirm Account Route
 * @apiGroup Auth
 * @apiParam {String} token Mandatory Token.
 * @apiParam {String} scope Mandatory Scope.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"token": "<confirm-ac token>",
 *		"scope": "web"
 *    }
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (401 Unauthorized) {Object} error Error object
 *@apiError (401 Unauthorized) {String} error.error_code Error code
 *@apiError (401 Unauthorized) {String} error.message Error messag
 *@apiErrorExample {json} Invalid Token Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "INVALID_TOKEN",
 *			"message": "O token é inválido."
 *		}
 *    }
 */
Route.post('/auth/confirm-account', 'AuthController.confirmAccount').validator('ConfirmAccount');

/**
 * @api {post} /auth/resend-confirmation-emai Resend Confirmation Email
 * @apiGroup Auth
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} [scope] Optional Scope.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"email": "user@email.com",
 *		"scope": "web"
 *    }
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 */
Route.post('/auth/resend-confirmation-email', 'AuthController.resendConfirmationEmail');

/** Role Routes */
/**
 * @api {post} /roles Creates a new Role
 * @apiGroup Roles
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} role Mandatory Unique Role.
 * @apiParam {String} description Mandatory Role Description.
 * @apiParam {Number[]} [permissions] Optional Permission ID array.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"role": "USER_ROLE",
 *		"description": "User Role Description"
 *		"permissions": [1,2,3,4,5]
 *    }
 * @apiSuccess {Number} id Role ID
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} description Role Description
 * @apiSuccess {Date} created_at Role Register date
 * @apiSuccess {Date} updated_at Role Update date
 * @apiSuccess {Object[]} permissions List of role permissions.
 * @apiSuccess {Number} permissions.id Permssion ID.
 * @apiSuccess {Object} permissions.pivot Role-Permssion relashionship.
 * @apiSuccess {Number} permissions.pivot.permission_id Permssion ID in pivot table.
 * @apiSuccess {Number} permissions.pivot.role_id Role ID in pivot table.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "User Role Description",
 *   "created_at": "2020-08-01 15:14:07",
 *   "updated_at": "2020-08-01 15:14:07",
 *   "permissions": [
 *     {
 *       "id": 1,
 *       "pivot": {
 *         "permission_id": 1,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 2,
 *       "pivot": {
 *         "permission_id": 2,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 3,
 *       "pivot": {
 *         "permission_id": 3,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 4,
 *       "pivot": {
 *         "permission_id": 4,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 5,
 *       "pivot": {
 *         "permission_id": 5,
 *         "role_id": 8
 *       }
 *     }
 *   ]
 * }
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Unique Role
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "role já existe e precisa ser único.",
 *       				"field": "role",
 *       				"validation": "unique"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Role Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "role é obrigatório e está faltando.",
 *       				"field": "role",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Description Required
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
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.post('roles', 'RoleController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('StoreRole');
/**
 * @api {put} /roles/:id Updates Role details
 * @apiGroup Roles
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Role ID.
 * @apiParam {String} description Optional Role Description.
 * @apiParam {Number[]} [permissions] Optional Permission ID array.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"description": "Updated User Role Description"
 *    }
 * @apiSuccess {Number} id Role ID
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} description Role Description
 * @apiSuccess {Date} created_at Role Register date
 * @apiSuccess {Date} updated_at Role Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "Updated User Role Description",
 *   "created_at": "2020-08-01 15:14:07",
 *   "updated_at": "2020-08-01 17:21:08",
 * }
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.put('roles/:id', 'RoleController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdateRole');
/**
 * @api {delete} /roles/:id Delete a Role
 * @apiGroup Roles
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Role ID.
 * @apiParamExample  {json} Request sample:
 *	/roles/1
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.delete('roles/:id', 'RoleController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
/**
 * @api {get} /roles List All Roles
 * @apiGroup Roles
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiSuccess {Object[]} roles Roles Collection
 * @apiSuccess {Number} roles.id Role ID
 * @apiSuccess {String} roles.role User Role
 * @apiSuccess {String} roles.description Role Description
 * @apiSuccess {Date} roles.created_at Role Register date
 * @apiSuccess {Date} roles.updated_at Role Update date
 * @apiSuccess {Object[]} roles.permissions List of role permissions.
 * @apiSuccess {Number} roles.permissions.id Permssion ID.
 * @apiSuccess {Object} roles.permissions.pivot Role-Permssion relashionship.
 * @apiSuccess {Number} roles.permissions.pivot.permission_id Permssion ID in pivot table.
 * @apiSuccess {Number} roles.permissions.pivot.role_id Role ID in pivot table.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "User Role Description",
 *   "created_at": "2020-08-01 15:14:07",
 *   "updated_at": "2020-08-01 15:14:07",
 *   "permissions": [
 *     {
 *       "id": 1,
 *       "pivot": {
 *         "permission_id": 1,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 2,
 *       "pivot": {
 *         "permission_id": 2,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 3,
 *       "pivot": {
 *         "permission_id": 3,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 4,
 *       "pivot": {
 *         "permission_id": 4,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 5,
 *       "pivot": {
 *         "permission_id": 5,
 *         "role_id": 8
 *       }
 *     }
 *   ]
 * }
 * ]
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.get('roles', 'RoleController.index').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
/**
 * @api {get} /roles/:id Get a single Role
 * @apiGroup Roles
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Role ID.
 * @apiParam embed Activate Embedding.
 * @apiParamExample  {json} Request sample:
 *	/roles/8?embed
 * @apiSuccess {Number} id Role ID
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} description Role Description
 * @apiSuccess {Date} created_at Role Register date
 * @apiSuccess {Date} updated_at Role Update date
 * @apiSuccess {Object[]} permissions List of role permissions.
 * @apiSuccess {Number} permissions.id Permssion ID.
 * @apiSuccess {Object} permissions.pivot Role-Permssion relashionship.
 * @apiSuccess {Number} permissions.pivot.permission_id Permssion ID in pivot table.
 * @apiSuccess {Number} permissions.pivot.role_id Role ID in pivot table.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "User Role Description",
 *   "created_at": "2020-08-01 15:14:07",
 *   "updated_at": "2020-08-01 15:14:07",
 *   "permissions": [
 *     {
 *       "id": 1,
 *       "pivot": {
 *         "permission_id": 1,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 2,
 *       "pivot": {
 *         "permission_id": 2,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 3,
 *       "pivot": {
 *         "permission_id": 3,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 4,
 *       "pivot": {
 *         "permission_id": 4,
 *         "role_id": 8
 *       }
 *     },
 *     {
 *       "id": 5,
 *       "pivot": {
 *         "permission_id": 5,
 *         "role_id": 8
 *       }
 *     }
 *   ]
 * }
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.get('roles/:id', 'RoleController.show').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);

/** Permission Routes */
/**
 * @api {post} /permissions Creates a new Permission
 * @apiGroup Permissions
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} permission Mandatory Unique Permission.
 * @apiParam {String} description Mandatory Permission Description.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"permission": "user-permission",
 *		"description": "User Permission"
 *    }
 * @apiSuccess {Number} id Permission ID
 * @apiSuccess {String} permission User Permission
 * @apiSuccess {String} description Permission Description
 * @apiSuccess {Date} created_at Permission Register date
 * @apiSuccess {Date} updated_at Permission Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *		{
 *			"id": 41
 * 			"permission": "user-permission",
 * 			"description": "User Permission",
 * 			"created_at": "2020-08-02 14:44:06",
 * 			"updated_at": "2020-08-02 14:44:06",
 *		}
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Unique Permission
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "permission já existe e precisa ser único.",
 *       				"field": "permission",
 *       				"validation": "unique"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Permission Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "permission é obrigatório e está faltando.",
 *       				"field": "permission",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Description Required
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
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.post('permissions', 'PermissionController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('StorePermission');
/**
 * @api {put} /permissions/:id Updates a Permission
 * @apiGroup Permissions
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Permission ID.
 * @apiParam {String} [permission] Optional Unique Permission.
 * @apiParam {String} [description] Optional Permission Description.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"description": "Updated User Permission"
 *    }
 * @apiSuccess {Number} id Permission ID
 * @apiSuccess {String} permission User Permission
 * @apiSuccess {String} description Permission Description
 * @apiSuccess {Date} created_at Permission Register date
 * @apiSuccess {Date} updated_at Permission Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *		{
 *			"id": 41
 * 			"description": "Updated User Permission",
 * 			"created_at": "2020-08-02 14:44:06",
 * 			"updated_at": "2020-08-02 14:55:19",
 *		}
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Unique Permission
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "permission já existe e precisa ser único.",
 *       				"field": "permission",
 *       				"validation": "unique"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.put('permissions/:id', 'PermissionController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdatePermission');
/**
 * @api {delete} /permissions/:id Delete a Permissions
 * @apiGroup Permissions
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Permission ID.
 * @apiParamExample  {json} Request sample:
 *	/permissions/42
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.delete('permissions/:id', 'PermissionController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {get} /permissions List All Permissions
 * @apiGroup Permissions
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiSuccess {Object[]} permissions Permissions Collection
 * @apiSuccess {Number} permissions.id Permission ID
 * @apiSuccess {String} permissions.permission User Permission
 * @apiSuccess {String} permissions.description Permission Description
 * @apiSuccess {Date} permissions.created_at Permission Register date
 * @apiSuccess {Date} permissions.updated_at Permission Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *  {
 *     "id": 1,
 *     "permission": "create-roles",
 *     "description": "Permite criar papeis no sistema",
 *     "created_at": "2020-07-28 18:40:49",
 *     "updated_at": "2020-07-28 18:40:49"
 *   },
 *   {
 *     "id": 2,
 *     "permission": "list-roles",
 *     "description": "Permite listar papeis no sistema",
 *     "created_at": "2020-07-28 18:40:49",
 *     "updated_at": "2020-07-28 18:40:49"
 *   },
 *   {
 *     "id": 3,
 *     "permission": "details-roles",
 *     "description": "Permite detalhar papeis no sistema",
 *     "created_at": "2020-07-28 18:40:50",
 *     "updated_at": "2020-07-28 18:40:50"
 *   },
 *   {
 *     "id": 4,
 *     "permission": "update-roles",
 *     "description": "Permite editar papeis no sistema",
 *     "created_at": "2020-07-28 18:40:50",
 *     "updated_at": "2020-07-28 18:40:50"
 *   },
 *   {
 *     "id": 5,
 *     "permission": "delete-roles",
 *     "description": "Permite excluir papeis no sistema",
 *     "created_at": "2020-07-28 18:40:50",
 *     "updated_at": "2020-07-28 18:40:50"
 *   },
 * 	...
 * ]
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.get('permissions', 'PermissionController.index').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
/**
 * @api {get} /permissions/:id Get a single Permission
 * @apiGroup Permissions
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Permission ID.
 * @apiParam embed Activate Embedding.
 * @apiParamExample  {json} Request sample:
 *	/permissions/1?embed
 * @apiSuccess {Number} id Permission ID
 * @apiSuccess {String} permission User Permission
 * @apiSuccess {String} description Permission Description
 * @apiSuccess {Date} created_at Permission Register date
 * @apiSuccess {Date} updated_at Permission Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  {
 *     "id": 1,
 *     "permission": "create-roles",
 *     "description": "Permite criar papeis no sistema",
 *     "created_at": "2020-07-28 18:40:49",
 *     "updated_at": "2020-07-28 18:40:49"
 *   }
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.get('permissions/:id', 'PermissionController.show').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);

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
 *@apiErrorExample {json} Validation Error: Title Required
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
 *@apiErrorExample {json} Validation Error: Description Required
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
 *@apiErrorExample {json} Validation Error: Patent Required
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
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
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

Route.post('technologies/:id/users', 'TechnologyController.associateTechnologyUser').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
Route.put('technologies/:id', 'TechnologyController.update').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
Route.delete('technologies/:id', 'TechnologyController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_TECHNOLOGIES, permissions.DELETE_TECHNOLOGY]),
]);
Route.delete(
	'technologies/:id/users/:idUser',
	'TechnologyController.deleteTechnologyUser',
).middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
]);
Route.delete(
	'technologies/:id/terms/:term',
	'TechnologyController.deleteTechnologyTerm',
).middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
	'handleParams',
]);

Route.get('technologies', 'TechnologyController.index').middleware(['handleParams']);
Route.get('technologies/:id', 'TechnologyController.show').middleware(['handleParams']);

Route.get('technologies/:id/terms', 'TechnologyController.showTechnologyTerms').middleware([
	'auth',
	'handleParams',
]);

Route.get('technologies/:id/users', 'TechnologyController.showTechnologyUsers').middleware([
	'auth',
]);

Route.get('technologies/:id/reviews', 'TechnologyController.showTechnologyReviews').middleware([
	'handleParams',
]);

/** Technology Review routes */
Route.get('technology_reviews', 'TechnologyReviewController.index').middleware(['handleParams']);
Route.post('reviews', 'TechnologyReviewController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TECHNOLOGY_REVIEWS])])
	.validator('StoreTechnologyReview');
Route.get('technology_reviews/:id', 'TechnologyReviewController.show').middleware(['handleParams']);
Route.put('reviews/:id', 'TechnologyReviewController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([
			permissions.UPDATE_TECHNOLOGY_REVIEW,
			permissions.UPDATE_TECHNOLOGY_REVIEWS,
		]),
	])
	.validator('UpdateTechnologyReview');
Route.delete('reviews/:id', 'TechnologyReviewController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);

/** Taxonomy routes */
Route.group(() => {
	Route.post('taxonomies', 'TaxonomyController.store').validator('StoreTaxonomy');
	Route.put('taxonomies/:id', 'TaxonomyController.update').validator('UpdateTaxonomy');
	Route.delete('taxonomies/:id', 'TaxonomyController.destroy');
}).middleware(['auth', getMiddlewareRoles([roles.ADMIN])]);

Route.get('taxonomies', 'TaxonomyController.index').middleware(['handleParams']);
Route.get('taxonomies/:id', 'TaxonomyController.show').middleware(['handleParams']);
Route.get('taxonomies/:id/terms', 'TaxonomyController.showTerms').middleware(['handleParams']);

/** Term routes */
Route.post('terms', 'TermController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TERMS])])
	.validator('StoreTerm');
Route.put('terms/:id', 'TermController.update')
	.middleware(['auth', getMiddlewarePermissions([permissions.UPDATE_TERMS])])
	.validator('UpdateTerm');
Route.put('terms/:id/meta', 'TermController.updateMeta')
	.middleware(['auth', getMiddlewarePermissions([permissions.UPDATE_TERMS])])
	.validator('UpdateMeta');
Route.delete('terms/:id', 'TermController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_TERMS]),
]);
Route.get('terms', 'TermController.index').middleware(['handleParams']);
Route.get('terms/:id', 'TermController.show').middleware(['handleParams']);

/** User Routes */
Route.get('users', 'UserController.index').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_USERS]),
	'handleParams',
]);
Route.post('users', 'UserController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_USERS])])
	.validator('User');
Route.get('users/:id', 'UserController.show').middleware([
	'auth',
	getMiddlewarePermissions([permissions.VIEW_USERS, permissions.VIEW_USER]),
	'handleParams',
]);

Route.put('users/:id', 'UserController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_USER, permissions.UPDATE_USERS]),
	])
	.validator('UpdateUser');

Route.post('users/:id/permissions', 'UserController.associatePermissionUser').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
Route.delete('users/:id', 'UserController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);

Route.get('/user/me', 'AuthController.getMe').middleware(['auth']);
Route.put('/user/change-password', 'UserController.changePassword')
	.middleware(['auth'])
	.validator('ChangeUserPassword');

Route.post('/user/change-email', 'UserController.changeEmail')
	.middleware(['auth'])
	.validator('ChangeUserEmail');

Route.put('/user/change-email', 'UserController.confirmNewEmail').validator('ConfirmNewEmail');

/** BookMarks Routes */
Route.post('bookmarks', 'UserBookmarkController.store')
	.middleware(['auth'])
	.validator('StoreUserBookmark');
Route.get('/user/:id/bookmarks', 'UserBookmarkController.show').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_BOOKMARK, permissions.LIST_BOOKMARKS]),
	'handleParams',
]);
Route.get('user_bookmarks', 'UserBookmarkController.index').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_BOOKMARKS]),
	'handleParams',
]);
Route.delete('/user/:id/bookmarks', 'UserBookmarkController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_BOOKMARK, permissions.DELETE_BOOKMARKS]),
]);

/** TechnologyCosts Routes */
Route.get('/technologies/:id/costs', 'TechnologyCostController.show').middleware([
	'handleParams:technology_costs',
]);
Route.put('/technologies/:id/costs', 'TechnologyCostController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
	])
	.validator('UpdateTechnologyCost');

Route.get('/', 'AppController.index');
