/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

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
 *@apiErrorExample {json} Resource Permission was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Permission was not found"
 * 			}
 *		}
 */
Route.put('permissions/:id', 'PermissionController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdatePermission');
/**
 * @api {delete} /permissions/:id Deletes a Permission
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
 *@apiErrorExample {json} Resource Permission was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Permission was not found"
 * 			}
 *		}
 */
Route.delete('permissions/:id', 'PermissionController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {get} /permissions Lists All Permissions
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
 * @api {get} /permissions/:id Gets a single Permission
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
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource Permission was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Permission was not found"
 * 			}
 *		}
 */
Route.get('permissions/:id', 'PermissionController.show').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
