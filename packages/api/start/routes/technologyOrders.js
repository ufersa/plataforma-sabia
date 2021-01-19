/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const {
	getMiddlewareRoles,
	getMiddlewarePermissions,
	permissions,
	roles,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/**
 * @api {post} /technologies/:id/orders Makes a technology order
 * @apiGroup Technology Orders
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
Route.post('technologies/:id/orders', 'TechnologyOrderController.store')
	.middleware(['auth', 'registrationCompleted:check_personal_data'])
	.validator('CreateOrder');

/**
 * @api {get} /technologies/:id/orders Gets technology orders
 * @apiGroup Technology Orders
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 *	/technologies/2/orders
 * @apiSuccess {Object[]} Orders Related order
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
 * [
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
 * ]
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.get('technologies/:id/orders', 'TechnologyOrderController.showTechnologyOrders').middleware([
	'auth',
	'handleParams',
]);

/**
 * @api {put} /orders/:id/update-status Updates Orders Status
 * @apiGroup Technology Orders
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Orders ID
 * @apiParam {String="open","finish","canceled"} status Orders Status
 * @apiParamExample  {json} Request sample:
 *	{
 *		"status":"finish"
 *	}
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
 *	 "status": "finish",
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
 * @apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 * @apiErrorExample {json} Resource Order was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Order was not found"
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
 *       				"message": "The status should fall within defined values of (open,finish,canceled).",
 *       				"field": "status",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.put('orders/:id/update-status', 'TechnologyOrderController.updateStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdateOrderStatus');

/**
 * @api {get} /orders Gets orders
 * @apiGroup Technology Orders
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Query Param) {boolean} fromCurrentUser returns orders that the authenticated user did
 * @apiParamExample  {json} Request sample:
 *	/orders
 * @apiSuccess {Object[]} Orders Related order
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
 * [
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
 * ]
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.get('orders', 'TechnologyOrderController.index').middleware(['auth', 'handleParams']);

/**
 * @api {get} /orders/:id Gets order
 * @apiGroup Technology Orders
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 *	/orders/1
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.get('orders/:id', 'TechnologyOrderController.show').middleware(['auth', 'handleParams']);

/**
 * @api {put} /orders/:id/close Closes a technology order
 * @apiGroup Technology Orders
 * @apiPermission CLOSE_TECHNOLOGY_ORDER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory TechnologyOrder ID
 * @apiParam {Number} quantity Technology quantity acquired
 * @apiParam {Number} unit_value Unit value traded
 * @apiParamExample  {json} Request sample:
 *	/orders/1/close
 * @apiSuccess {Number} id Order ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Number} user_id Buyer User ID.
 * @apiSuccess {Number} quantity Technology units acquired.
 * @apiSuccess {String} use Technology use.
 * @apiSuccess {String} funding Technology funding.
 * @apiSuccess {String} status Order status.
 * @apiSuccess {String} comment Optional comment.
 * @apiSuccess {String} cancellation_reason Optional cancellation reason (used in cancelling operation).
 * @apiSuccess {String} unit_value Unit Value Traded
 * @apiSuccess {Date} created_at Order Register date
 * @apiSuccess {Date} updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 1,
 *	 "user_id": 18,
 *	  "technology_id": 3,
 *	  "quantity": 10,
 *	  "status": "closed",
 *	  "use": "private",
 *	  "funding": "no_need_funding",
 *	  "comment": "test",
 *	  "cancellation_reason": null,
 *	  "unit_value": 150000,
 *	  "created_at": "2020-11-18 12:38:38",
 *	  "updated_at": "2020-11-18 14:24:51"
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
 * @apiErrorExample {json} Status no allowed for operation close order
 *  HTTP/1.1 400 Bad Request
 *	{
 *	 "error": {
 *	   "error_code": "STATUS_NO_ALLOWED_FOR_OPERATION",
 *	   "message": "It's no allowed to perform an operation: CLOSE ORDER with this status: closed"
 *	 }
 *	}
 * @apiErrorExample {json} Resource TechnologyOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyOrder was not found"
 * 			}
 *		}
 */
Route.put('orders/:id/close', 'TechnologyOrderController.closeOrder')
	.middleware(['auth', getMiddlewarePermissions([permissions.CLOSE_TECHNOLOGY_ORDER])])
	.validator('CloseOrder');
/**
 * @api {put} /orders/:id/cancel Cancels a technology order
 * @apiGroup Technology Orders
 * @apiPermission CANCEL_TECHNOLOGY_ORDER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory TechnologyOrder ID
 * @apiParam {String} [cancellation_reason] Optional Cancellation Reason
 * @apiParamExample  {json} Request sample:
 *	/orders/1/cancel
 * @apiSuccess {Number} id Order ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Number} user_id Buyer User ID.
 * @apiSuccess {Number} quantity Technology units acquired.
 * @apiSuccess {String} use Technology use.
 * @apiSuccess {String} funding Technology funding.
 * @apiSuccess {String} status Order status.
 * @apiSuccess {String} comment Optional comment.
 * @apiSuccess {String} cancellation_reason Optional cancellation reason
 * @apiSuccess {String} unit_value Unit Value Traded
 * @apiSuccess {Date} created_at Order Register date
 * @apiSuccess {Date} updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 1,
 *	 "user_id": 18,
 *	 "technology_id": 3,
 *	 "quantity": 10,
 *	 "status": "canceled",
 *	 "use": "private",
 *	 "funding": "no_need_funding",
 *	 "comment": "test",
 *	 "cancellation_reason": "cancellation reason",
 *	 "unit_value": 150000,
 *	 "created_at": "2020-11-18 12:38:38",
 *	 "updated_at": "2020-11-21 09:59:23"
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
 * @apiErrorExample {json} Status no allowed for operation cancel order
 *  HTTP/1.1 400 Bad Request
 *	{
 *	 "error": {
 *	   "error_code": "STATUS_NO_ALLOWED_FOR_OPERATION",
 *	   "message": "It's no allowed to perform an operation: CANCEL ORDER with this status: closed"
 *	 }
 *	}
 * @apiErrorExample {json} Resource TechnologyOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyOrder was not found"
 * 			}
 *		}
 */

Route.put('orders/:id/cancel', 'TechnologyOrderController.cancelOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.CANCEL_TECHNOLOGY_ORDER]),
]);
