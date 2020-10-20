/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Disclaimer Routes */
/**
 * @api {post} /disclaimers Creates a new Disclaimer
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} role Mandatory Unique Disclaimer.
 * @apiParam {String} description Mandatory Disclaimer Description.
 * @apiParam {Number[]} [permissions] Optional Permission ID array.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"role": "USER_ROLE",
 *		"description": "User Disclaimer Description"
 *		"permissions": [1,2,3,4,5]
 *    }
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {String} role User Disclaimer
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccess {Object[]} permissions List of role permissions.
 * @apiSuccess {Number} permissions.id Permssion ID.
 * @apiSuccess {Object} permissions.pivot Disclaimer-Permssion relashionship.
 * @apiSuccess {Number} permissions.pivot.permission_id Permssion ID in pivot table.
 * @apiSuccess {Number} permissions.pivot.role_id Disclaimer ID in pivot table.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "User Disclaimer Description",
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
 *@apiErrorExample {json} Validation Error: Unique Disclaimer
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
 *@apiErrorExample {json} Validation Error: Disclaimer Required
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
Route.post('disclaimers', 'DisclaimerController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('Disclaimer');
/**
 * @api {put} /disclaimers/:id Updates a Disclaimer
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Disclaimer ID.
 * @apiParam {String} description Optional Disclaimer Description.
 * @apiParam {Number[]} [permissions] Optional Permission ID array.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"description": "Updated User Disclaimer Description"
 *    }
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {String} role User Disclaimer
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "Updated User Disclaimer Description",
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
 *@apiErrorExample {json} Resource Disclaimer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Disclaimer was not found"
 * 			}
 *		}
 */
Route.put('disclaimers/:id', 'DisclaimerController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('Disclaimer');
/**
 * @api {delete} /disclaimers/:id Deletes a Disclaimer
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Disclaimer ID.
 * @apiParamExample  {json} Request sample:
 *	/disclaimers/1
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
 *@apiErrorExample {json} Resource Disclaimer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Disclaimer was not found"
 * 			}
 *		}
 */
Route.delete('disclaimers/:id', 'DisclaimerController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
/**
 * @api {delete} /disclaimers Delete multiple Disclaimers
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} ids List of disclaimers IDs.
 * @apiParamExample  {json} Request sample:
 *	/disclaimers?ids=1,2,3
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
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
Route.delete('disclaimers/', 'DisclaimerController.destroyMany')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN]), 'handleParams'])
	.validator('Disclaimer');
/**
 * @api {get} /disclaimers Lists All Disclaimers
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiSuccess {Object[]} disclaimers Disclaimers Collection
 * @apiSuccess {Number} disclaimers.id Disclaimer ID
 * @apiSuccess {String} disclaimers.role User Disclaimer
 * @apiSuccess {String} disclaimers.description Disclaimer Description
 * @apiSuccess {Date} disclaimers.created_at Disclaimer Register date
 * @apiSuccess {Date} disclaimers.updated_at Disclaimer Update date
 * @apiSuccess {Object[]} disclaimers.permissions List of role permissions.
 * @apiSuccess {Number} disclaimers.permissions.id Permssion ID.
 * @apiSuccess {Object} disclaimers.permissions.pivot Disclaimer-Permssion relashionship.
 * @apiSuccess {Number} disclaimers.permissions.pivot.permission_id Permssion ID in pivot table.
 * @apiSuccess {Number} disclaimers.permissions.pivot.role_id Disclaimer ID in pivot table.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "User Disclaimer Description",
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
Route.get('disclaimers', 'DisclaimerController.index').middleware(['auth', 'handleParams']);
/**
 * @api {get} /disclaimers/:id Gets a single Disclaimer
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Disclaimer ID.
 * @apiParam embed Activate Embedding.
 * @apiParamExample  {json} Request sample:
 *	/disclaimers/8?embed
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {String} role User Disclaimer
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccess {Object[]} permissions List of role permissions.
 * @apiSuccess {Number} permissions.id Permssion ID.
 * @apiSuccess {Object} permissions.pivot Disclaimer-Permssion relashionship.
 * @apiSuccess {Number} permissions.pivot.permission_id Permssion ID in pivot table.
 * @apiSuccess {Number} permissions.pivot.role_id Disclaimer ID in pivot table.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "id": 8,
 *   "role": "USER_ROLE",
 *   "description": "User Disclaimer Description",
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
 *@apiErrorExample {json} Resource Disclaimer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Disclaimer was not found"
 * 			}
 *		}
 */
Route.get('disclaimers/:id', 'DisclaimerController.show').middleware(['auth', 'handleParams']);
