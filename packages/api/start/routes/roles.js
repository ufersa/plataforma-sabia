/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

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
 * @api {put} /roles/:id Updates a Role
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
 *@apiErrorExample {json} Resource Role was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Role was not found"
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
 *@apiErrorExample {json} Resource Role was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Role was not found"
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
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource Role was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Role was not found"
 * 			}
 *		}
 */
Route.get('roles/:id', 'RoleController.show').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
