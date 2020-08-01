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
 *		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExLCJpYXQiOjE1OTU5NzI1NDV9.CTXca-jULVhpAS1fWxxNGK0YtkrIgXLHyLcB640BU6k",
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
 *		"token": "ac27101537de02d1e7c7d5f237ee1dae5UpZQu5oMNPsIgxskxKvjsI06UZTlvruHlxD0+DckTY=",
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
 *		"token": "092192e05b83644d64349cf30d7333dcHot71hwmLysLKCj4yQCLxC0irF2R7jw6sRz0WfNzybI=",
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
 *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1OTU5NzI4MTd9.ESghaaSk80j9XEo2A-9fFUS01HblWHxDf2VLnu64oJ4"
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
 *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1OTU5NzI4MTd9.ESghaaSk80j9XEo2A-9fFUS01HblWHxDf2VLnu64oJ4"
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
 *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1OTU5NzI4MTd9.ESghaaSk80j9XEo2A-9fFUS01HblWHxDf2VLnu64oJ4"
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
 *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1OTU5NzI4MTd9.ESghaaSk80j9XEo2A-9fFUS01HblWHxDf2VLnu64oJ4"
 *    }
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
 *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1OTU5NzI4MTd9.ESghaaSk80j9XEo2A-9fFUS01HblWHxDf2VLnu64oJ4"
 *    }
 * @apiParam {Number} id Mandatory Role ID.
 * @apiParamExample  {json} Request sample:
 *	/roles/8
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
Route.post('permissions', 'PermissionController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('StorePermission');
Route.put('permissions/:id', 'PermissionController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdatePermission');
Route.delete('permissions/:id', 'PermissionController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
Route.get('permissions', 'PermissionController.index').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
Route.get('permissions/:id', 'PermissionController.show').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);

/** Technology routes */
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

Route.put('/user/change-email', 'UserController.confirmNewEmail')
	.middleware(['auth'])
	.validator('ConfirmNewEmail');

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
