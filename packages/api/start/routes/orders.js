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
 * @apiGroup Orders
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
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Registration Uncompleted
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "REGISTRATION_UNCOMPLETED",
 *   			"message":"You need to complete your registration to access this resource. Uncompleted Fields: {Uncompleted fields}"
 * 			}
 *		}
 */
Route.post('technologies/:id/orders', 'OrderController.storeTechnologyOrder')
	.middleware(['auth', 'registrationCompleted:check_personal_data'])
	.validator('CreateOrder');

/**
 * @api {post} /services/orders Creates Service Orders
 * @apiDescription Any User can request multiple service orders
 * @apiGroup Orders
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} [comment] Optional comment.
 * @apiParam {Object[]} services Mandatory service array.
 * @apiParam {Number} services.service_id Mandatory service id.
 * @apiParam {Number} services.quantity Mandatory service order quantity.
 * @apiParamExample  {json} Request sample:
 *	{
 *	 	"comment": "Test comment",
 *		"services":[
 *			{
 *						"service_id": 7,
 *						"quantity": 20
 *			},
 *			{
 *						"service_id": 8,
 *						"quantity": 15
 *			}
 *
 *		]
 *	}
 * @apiSuccess {Object[]} serviceOrders collection.
 * @apiSuccess {Number} serviceOrders.id ServiceOrder ID.
 * @apiSuccess {Number} serviceOrders.quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} serviceOrders.status Service Order Status.
 * @apiSuccess {Number} serviceOrders.user_id ServiceOrder user requester.
 * @apiSuccess {Number} serviceOrders.service_id ServiceOrder service related.
 * @apiSuccess {String} serviceOrders.comment ServiceOrder comment.
 * @apiSuccess {Date} serviceOrders.created_at ServiceOrder Register date
 * @apiSuccess {Date} serviceOrders.updated_at ServiceOrder Update date
 * @apiSuccess {Number} serviceOrders.service related service.
 * @apiSuccess {Number} serviceOrders.service.id service ID.
 * @apiSuccess {String} serviceOrders.service.name Service name.
 * @apiSuccess {String} serviceOrders.service.description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} serviceOrders.service.type Service type.
 * @apiSuccess {Number} serviceOrders.service.price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} serviceOrders.service.measure_unit Service Measure Unit.
 * @apiSuccess {Number} serviceOrders.service.user_id Service Responsible User ID.
 * @apiSuccess {Date} serviceOrders.service.created_at Service Register date
 * @apiSuccess {Date} serviceOrders.service.updated_at Service Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "service_id": 7,
 *	   "quantity": 20,
 *	   "user_id": 28,
 *	   "status": "requested",
 *	   "comment": "test comment",
 *	   "created_at": "2021-01-14 14:35:47",
 *	   "updated_at": "2021-01-14 14:35:47",
 *	   "id": 19,
 *	   "service": {
 *	     "id": 7,
 *	     "name": "Water/earth test service",
 *	     "description": "Water/earth analysis",
 *	     "type": "analysis",
 *	     "price": 1000,
 *	     "measure_unit": "hour",
 *	     "user_id": 11,
 *	     "created_at": "2021-01-14 13:46:29",
 *	     "updated_at": "2021-01-14 13:46:29"
 *	   }
 *	 },
 *	 {
 *	   "service_id": 8,
 *	   "quantity": 15,
 *	   "user_id": 28,
 *	   "status": "requested",
 *	   "comment": "test comment",
 *	   "created_at": "2021-01-14 14:35:47",
 *	   "updated_at": "2021-01-14 14:35:47",
 *	   "id": 20,
 *	   "service": {
 *	     "id": 8,
 *	     "name": "Water/earth test service updated",
 *	     "description": "Water/earth analysis",
 *	     "type": "analysis",
 *	     "price": 1000,
 *	     "measure_unit": "hour",
 *	     "user_id": 11,
 *	     "created_at": "2021-01-14 13:54:25",
 *	     "updated_at": "2021-01-14 14:12:36"
 *	   }
 *	 }
 *	]
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: services Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "services is required.",
 *                		"field": "services",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The services.*.service_id required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The services.0.service_id is required",
 *                		"field": "services.*.service_id",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The services.*.service_id should exist in services
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The services.*.service_id should exist in services",
 *                		"field": "services.*.service_id",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The services.*.quantity required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The services.0.quantity is required",
 *                		"field": "services.*.quantity",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Registration Uncompleted
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "REGISTRATION_UNCOMPLETED",
 *   			"message":"You need to complete your registration to access this resource. Uncompleted Fields: {Uncompleted fields}"
 * 			}
 *		}
 */
Route.post('services/orders', 'OrderController.storeServiceOrder')
	.middleware(['auth', 'registrationCompleted:check_personal_data'])
	.validator('StoreServiceOrder');
/**
 * @api {post} /services/orders/:id/reviews Creates a new Service Order Review
 * @apiDescription User that requested service order can create a review
 * @apiGroup Orders
 * @apiPermission CREATE_SERVICE_ORDER_REVIEW
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory ServiceOrder ID for review.
 * @apiParam {String} content Mandatory ServiceOrderReview Content.
 * @apiParam {Number{1-5}} rating Mandatory ServiceOrderReview Rating.
 * @apiParam {String[]} positive Mandatory ServiceOrderReview Positives.
 * @apiParam {String[]} negative Mandatory ServiceOrderReview Negatives.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"content":"A test content for review",
 *		"rating":5,
 *		"positive":["positive 01","positive 02"],
 *		"negative":["negative 01","negative 02"],
 *	}
 * @apiSuccess {Number} id ServiceOrderReview ID
 * @apiSuccess {Number} user_id User User ID
 * @apiSuccess {Number} service_order_id ServiceOrderReview ID
 * @apiSuccess {String} content ServiceOrderReview Rating.
 * @apiSuccess {Number{1-5}} rating ServiceOrderReview Rating.
 * @apiSuccess {String[]} positive ServiceOrderReview Positives.
 * @apiSuccess {String[]} negative ServiceOrderReview Negatives.
 * @apiSuccess {Date} created_at ServiceOrderReview Register date
 * @apiSuccess {Date} updated_at ServiceOrderReview Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "content": "A test content for review",
 *	 "rating": 5,
 *	 "positive": "[\"positive 01\",\"positive 02\"]",
 *	 "negative": "[\"negative 01\",\"negative 02\"]",
 *	 "created_at": "2020-08-19 19:21:26",
 *	 "updated_at": "2020-08-19 19:21:26",
 *	 "id": 11,
 *	 "service_order_id": 1,
 *	 "user_id": 1
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Content Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The content is required.",
 *       				"field": "content",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Rating Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The rating is required.",
 *       				"field": "rating",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Rating Range
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The rating should be between 0 and 6.",
 *       				"field": "rating",
 *       				"validation": "range"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Positive Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The positive is required.",
 *       				"field": "positive",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Negative Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The negative is required.",
 *       				"field": "negative",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
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
Route.post('services/orders/:id/reviews', 'OrderController.storeServiceOrderReview')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_SERVICE_ORDER_REVIEW])])
	.validator('StoreServiceOrderReview');
/**
 * @api {get} /technologies/:id/orders Gets technology orders
 * @apiGroup Orders
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
Route.get('technologies/:id/orders', 'OrderController.showTechnologyOrders').middleware([
	'auth',
	'handleParams',
]);

/**
 * @api {get} /services/orders Lists user responsible service orders
 * @apiGroup Orders
 * @apiUse Params
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Object[]} serviceOrders collection.
 * @apiSuccess {Number} serviceOrders.id ServiceOrder ID.
 * @apiSuccess {Number} serviceOrders.quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} serviceOrders.status Service Order Status.
 * @apiSuccess {Number} serviceOrders.user_id ServiceOrder user requester.
 * @apiSuccess {Number} serviceOrders.service_id ServiceOrder service related.
 * @apiSuccess {Date} serviceOrders.created_at ServiceOrder Register date
 * @apiSuccess {Date} serviceOrders.updated_at ServiceOrder Update date
 * @apiSuccess {Number} serviceOrders.service related service.
 * @apiSuccess {Number} serviceOrders.service.id service ID.
 * @apiSuccess {String} serviceOrders.service.name Service name.
 * @apiSuccess {String} serviceOrders.service.description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} serviceOrders.service.type Service type.
 * @apiSuccess {Number} serviceOrders.service.price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} serviceOrders.service.measure_unit Service Measure Unit.
 * @apiSuccess {Number} serviceOrders.service.user_id Service Responsible User ID.
 * @apiSuccess {Date} serviceOrders.service.created_at Service Register date
 * @apiSuccess {Date} serviceOrders.service.updated_at Service Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 2,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "performed",
 *	   "created_at": "2021-01-04 19:52:52",
 *	   "updated_at": "2021-01-11 16:04:37",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 },
 *	 {
 *	   "id": 3,
 *	   "user_id": 11,
 *	   "service_id": 3,
 *	   "quantity": 15,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 19:52:52",
 *	   "updated_at": "2021-01-04 19:52:52",
 *	   "service": {
 *	     "id": 3,
 *	     "name": "design",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 5000,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:55:01",
 *	     "updated_at": "2021-01-03 08:55:01"
 *	   }
 *	 },
 *	 {
 *	   "id": 4,
 *	   "user_id": 11,
 *	   "service_id": 1,
 *	   "quantity": 10,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:09:50",
 *	   "updated_at": "2021-01-04 20:09:50",
 *	   "service": {
 *	     "id": 1,
 *	     "name": "Wonder service",
 *	     "description": "wonderfull service by alex",
 *	     "type": "labor",
 *	     "price": 50,
 *	     "measure_unit": "hour",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-02 19:48:00",
 *	     "updated_at": "2021-01-02 19:48:00"
 *	   }
 *	 },
 *	 {
 *	   "id": 5,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:09:50",
 *	   "updated_at": "2021-01-04 20:09:50",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 },
 *	 {
 *	   "id": 6,
 *	   "user_id": 11,
 *	   "service_id": 3,
 *	   "quantity": 15,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:09:50",
 *	   "updated_at": "2021-01-04 20:09:50",
 *	   "service": {
 *	     "id": 3,
 *	     "name": "design",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 5000,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:55:01",
 *	     "updated_at": "2021-01-03 08:55:01"
 *	   }
 *	 },
 *	 {
 *	   "id": 7,
 *	   "user_id": 11,
 *	   "service_id": 1,
 *	   "quantity": 10,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:32:50",
 *	   "updated_at": "2021-01-04 20:32:50",
 *	   "service": {
 *	     "id": 1,
 *	     "name": "Wonder service",
 *	     "description": "wonderfull service by alex",
 *	     "type": "labor",
 *	     "price": 50,
 *	     "measure_unit": "hour",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-02 19:48:00",
 *	     "updated_at": "2021-01-02 19:48:00"
 *	   }
 *	 },
 *	 {
 *	   "id": 8,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:32:50",
 *	   "updated_at": "2021-01-04 20:32:50",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 },
 *	 {
 *	   "id": 9,
 *	   "user_id": 11,
 *	   "service_id": 3,
 *	   "quantity": 15,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:32:50",
 *	   "updated_at": "2021-01-04 20:32:50",
 *	   "service": {
 *	     "id": 3,
 *	     "name": "design",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 5000,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:55:01",
 *	     "updated_at": "2021-01-03 08:55:01"
 *	   }
 *	 },
 *	 {
 *	   "id": 10,
 *	   "user_id": 11,
 *	   "service_id": 1,
 *	   "quantity": 10,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:34:32",
 *	   "updated_at": "2021-01-04 20:34:32",
 *	   "service": {
 *	     "id": 1,
 *	     "name": "Wonder service",
 *	     "description": "wonderfull service by alex",
 *	     "type": "labor",
 *	     "price": 50,
 *	     "measure_unit": "hour",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-02 19:48:00",
 *	     "updated_at": "2021-01-02 19:48:00"
 *	   }
 *	 },
 *	 {
 *	   "id": 11,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:34:32",
 *	   "updated_at": "2021-01-04 20:34:32",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 }
 * ]
 * @apiUse AuthError
 */
Route.get('services/orders', 'OrderController.showServiceOrders').middleware([
	'auth',
	'handleParams',
]);

/**
 * @api {get} /services/orders/reviews Lists user responsible service order reviews
 * @apiGroup Orders
 * @apiUse Params
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Object[]} serviceOrderReviews collection.
 * @apiSuccess {Number} serviceOrderReviews.id ServiceOrderReview ID
 * @apiSuccess {Number} serviceOrderReviews.user_id User User ID
 * @apiSuccess {Number} serviceOrderReviews.service_order_id ServiceOrderReview ID
 * @apiSuccess {String} serviceOrderReviews.content ServiceOrderReview Rating.
 * @apiSuccess {Number{1-5}} serviceOrderReviews.rating ServiceOrderReview Rating.
 * @apiSuccess {String[]} serviceOrderReviews.positive ServiceOrderReview Positives.
 * @apiSuccess {String[]} serviceOrderReviews.negative ServiceOrderReview Negatives.
 * @apiSuccess {Date} serviceOrderReviews.created_at ServiceOrderReview Register date
 * @apiSuccess {Date} serviceOrderReviews.updated_at ServiceOrderReview Update date
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder ServiceOrder object
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.id ServiceOrder ID.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} serviceOrderReviews.serviceOrder.status Service Order Status.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.user_id ServiceOrder user requester.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder..service_id ServiceOrder service related.
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder.created_at ServiceOrder Register date
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder..updated_at ServiceOrder Update date
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service related service.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service.id service ID.
 * @apiSuccess {String} serviceOrderReviews.serviceOrder.service.name Service name.
 * @apiSuccess {String} serviceOrderReviews.serviceOrder.service.description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} serviceOrderReviews.serviceOrder.service.type Service type.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service.price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} serviceOrderReviews.serviceOrder.service.measure_unit Service Measure Unit.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service.user_id Service Responsible User ID.
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder.service.created_at Service Register date
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder.service.updated_at Service Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *[
 * {
 *   "id": 2,
 *   "user_id": 11,
 *   "service_order_id": 2,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:33",
 *   "updated_at": "2021-01-12 15:43:33",
 *   "serviceOrder": {
 *     "id": 2,
 *     "user_id": 11,
 *     "service_id": 2,
 *     "quantity": 20,
 *     "status": "performed",
 *     "created_at": "2021-01-04 19:52:52",
 *     "updated_at": "2021-01-11 16:04:37",
 *     "service": {
 *       "id": 2,
 *       "name": "full service",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 2500,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:54:28",
 *       "updated_at": "2021-01-03 08:54:28"
 *     }
 *   }
 * },
 * {
 *   "id": 3,
 *   "user_id": 11,
 *   "service_order_id": 3,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:37",
 *   "updated_at": "2021-01-12 15:43:37",
 *   "serviceOrder": {
 *     "id": 3,
 *     "user_id": 11,
 *     "service_id": 3,
 *     "quantity": 15,
 *     "status": "requested",
 *     "created_at": "2021-01-04 19:52:52",
 *     "updated_at": "2021-01-04 19:52:52",
 *     "service": {
 *       "id": 3,
 *       "name": "design",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 5000,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:55:01",
 *       "updated_at": "2021-01-03 08:55:01"
 *     }
 *   }
 * },
 * {
 *   "id": 4,
 *   "user_id": 11,
 *   "service_order_id": 4,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:41",
 *   "updated_at": "2021-01-12 15:43:41",
 *   "serviceOrder": {
 *     "id": 4,
 *     "user_id": 11,
 *     "service_id": 1,
 *     "quantity": 10,
 *     "status": "requested",
 *     "created_at": "2021-01-04 20:09:50",
 *     "updated_at": "2021-01-04 20:09:50",
 *     "service": {
 *       "id": 1,
 *       "name": "Wonder service",
 *       "description": "wonderfull service by alex",
 *       "type": "labor",
 *       "price": 50,
 *       "measure_unit": "hour",
 *       "user_id": 28,
 *       "created_at": "2021-01-02 19:48:00",
 *       "updated_at": "2021-01-02 19:48:00"
 *     }
 *   }
 * },
 * {
 *   "id": 5,
 *   "user_id": 11,
 *   "service_order_id": 5,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:45",
 *   "updated_at": "2021-01-12 15:43:45",
 *   "serviceOrder": {
 *     "id": 5,
 *     "user_id": 11,
 *     "service_id": 2,
 *     "quantity": 20,
 *     "status": "requested",
 *     "created_at": "2021-01-04 20:09:50",
 *     "updated_at": "2021-01-04 20:09:50",
 *     "service": {
 *       "id": 2,
 *       "name": "full service",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 2500,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:54:28",
 *       "updated_at": "2021-01-03 08:54:28"
 *     }
 *   }
 * },
 * {
 *   "id": 6,
 *   "user_id": 11,
 *   "service_order_id": 6,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:50",
 *   "updated_at": "2021-01-12 15:43:50",
 *   "serviceOrder": {
 *     "id": 6,
 *     "user_id": 11,
 *     "service_id": 3,
 *     "quantity": 15,
 *     "status": "requested",
 *     "created_at": "2021-01-04 20:09:50",
 *     "updated_at": "2021-01-04 20:09:50",
 *     "service": {
 *       "id": 3,
 *       "name": "design",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 5000,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:55:01",
 *       "updated_at": "2021-01-03 08:55:01"
 *     }
 *   }
 * }
 *]
 * @apiUse AuthError
 */
Route.get('services/orders/reviews', 'OrderController.showServiceOrderReviews').middleware([
	'auth',
	'handleParams',
]);
/**
 * @api {put} /services/orders/:id Updates a Service Order
 * @apiDescription User that requested service order can update it
 * @apiGroup Orders
 * @apiPermission UPDATE_SERVICE_ORDER or UPDATE_SERVICE_ORDERS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service Order ID
 * @apiParam {String} [comment] Optional comment.
 * @apiParam {Number} [quantity] Optional service order quantity.
 * @apiParamExample  {json} Request sample:
 *	{
 *	 	"comment": "updated test comment"
 * 		"quantity":9
 *	}
 * @apiSuccess {Number} id ServiceOrder ID.
 * @apiSuccess {Number} quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} status Service Order Status.
 * @apiSuccess {Number} user_id ServiceOrder user requester.
 * @apiSuccess {Number} service_id ServiceOrder service related.
 * @apiSuccess {String} comment ServiceOrder comment.
 * @apiSuccess {Date} created_at ServiceOrder Register date
 * @apiSuccess {Date} updated_at ServiceOrder Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 19,
 *  "user_id": 28,
 *  "service_id": 7,
 *  "quantity": 9,
 *  "status": "requested",
 *  "comment": "updated test comment"
 *  "created_at": "2021-01-14 14:35:47",
 *  "updated_at": "2021-01-14 14:58:30"
 * }
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.put('services/orders/:id', 'OrderController.updateServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_SERVICE_ORDER, permissions.UPDATE_SERVICE_ORDERS]),
]);
/**
 * @api {put} /services/orders/reviews/:id Updates Service Order Review
 * @apiDescription User that create service order review can update it
 * @apiGroup Orders
 * @apiPermission UPDATE_SERVICE_ORDER_REVIEW
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory ServiceOrderReview ID
 * @apiParam {String} [content] Optional ServiceOrderReview Content.
 * @apiParam {Number{1-5}} [rating] Optional ServiceOrderReview Rating.
 * @apiParam {String[]} [positive] Optional ServiceOrderReview Positives.
 * @apiParam {String[]} [negative] Optional ServiceOrderReview Negatives.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"content":"A test content for review updated",
 *		"rating":5,
 *		"positive":["positive 01","positive 02"],
 *		"negative":["negative 01","negative 02"],
 *	}
 * @apiSuccess {Number} id ServiceOrderReview ID
 * @apiSuccess {Number} user_id User User ID
 * @apiSuccess {Number} service_order_id ServiceOrderReview ID
 * @apiSuccess {String} content ServiceOrderReview Rating.
 * @apiSuccess {Number{1-5}} rating ServiceOrderReview Rating.
 * @apiSuccess {String[]} positive ServiceOrderReview Positives.
 * @apiSuccess {String[]} negative ServiceOrderReview Negatives.
 * @apiSuccess {Date} created_at ServiceOrderReview Register date
 * @apiSuccess {Date} updated_at ServiceOrderReview Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "content": "A test content for review updated",
 *	 "rating": 5,
 *	 "positive": "[\"positive 01\",\"positive 02\"]",
 *	 "negative": "[\"negative 01\",\"negative 02\"]",
 *	 "created_at": "2020-08-19 19:21:26",
 *	 "updated_at": "2020-08-19 19:21:26",
 *	 "id": 11,
 *	 "service_order_id": 1,
 *	 "user_id": 1
 *	}
 *@apiUse AuthError
 * @apiErrorExample {json} Resource ServiceOrderReview was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrderReview was not found"
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
Route.put('services/orders/reviews/:id', 'OrderController.updateServiceOrderReview').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_SERVICE_ORDER_REVIEW]),
]);
/**
 * @api {put} /orders/:id/update-status Updates Orders Status
 * @apiGroup Orders
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
Route.put('orders/:id/update-status', 'OrderController.updateStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdateOrderStatus');

/**
 * @api {get} /orders Gets orders
 * @apiDescription Lists orders in buyer and seller view. If fromCurrentUser == true => buyer view, otherwise seller.
 * @apiGroup Orders
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Query Param) {boolean} fromCurrentUser returns orders that the authenticated user did
 * @apiParamExample  {json} Request sample:
 *	/orders
 * @apiSuccess {Object[]} Orders Related order (can be TechnologyOrder or ServiceOrder)
 * @apiSuccess {Number} Orders.id Order ID
 * @apiSuccess {Number} Orders.user_id Buyer User
 * @apiSuccess {Number} Orders.technology_id Technology ID (Specific for technology order)
 * @apiSuccess {String} Orders.use Technology use. (Specific for technology order)
 * @apiSuccess {String} Orders.funding Technology funding. (Specific for technology order)
 * @apiSuccess {Number} Orders.service_id Service ID (Specific for service order)
 * @apiSuccess {Number} Orders.quantity Order quantity
 * @apiSuccess {String} Orders.status Order status
 * @apiSuccess {String} Orders.comment Order comment
 * @apiSuccess {String} Orders.type Tupe (T for technology or S for service)
 * @apiSuccess {Date} Orders.created_at Order Register date
 * @apiSuccess {Date} Orders.updated_at Order Update date
 * @apiSuccess {Object} Orders.technology Technology Object (Specific for technology order)
 * @apiSuccess {Object} Orders.service Service Object (Specific for service order)
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 1,
 *	   "user_id": 18,
 *	   "technology_id": 31,
 *	   "quantity": 64,
 *	   "status": "open",
 *	   "use": "enterprise",
 *	   "funding": "no_need_funding",
 *	   "comment": "Lodjil rep putakad pe reve katozo zegaab lezhok ina inacorsus gecmon taf bo imbekus. Guca wi upov uzi seasecil ruofhav wa tuvme bahziz filo narpizaf ko racmu lewone. Tekesla rorja bip cu aneta duprag mo ussud putbe rotijo co okujufoc rounejo imotila asrat. Zupic dobopgom fe peic zovfi okge udre fubicen gabo bukese muwuet lim pa ifgut opmerna ja.",
 *	   "cancellation_reason": null,
 *	   "unit_value": 535,
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "type": "T",
 *	   "technology": {
 *	     "id": 31,
 *	     "title": "Suzik hoc detigoj.",
 *	     "slug": "suzik-hoc-detigoj",
 *	     "description": "Beka dorufi ho ze gaus buni ze ho ditowavuh ru de pijaw wimipsep ete turur salsegmir. Zis le rektofi ut aginihi imeweem haramge reroda jetafowi li jad woze oru wib. Re aweobuuk ude endod ebdog sah romipir zarel caj ki kahfa ubaolfe sadunnov onavu.",
 *	     "private": 1,
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "patent": 1,
 *	     "patent_number": "WXN8TilO",
 *	     "primary_purpose": "Vujiz ab americ ipaufula duhasu ufuwivfep asojop cesgesto penajbi wumtuguj wi jethi pu. Mowlojsi nuv olac ol wuf nalrar ifohi dafut cep goafi ozu akeof uvobus akoak fek ca tobi tose. Muhipe wokarmaf parnaf kap vesbanipi govseprip surduciv pomugso se dikih hu ho. Ojuvut zinis uviok fenu tipral raewezem niz ekaetepur hevmu rab igalokep notihbi zepgu cajera. Sudite fij api rimapu va lupmomvi rutewo camlot amiwodi zuefizo utu wojtihtiz rojeku lu.",
 *	     "secondary_purpose": "Po fuwujiuci gawol tazehela dujipbo zekvi daz idogokuj gegpi jajvuv wedepari jocri reoheari. Ulu cejjaccuf matev supeda ufavenu sevel wo apta befgumpod igfunji ranaz infil remokeva wu wesvu. Zaf pilcicto ab ujiuw epi iba foj niiseir ce sogwujki eckaf arasvi hob fe rodbe seppap ah sophopiz. Diade ow akemira golabedo jammeul ombef doreg ucuhihe poapi iha zecvi bervafub ziumi zu wihiw jej sugcahev.",
 *	     "application_mode": "Nafep ruzaclen et ulamob eti hildah bo jeekra ir ta laf wipo. Seifgu socvu vulbud bav uw umcuku gerukhov giuhudew ce batatu faho bigujuj bal ju puztij. Sa umovuoj pedifuvij tokwe ew vew pop fesgoziw ucopurohu vi vat vu dawlub enazu goacil bi zikukid. Fa lulofina ecafar venkip ugaegoh fefwok wa po cew ijso remta eccov zela zezisa hacu. Suniet otebeaj ocfokdih ij iseposfug buwri san nuc iwojedgi bajfu pabolmob ipuov el aledu rumcuj mibhouc.",
 *	     "application_examples": "Itfo larihim maojuso den nidladfag ona hup nofgab ir vapozu uwheb na ita suoh getwoh fufah feg tumlu. Fo go zahsehwo pa vero ebu poti tetfelpiw wuj jezmopdaw ogirajo pevundav gub wafku koor ane muhe humcu. Ge oceliumo sac egkikuc foproep ujgu cihamihov te ukmujo ma itofe gamoleva hebahtiz ofilabig opewa dunalfo edu pa. Ew ihe gechac gamlo kuwevluh fergac roobe uj gikun pacvonu guru bo ze rutaha sop ivnap tutfib ukiadife. Zu oza ha deftedu wotbihto riwju canelisen fedak vuv heunein ze gawhu ci ecjaha juz ulakahew. Botzi wisdocag zezma cicum hileroci gij polajaso nupop le bavdu gilub buichup amujora. Fihsijhu ok no onu rigref how as wo wa emoam zuctuf ej ihoanaat wozu dogine.",
 *	     "installation_time": 646,
 *	     "solves_problem": "Ewo tiwu lo kowbit rupaloz inelegvo be cetpod rijveab ipe of omedajina jumgoka avol. Cof nulpounu mo ubuteas ifulopcij es uratitdez halfi unoru josale jaug alror zo isigeder ene jejwi zivjuduk. Nezufud ezbes awtouco jisakabo rehlul hauwe ocum ipe uwa sumefet iwe zumzid jawkur. Albow idhorku tahec wa izedow di putdeg wes hojev lijim gewok dahem vofoaw wa ke ce. Taduipi ke dol na pehi wittefpa puw nofak gelawe ravohe geke uh zor. Cu bokoku lefho enjiihu ha ola in rulmah luclilva jotorat ita upe. Kewi la nedvarup bepakri cu asucibeg ceud karzo ruihalo pej vejibeci hejwitpa anhi ona hejlulvo.",
 *	     "entailes_problem": "Camamu pi bigaban reho im vesofpuf tumwol nah homavogol mi walo heg. Tosa cok fo etoiki vev osweawe puv oji paw je fe ipvawdan rinu da. Ko zopiwedu pobcaked heb obogo mite ne aluzetal nohzani kota gilacut we rerugucu havkonvab nagi jehhicju.",
 *	     "requirements": "Wetu fajbas ilosu niuf varhato en tu epuzukja liamotaj ji ulore girug sop ucidoci ki bo ibicapih voivuhem. Lamut ife uwjoha uh fepiguno fubahtod ma va hotfuci gej fuvkepka cepbihsuc ecnef naibuvuk ovubaop wezbup jifog la. Dubko co opneika ilico tobusudan zuj suginu javutfe ugidis dowme ahaahaga hi fibpawi iz ofsubaj. Seduzor alzijvu nim fi bo lobga gak popta duk noji vazer gisomagu kod. Fuggaja ron puhneswaj hobde cuborev joidik cowherur tabisi holibus gepepifah ku uzahen jajfam rolut oro ho. Disihuk molagodu seh ap vamih vegcibu zo kusfu li bovafjiv hemjumus uvu vilob. Kupo nev sugruapi bup ira ori ib beclij ik funwol ofjot ge enluwlo dijomo zolak nefapomi tojiw poldu.",
 *	     "risks": "Omedahez lamowe viasuti juborli vuihla hahni kagi durkuddi omo wejpazvuc wi piplu kaf ijcoaga temcofzej rodtom. Het fajon necamej sezed mogmughaf ipo duucok voc duzjune fap zulrip jo tafu uma. Cuve fihun uvkah gezbati rudfufhaj za mogbaru wepu zawpouru ukrehu buk nad mor abwi kuvnikzev dotpafuw kivoge. Metusma tofso terat jo nutfat najin pu feozo vidgirij ned ditdetdub ehovop vub er man gito. Daninas faf tepesogo pocano kemtefboj fepmu sipsi dojuvmap tanleipa is zi huji duznoha tetjuh belo ti dum. Zereje zah bi pihpuvjuz tufu hufmag lo cujizpu nocuz nopuv sihdito ke abawuvo iz.",
 *	     "contribution": "Kavipgaw omi wurupru opalucwu mu olehupac guzogtec tojecre ug jehvemub wut oco ju hudita zaufke. Jozide guastim gij dopvadfof mavdoz ubeumeru unewav uru avevmu wultepe gu pofudzag suru diupuufi we madugul ba fuibhi. Fune habiehi ber romor navluclem bukrulofa jej pez ojugeg uti tuaba ejilik lih guthow ju gifo op.",
 *	     "status": "published",
 *	     "active": 1,
 *	     "created_at": "2021-02-11 18:47:26",
 *	     "updated_at": "2021-02-11 18:47:26",
 *	     "intellectual_property": 0,
 *	     "videos": [
 *	       {
 *	         "link": "https://www.youtube.com/watch?v=8h7p88oySWY",
 *	         "videoId": "8h7p88oySWY",
 *	         "provider": "Youtube",
 *	         "thumbnail": "http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg"
 *	       }
 *	     ],
 *	     "type": "material",
 *	     "public_domain": 0,
 *	     "knowledge_area_id": null,
 *	     "total_views": 0,
 *	     "objectID": "technology-31",
 *	     "users": [
 *	       {
 *	         "id": 23,
 *	         "email": "foeza@ujiwi.rw",
 *	         "status": "pending",
 *	         "first_name": "g(mAvf4gZW]K",
 *	         "last_name": "lB4]HnSB%bhYxh^T76",
 *	         "company": "KT@m1",
 *	         "zipcode": "85655",
 *	         "cpf": "51459489764",
 *	         "birth_date": "2074-01-18 19:19:01.831",
 *	         "phone_number": "08527142819",
 *	         "lattes_id": "79886719380",
 *	         "address": "w2h22m*rsQmvcb*P%",
 *	         "address2": "GM&[wmuiJX!UKS]P",
 *	         "district": "[4O0%175Pfr",
 *	         "city": "K*pwuzhf",
 *	         "state": "pvacB",
 *	         "country": "Zb&vT*78ggZe",
 *	         "role_id": 1,
 *	         "institution_id": null,
 *	         "created_at": "2021-02-11 18:47:27",
 *	         "updated_at": "2021-02-11 18:47:27",
 *	         "researcher": 0,
 *	         "full_name": "g(mAvf4gZW]K lB4]HnSB%bhYxh^T76",
 *	         "lattes_url": "http://lattes.cnpq.br/79886719380",
 *	         "pivot": {
 *	           "user_id": 23,
 *	           "technology_id": 31,
 *	           "role": "OWNER"
 *	         }
 *	       }
 *	     ],
 *	     "thumbnail": null
 *	   }
 *	 },
 *	 {
 *	   "id": 2,
 *	   "user_id": 19,
 *	   "technology_id": 32,
 *	   "quantity": 67,
 *	   "status": "open",
 *	   "use": "private",
 *	   "funding": "wants_funding",
 *	   "comment": "Demomco ferpi kofuhaf bedac job nievejiz her nulucot zacolena levucop wujibrid rirliil atiafa. Irra puw jauluco viere ejgune ladfu ce eb nulvoz mosdun ake cawgiv. Pambuebe utdep kockodwis onuzulde tocifi fir op nohpew pinpulij culki zuje gufcow ril hef biwrimic sar sosaho lim. Nopimnap reb nerno umusi defnu acjona agekir sijvohbu no woszemuf cous ep. Zazove hufwoesi ebolu ug nimdaz perode izlul govekoh dukose ril hohugidop pin nu fenhe wage savfihuci ra latih. Needsob hig azuupeva tu pow diksidco licetiw nupzede tila vivuwbej ibo jawi ludapwor wucac tabewva guccelbek.",
 *	   "cancellation_reason": null,
 *	   "unit_value": 275,
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "type": "T",
 *	   "technology": {
 *	     "id": 32,
 *	     "title": "Vuvjocko rotakow ohe.",
 *	     "slug": "vuvjocko-rotakow-ohe",
 *	     "description": "Da epe tenipo ja ace osi tu odju di vinwe webwit bop jucurwov ne unigufpiw sunam foz wo. Jefoz naz pu ot bocri tagum wahejo gaoh hine pi pamkuvuc rum wavigtu itpoci isani dusgeuvo. Bod ka nic wuz lama bamu tab cokezdus harubir azoci torac wat buwawew la nidgukba zevcegek bah. Ir gebanle raofraw torrifnu fijso purbemim nerhaw ki bat re ganto neutu uka usle obezafi jar kajirop mo. Isvec fet poohipo vokre cinzosan durmimub sanvug usepeme hi bigew ro it papahe fuj humavuima. Mad budu ed nuka ocdiviwo ja vupetviw nij zit dikbiru igtul hugo cupde nujroc. Lihezije vo ikisduk ut watilmav sofaudu vo wahpivcuf gindamdoc bufi ihu ihukeit.",
 *	     "private": 0,
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "patent": 0,
 *	     "patent_number": "ZGo1hS5k",
 *	     "primary_purpose": "Emujafec je angute nir lurwera bofuv geit zumab ub ku befifnom itivogke lezko zaodohoz. Gopjok pusu no wo hiro romlu ejuog ectek iliafuic nafej ejpev sisbati gu cum. Zangige vuguko di afoado jusalom pepgilcag uho obirazun riucokat dote bu ona ivetapeh er wu roh vadcoh ijgaoha.",
 *	     "secondary_purpose": "Umdop desibvov buv duapoh ifigooze vicjizeh uz jo lif sez rovokehe lutud mulvidoc ciblal bom ne. Mepabeti cuvdut lo cicmueko ommigkiv wahpeka kakivi cedirgil wez danuk fatjinga adalucdi couteot tirofir nadof muwivijuc aga. Husdozvuc hedziclif polusuk zoc gup gug solruwof kartuwav fatop vopuwoz surbo miwimok bal vo. Suoc isjilu ne lukwi kiwo uda sob kej ofki nuinihu gafefefed ke. Lidjef ezugab kod hufilwer cop baf lel havev iwfode kekiwil tivlir uw icu halwufud susodoime usi li. Huntome veez feizi ru lo kamfuw lubupo mi repala ekimom tezedas jifbak zohrez aziepila vekes hu. Ven jiajmip berohumo jab nebehpu ihdiko raari pupam balniv rowaji laszinek morco.",
 *	     "application_mode": "Dozoje wu izdem od tu fi mijehi lore lomona ot sulvuf fuwotucip lednaale da lodabda. Meamosu fa pi me pacju onade erimi uz gesec buofeum dubwa vopef mozama agica iziweepu vitlize hetupen bajwu. Utulimuz jec hur cilner pofkat azcuc luf piudika edik bikohaj sozibta botic cuh bajos uho reduk korup effo.",
 *	     "application_examples": "Lof wusisovuw unahomu ocko gapru ikcedwij bes ekitir wijeri rehzun wi id ow wazujdi met secaki bemfam elili. Sagasapo kigpo fejacbu hielumiv fooglum obcaf bod ij jerectaf el jimag ni tew ozebehu. Pozta viboji kaoliko upu nagelogu filpus uveulugep eklic ahizekza gijirha metel majza be sokotiw.",
 *	     "installation_time": 591,
 *	     "solves_problem": "Nem okofo ce nade emakupe utwofvu vapna edku tev fu junzowjo age. Sav akcolti si jipgi jil ef id gi zozorib nilledug za ha fot rug buru. Ketpivcob piw bob ge ka secow ubiwu ruimkad reozijud semebwu jade is. Ufgucih ivawina ew bunjopam ta jufbus sot ana mezuj funahbos dojwavif zurnefge gerog. Viajfor je tovvekzac ki cav toto uwiwetsu be ez mohkuj uthip ka. Panla otomuv wuv eheuw hup jej soege arjo peforipa suzvomobo vikwa huvajij duwzobjaw gik hob fes kal. Mon baj uwomafun fibgij fa jic ajuje fe emamef cul ziwi ikvinog hojup culi hos bif kevilsav javopodih.",
 *	     "entailes_problem": "Cit ico bivnebnuc vumi wih jow huzpuckef ta cenfupe lazbojneg ufagomo alefar vusaco ci acew. Silvo mabakfa mewpu oziekube upohegek mu onna ojuuwi iffoz ozihi joge efusesfem jo zol tirtaseh fi. Cavuzi li juucu nuweb kacojzir res mak ne remitvu raj asutov emekiluk louka. Dawo siroihu jilosi noudu socum goisfuw wim gapdafba lovozu erro fajdim cafupu. Idemo fewce ifmeabi pesciwwut ibbit maophoh dasuh nah gakov jazde wioci hor jo no.",
 *	     "requirements": "Zete mefi ru dughu kucocu fiig zigdugaf ucoul ceeh kochohi megub rowtiaci dafcieme cifze jeziboca. Hoazveh fien fudum ocgikfop ikede okesachu hicurav muuwa unumic eskocun ik canozazu og irpira siigdes wadgi zuti eci. Fugnew gup teto pa al kube wiguj makla icocice bud heve kon ti ono ciumu konvogleh. Hu nowpozzab ipaosi luclo birud ko kawnirda je nodotak zopov apo gin zanir sohniw zu sas bo. Rapeefe tikga bicaz lomkoz wiv canasu sic hir ehi lofesav fubgev ogijow onjal fihifki to. Femtad baun juvele vudahewo afbieja ref esamag jifmuc gevib lo ji reizi fokdoit uju cokgidwa.",
 *	     "risks": "Wiivje de ibsin sosoav gu za fopazad enokauc irvumda fiwu le def vewi su ku. Irekiv owsuuja igi rasseg hi vutagves locod ci rowmuroj mawi ro ol lonaki vezgut te. Comzozo hat ojizer ba jegobira dodamram tuvzocin foti aguta gerluza caju awsu pepamba. Avi sucad vorgewfa ila zaagiro iliefi lapep apgobuho bivo zi dejo kipu damvovlef jetnuafe lonapa.",
 *	     "contribution": "Ipomnok itmat mahangik eculiusa zo bu gozmodel epazapfa mimbezha toapu losawfan piguga luf ji. Ez ogelo johollah bap ushosevo dag li fezez vup jus wemaver fiz malmetu jakga mophafvo nevbara dad. Nikhos wowmaw liozu fogku ubimek gebobone tabelde oru kohzemo urhotkol wotawe doduta wud cumici tuc jo ziseflu vonka. Zofewni mucorut gaz ipupuuvo sutzajnum lug dircume jew ke ecogid nis fogir fa guzinibol iroga iga. Zito culpaswev pe muutuuha maked kijju niugubok gic jes zeflu ud tarcamva guvus ragasoc.",
 *	     "status": "published",
 *	     "active": 1,
 *	     "created_at": "2021-02-11 18:47:26",
 *	     "updated_at": "2021-02-11 18:47:26",
 *	     "intellectual_property": 1,
 *	     "videos": [
 *	       {
 *	         "link": "https://www.youtube.com/watch?v=8h7p88oySWY",
 *	         "videoId": "8h7p88oySWY",
 *	         "provider": "Youtube",
 *	         "thumbnail": "http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg"
 *	       }
 *	     ],
 *	     "type": "methodology",
 *	     "public_domain": 0,
 *	     "knowledge_area_id": null,
 *	     "total_views": 0,
 *	     "objectID": "technology-32",
 *	     "users": [
 *	       {
 *	         "id": 24,
 *	         "email": "retlepop@teb.tk",
 *	         "status": "pending",
 *	         "first_name": "#VWTsq",
 *	         "last_name": "F#GMnd!sY8L)KYF1L3",
 *	         "company": "Yn]NYTTPaTtfQ#e",
 *	         "zipcode": "39507",
 *	         "cpf": "16809360235",
 *	         "birth_date": "2056-12-19 03:21:23.238",
 *	         "phone_number": "02104230997",
 *	         "lattes_id": "94634104577",
 *	         "address": "oLMJNzpaYGlaIr9Dc",
 *	         "address2": ")e[r5v",
 *	         "district": "LZ#@zXLUQ)aVw",
 *	         "city": "^5OUcTUB",
 *	         "state": "i#T3J",
 *	         "country": "5h1JA)",
 *	         "role_id": 1,
 *	         "institution_id": null,
 *	         "created_at": "2021-02-11 18:47:27",
 *	         "updated_at": "2021-02-11 18:47:27",
 *	         "researcher": 0,
 *	         "full_name": "#VWTsq F#GMnd!sY8L)KYF1L3",
 *	         "lattes_url": "http://lattes.cnpq.br/94634104577",
 *	         "pivot": {
 *	           "user_id": 24,
 *	           "technology_id": 32,
 *	           "role": "OWNER"
 *	         }
 *	       }
 *	     ],
 *	     "thumbnail": null
 *	   }
 *	 },
 *	 {
 *	   "id": 3,
 *	   "user_id": 21,
 *	   "technology_id": 35,
 *	   "quantity": 49,
 *	   "status": "open",
 *	   "use": "provincial_government",
 *	   "funding": "no_need_funding",
 *	   "comment": "Ra rupabe guumhi jolu pu opubuwik fula takbetwa nip dickivvu hidu dir widif. Maheluso imajibu hajahkub vofolib putig jivhoal hajpinri kow fezpizok de eboza efemeju lar ujiruza. Doradfon hokuw gehejwe mod rutupiwuh ru ra dagudme hucak li ru sufakbor dobaf negjigi. Tafiref zilmiso ujfawi wijbuuku kulhaab copuhula dipighak vaw ruj pe rer di ficir setnil. Bijjepu rakafomis opfac wagicci jikeb zigu epuiv to of jabbadpu kolir tosvo wenon zubwa zocsik.",
 *	   "cancellation_reason": null,
 *	   "unit_value": 201,
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "type": "T",
 *	   "technology": {
 *	     "id": 35,
 *	     "title": "Ume neneg to.",
 *	     "slug": "ume-neneg-to",
 *	     "description": "Mozsudoj kegvub tackesema ri wegelwe hodet puzu vaz wesfo etulojki ebuto wob. Puc janeut gauj evimihoj pudkevuh carikpuf pob galo mekawgil jug lazumpi nuh lozho vaug vehjuszed su. Jegmuk wugwew cammuhlul nubmek jip luhepkuw alno cag veb nik zov lebiwic mefohic ce rafi ig nattovot. Velorume bafibo uji bom cegihkol jev moperi geejire eku tijhob vumciz voat igoso makigibit lahnupe wijohezo. Voihusa rait duche vanejid ebo uzukawo neb ebgefo toizilut ujupeh hi ocarot fago pi.",
 *	     "private": 1,
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "patent": 1,
 *	     "patent_number": "uASmU05w",
 *	     "primary_purpose": "Imiokine nijwuzo natzadjo pe oboobo no jurhod tod rolegag du cuubkeh julo goppirku cegmetjaw emenzo. Buwerizu zatwum elamavu buud wi ruvdo barappeg opzamge uzwurvag nulizsa fef uw hipzevote adwawbe ke. Lu woupooku gerwigup lu so vitzarvem fiet uvuno zoliroca di ir siwza poj nokafno muswip. Vowig pibaskuf zoptez kim nudapebu waf jukca sogevgi alpu gedhadog wa suv zuw codrahoja liohu. Jafi libkoab kovimge pihefwif nodenfo ijvejuk ur ostefra hevos tiluzciw if repmuho it ahhah cojmifup.",
 *	     "secondary_purpose": "Zaloz aceb mi mug zodfosnof gudlogiw gabtohce pi juwavdet vebad apu udjub. Ila habfah ijekuka jamag rugidfus igi bek duko imosevad leh cufhumze salu wozsimza go. Ini lan kibgi vehkeccu ura vamef fet fonubene wurdugmu gavhaz uruca ekupecup gibbumze fu zen sutbat le kapna.",
 *	     "application_mode": "Welaj edrumwem rip kiruj muhfunnuw onepi ukore ve gatgej otugitkil wi luthenaf pa uniav vaci fom fevutvan tankeza. Enmaif ga rufih go opetelcod ika wem zead ivo zenodog fa ika jadef wuzapug levfa ef. Kilmu caboba aro ujle unidi mu nu ag bazrig ohipaj ig ifu kevtimag watalpen. Jepe osecedo offihu gu nami hi sorasego cu ifoco avu ze dag miregaz powovmab lan wa eseedlah.",
 *	     "application_examples": "Hocrawa sofi hu abogil licca cubcov femisuv isekoiwe bolliw adapohuw fidoput tigi teda locdudleg sawukhi. Mi rarseg okiewuhe lij siwce neroeze azeonba anu codmala mu ezo kejucip. Ho kodul sunhor hahbe cuagiki hisibil hogite jo ja paf fo duut om uwduv lehla lur gogif. Mi upetup la coku bed notpu jolmimwum ero zesusri bepwu at wehja. Lo sebor hov tutozeg wad aziuh av mufpiv op roj uwoizpa habkikim jijezge begofal zuk dep jeabe uzojidav. Niwrufug vah uj dukhectu fom hugvi buefoce lole tarirnob gibu vujoc kutwocmi hat hen ci pogihtu robetud. Facu ge ravjo bevjaj oga wilod epabuhu suf umeitipoj kebi cuk ozubiso.",
 *	     "installation_time": 21,
 *	     "solves_problem": "Faiha nip zok cep ejri cefhiwu erih ridufel opusovbe muj kecba misujmih fimrud sezozmej sor ro muwocte. Fu cijfumis socegi ka ir ka lige enoasu du ajkek cadgewdoz fi wivojzo migdi. Rada upruw azacom vag ah naumi afu ho opuwup ta weljisut peucitej dafen wun wo cul ror. Col si oftus haasono bunonewu hilracis peuri wam wahoj cunber fodu refe vagsucak socun talkibad mo le iki.",
 *	     "entailes_problem": "Ze cu waw ef cachig fugazu gajwa ubamevo irdigsuk jihize vagug mefirral vac icfeh gitrak. Inehpis uf vewigpe zijtapo upeemiiko ma inufo epadizvi acoedcon gaipeeva fedsa kinad izoipmi so sele pobacsa zu. Bedu uduedeuse ej gugpac nu nedpi kus utodewtu busdom wa ibu icvogrir kazife focowo odihahcor lu hi. Doslekavu pucal teudnu vikodpuh sidletu fivu oggav tabcajic pef bogpem wow bohpilkuf okifiujo vonejtik taab zopidu. Kip zadwir apla wegcahib vidzes vawva ebtap naw tejvob vogum olpu zec. Vahwok puv ko re rag si eno noomakuz wemopevad ac welif weh.",
 *	     "requirements": "Jowar adhe waplap ulimi usfi ehnewlep ris dimit ro he peomolo lem duwecsa. Desam vudur oze javija asuniffa tigbu higa bob zoifeca pe coc badlovoj sig ibibeh igu. Uhzebtu ajuaza ij re miw nujbelak juhi ni kacgun bil cu zura fe vi ve mo. Misronsuf dedsa da makazvoh agwo ecunaprok cazabap lu sit ilofonal wifwe tov goc zenoz. Rostorop do femzin azosos baphe dinmuf lehwoccoj fip ifcuffe ivido mo fu comasud ovtih mud. Umgewrul wu lo ceumo favimzuj pinri hezefwoh ped fuhilub panjiuti neludpor josgo derbanra bumso fiojmuw eru.",
 *	     "risks": "Hozut asori fan puvas atujoh luphu wegbuzur mu ze paukuuh virehic mekujbij. Utuaje tu jip la rav vorivtu wuh sit oso fahhof ben vila wove zakeif lamfik. Gofwube tutiglof mevefboj na ca vesojal medu sugaz lu obdukdoh birup edilop dim ofoejeeve akemi umeji. Jaepu lonej facta da wivcih wise rul dueki abedohide coapi etopek lewu vizi zafundo. Cemcib zejahuvu filajis ube lactutmo fazte manube issetoz caleb kemehop ihiniwuta pek afiumiror vujwuco upmufeha tog.",
 *	     "contribution": "Demucwat liv didjeav luronvek mublakub ow zealalo luokehi ci ku pem mibmuwdi pawilu. Lah jafonuti wiap puc deeri ceoco iti imde kaebe zuhzevlav letkaco tecruhti usowulifa. Ese upafof keviw saeri gu ba umuhud fahan ni wak tenuihu noh di. Muk tuh uje oheuceutu odeotosu nodcolher aruwuv ja fuc hovkepiko gid kuk fimari hubip. Ci waf gemi mehodi furadafa taj indip aceco olmajmes mes ip tugiset togpoh uzcoti oda. Kenowi zajosra ociajiavo im his guh za ze fu ve jebisgi uhoas.",
 *	     "status": "published",
 *	     "active": 1,
 *	     "created_at": "2021-02-11 18:47:26",
 *	     "updated_at": "2021-02-11 18:47:26",
 *	     "intellectual_property": 0,
 *	     "videos": [
 *	       {
 *	         "link": "https://www.youtube.com/watch?v=8h7p88oySWY",
 *	         "videoId": "8h7p88oySWY",
 *	         "provider": "Youtube",
 *	         "thumbnail": "http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg"
 *	       }
 *	     ],
 *	     "type": "service",
 *	     "public_domain": 1,
 *	     "knowledge_area_id": null,
 *	     "total_views": 0,
 *	     "objectID": "technology-35",
 *	     "users": [
 *	       {
 *	         "id": 26,
 *	         "email": "diwe@hovikun.ae",
 *	         "status": "pending",
 *	         "first_name": ")WLRvuG48qAtJ(",
 *	         "last_name": "Xt31HtdQ#@U%pd",
 *	         "company": "wDd69",
 *	         "zipcode": "93398",
 *	         "cpf": "37071239780",
 *	         "birth_date": "2022-06-08 17:02:03.781",
 *	         "phone_number": "37727054701",
 *	         "lattes_id": "88753205889",
 *	         "address": "!3P@EXlmd4N3*vv0",
 *	         "address2": "@Z&8pYr2m",
 *	         "district": "(x65rQm9ByCQ9whhl6",
 *	         "city": "g4bQZ1Yjje]D",
 *	         "state": "@^ghqnQ@X]sHsY[*G",
 *	         "country": "Frc(yhK3b9rbh",
 *	         "role_id": 1,
 *	         "institution_id": null,
 *	         "created_at": "2021-02-11 18:47:27",
 *	         "updated_at": "2021-02-11 18:47:27",
 *	         "researcher": 0,
 *	         "full_name": ")WLRvuG48qAtJ( Xt31HtdQ#@U%pd",
 *	         "lattes_url": "http://lattes.cnpq.br/88753205889",
 *	         "pivot": {
 *	           "user_id": 26,
 *	           "technology_id": 35,
 *	           "role": "OWNER"
 *	         }
 *	       }
 *	     ],
 *	     "thumbnail": null
 *	   }
 *	 },
 *	 {
 *	   "id": 4,
 *	   "user_id": 20,
 *	   "technology_id": 34,
 *	   "quantity": 16,
 *	   "status": "open",
 *	   "use": "local_government",
 *	   "funding": "no_need_funding",
 *	   "comment": "Pomrud biem leeho ukjav zu sifewa abrawez giko fum erolufzik ijigusa toddoij bin kuf saama no rugzeuti. Haubpe nadume imvuma cogih foazuuve nubjotno pebigga nosfi mavzag jowauga wajigrow hupwari. Kum lu lewcikab ozoojsar caidojil gaena ji ig ofaitzec ni pin uduzlim. Eb zonzat elwij uzde gumlec ob waognac eccabbak sonobtag getbu koplekzo copdoah rotwul huc tela ditbuumu wogas nutunkom. Cezec lo rungutom bokasab sumani meswamani nog izegolok hekva nu hud usohluc pef nuwcahi zaastuh ma. Tuputom ceg emora ne zedali hepil ujvesip cawvesa zubzajve webi pemfenaj obka cah vaehuze jipazifik acu. Sofil ga ameideon po mejjotsod li tawes hoddot juana komciweh bavkuno atrarkig ci vi agi ow osefos heloczit.",
 *	   "cancellation_reason": null,
 *	   "unit_value": 414,
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "type": "T",
 *	   "technology": {
 *	     "id": 34,
 *	     "title": "Modriw vewuivu ulipip.",
 *	     "slug": "modriw-vewuivu-ulipip",
 *	     "description": "Vomcivan ja luc pumboje hiwjo fu ugodoor giklu basfil zukcel puoju bapvufo fi hi. Dur dac nawrut dirozo siddi ca sukundas kofo zunucpu losduham toijepo mes naewi unec ranfiz unbenuf ovpu. Foebu ra lu no wu imizi ato caz biswersi hu jahunreh kezo miabja gibaf fure. Buf te mimajdu jelizwev fowhirco bapcer opremput kocrew ju lewuni osfafi wutgegcot mi nevieru nubcisog.",
 *	     "private": 1,
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "patent": 0,
 *	     "patent_number": "rpx04tGL",
 *	     "primary_purpose": "Hefod lem pipo dah vihu jav vizlip gucejil goh sukre su wiktodu di paviwok jiazi jogte co ec. Cihfumku tilju venef muamati egposon ijapufwo cecip neec vejuap olafi hohuf ugusi ukebawke na feje werjadkew. Kud avguihe juwek cem oca rumfeh rir zujrinari lij na cida be agmojuj ebassas folombad lu guj lej. Zimko korer feunomul us ihu parirega narju nijoj gewvi iz jer bigsuwwa coico os fepec ra. Pucofdod ru ci guvihed uhlegum dufketci et guigutu es ufejirgoh alagom zo jotcase ad ruuta. Ow gen ruzhud kac gavfoplo melir nemir bufi nofsu kezigboh dafow gibincap fezagfe levav.",
 *	     "secondary_purpose": "Mi rolcir fov ho ijuuw wuomo tudlushok tehsu guzwoguw tor filacjuh we. Zewfu beulu zihalov vejoj semzi febca nuhcew ib ipiwa sif sa vugtopon beine acututoz puv kuili. Eliomah ib gazvilvi ufu oj zup awvusnup ticenlap obe ebuton uhilibe kokkav lenhevdub luas tofakufe sobafunu uhu.",
 *	     "application_mode": "Bem le kutwo fuca cewonvi gatni umrulo valu ebi cibro keckuk gafeskeg enogirzo finpappe ogo hapjed muhagteb. Ogu bel duk vopmu hole gi lupumad ogiposo pecsa juhug kevolul ip coacres zakij bucan mekwede. Hin tivto gafo ubufav nefodgi etoro gojmuopi teb toca rammi nagras sag wej jivgosof nut. Ir renhozof noodti ifnic baip ijsekozu tod zeibi onluno ah wutmoko gefkan dinbeac. Zososjob evkupab pa wuadre gemiki vannepep kufono ujba mom be neubwow arkez ruggutob ojizi. Fin johhebe olu am daket dedeb cife gi mosfumjas lavi oj uv hujiwaf het osjihzuj jejiewa elomego devod. Ojo kin zuzefdo abwaswu hiv ra sot asajat jikso muh niwhus oniopu jivagac naipap mazagvu sawoz.",
 *	     "application_examples": "Zecef tawjade ofo isekuwpu potki genko ecikubi tez wol fupoh iw zalil vujtiifo ru te. Nogi wem ter zeze do jep gibam wu heghej tubicdar ponfihbel sacci hodowil te. Fejmada mepuge wacav peblugnig ve gavnottiw necfipa occonzo upu vag nur kirujo lubev ima owahi nalpas muzog malkivko. Sadotiko tofab ras ge ba ijiza teihbe tutgu taj figi giotu du. Ol wuhewut oci wuzhu ruczakak kel mo dor fajozor laepunow arfimpe morgazir sauv sut ivoejzus. Zumcutoco rek lulifvo pa zag buebuevu tedaci mi oljeb ujraw tiprec goj.",
 *	     "installation_time": 778,
 *	     "solves_problem": "Latbaki tid hesisdi gembi icmo repnidpuk ovuwavi da ajetew birzum ohbozzed caapago pa vi di rop. Goef hu ramsu obe petvecu buhada behejo sizba faj jo gavipev furpo iciede keetja zen pu imade. Id nobginac vi si efoeku pad zufside se miab sutuw balatan niwife pewiba pe noh zow. Bil gajgapis kosemi uzizopa fehmaum ove wun efle gagulej cuuce ac tinic fi sic epo lirujkij geehasoj lohzubih. Hisjike gupmav zohni uzu el bimdo jesele rasog calsorig jazwe mo pa tufveuhu. Temaro epseglo mohotijem kilor upapuwfag pumi subeb ebirol su asegejcu rulo du ajo ucaamute jucbega ih.",
 *	     "entailes_problem": "Si fesek sacupe cu bekohe sadej ez uciri arisaw atkuh iw aletu ficet icet oj ob fuh. Asuved li hosubzur nes dinatel lo hehpov je zumdif ravo gognu ri kam pepugbo ak ekopdi. Munbifum vim telavhic jotuvunup oso majfe teve weal bin sinut su nuudopo. Mirun civosisu to feldokan sigrup va viibpe no lu fadfoabi ukojoipa esow wul pitrehwag. Meizido ifabe ta olo woni ta fotic uzbivob be duvceotu ebjijik fonikoese onesiovu gopun se owu fut laat.",
 *	     "requirements": "Binwesnej ulbi vuzfedi siska ta kijeal aholafe opa aphoav raphul nu gekewi sugbo mu. Ase cor nocerup ictozsum wajde cokuzu urepemvu simuwoma alolar hed edubu ize zis wa malu. Afpaz gor oldodani cu wim tirul mo fehevu bi midoim ohi vefiw zikijis fen. Le touvnus bujboeno to vifsu uturif ludnu bagdis diut felaw foleh bul eludimif daz po umavaz. Zekrenwan depeja tesomwe fed udawiduji hevmuksin nih macok samku ef motad neinorab hino toma madbug hi kep.",
 *	     "risks": "Lihifo oppe af geblanujo pe relrucgel hujipla fibabfev bingotibi fefop nuwaw fup ripov life ijetecewo lolak. Pismuz muwu zevev epohage ubhum kucvoj geheco ci mopahofe cumedawag docijde atbobsed nuecwo va riamkeb zif juv ufosi. Ejkuec fapjemge ke po epu se be tero wuif tumva niflic gewpel wikuc mop aprek. Wa edo lathum ik fimnu babu meek dumvizu ni jac cefulof at kis fe pi faef ki zizbi.",
 *	     "contribution": "Mufe alu nobza sengijbot pehluze vivej fogtad ugpa li dim zi ru kad loktuksek suvutad diwmastef. Duhak wiw os jusisuz vuwgine wilnerug er wup gowjugop munhega ikusu ru zozvov lezkupuw ise fallitbev. Efve wihcuk hova jozcaz tehjudte waki ticeg ginawuga vuit hebava nalelvu tu. Utumavoh ezohbov resop tas tu miipe fij ziw hushol defen bamlak ize kizrefhol hil mab. Miewi tevki hircefoc iweve awowevru orwucgu jivojta vuphurmiv curdebkas sogod mokono vioz goslenmow kuhevmof ij ukkot jo.",
 *	     "status": "published",
 *	     "active": 1,
 *	     "created_at": "2021-02-11 18:47:26",
 *	     "updated_at": "2021-02-11 18:47:26",
 *	     "intellectual_property": 0,
 *	     "videos": [
 *	       {
 *	         "link": "https://www.youtube.com/watch?v=8h7p88oySWY",
 *	         "videoId": "8h7p88oySWY",
 *	         "provider": "Youtube",
 *	         "thumbnail": "http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg"
 *	       }
 *	     ],
 *	     "type": "service",
 *	     "public_domain": 0,
 *	     "knowledge_area_id": null,
 *	     "total_views": 0,
 *	     "objectID": "technology-34",
 *	     "users": [
 *	       {
 *	         "id": 27,
 *	         "email": "cimsad@visokhut.cm",
 *	         "status": "pending",
 *	         "first_name": "[l89[(IW!a0(x#6Na",
 *	         "last_name": "rz9cMsMQcuBu6w$@q!O",
 *	         "company": "juBuG5lqft",
 *	         "zipcode": "57421",
 *	         "cpf": "02048037742",
 *	         "birth_date": "2084-02-19 12:09:33.911",
 *	         "phone_number": "80308203182",
 *	         "lattes_id": "09094843026",
 *	         "address": "6gjq3J[",
 *	         "address2": "qg1Ga(hG[om]R",
 *	         "district": "a]MB0ezY5PB9DzH*aC%",
 *	         "city": "0L(9@Ib&(Nt!tst",
 *	         "state": "1&sAZly80X6ky8(Ot",
 *	         "country": "UMGOBgW*DD53mzQiyN",
 *	         "role_id": 1,
 *	         "institution_id": null,
 *	         "created_at": "2021-02-11 18:47:27",
 *	         "updated_at": "2021-02-11 18:47:27",
 *	         "researcher": 0,
 *	         "full_name": "[l89[(IW!a0(x#6Na rz9cMsMQcuBu6w$@q!O",
 *	         "lattes_url": "http://lattes.cnpq.br/09094843026",
 *	         "pivot": {
 *	           "user_id": 27,
 *	           "technology_id": 34,
 *	           "role": "OWNER"
 *	         }
 *	       }
 *	     ],
 *	     "thumbnail": null
 *	   }
 *	 },
 *	 {
 *	   "id": 5,
 *	   "user_id": 22,
 *	   "technology_id": 33,
 *	   "quantity": 62,
 *	   "status": "open",
 *	   "use": "provincial_government",
 *	   "funding": "has_funding",
 *	   "comment": "Diurotig nucfi je ulekuude hacij doapolof iv owade deklehim mowsomne razidpiw maw vejse. Fadede gon vo haves luh gapewe fozaclo dew vaja uvaku bile tiggo ordotuwi araucsed odputicu hume en. Jafpi ivzeraj soasaata tunsefil sug ak zoliha totvadti pumuto gohifeg mewutpo ge hedin abi ujwiuno ukifat pilemo oshugcav. Bu mi hitman sezjidwec fabu umi suh tuk pakhabnac zijagom zebinul lu nep zupesle ra zunzo. Gocih cuzimvi viatilol vok tim luh ni fu bicajsaj ukwobnu zezus gezev. Wemujlo jovazied fepin nah omojtok dup kuibute uphajep udfu dimov zasrokal dejuudi va.",
 *	   "cancellation_reason": null,
 *	   "unit_value": 774,
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "type": "T",
 *	   "technology": {
 *	     "id": 33,
 *	     "title": "Bozpare wip bilvu.",
 *	     "slug": "bozpare-wip-bilvu",
 *	     "description": "Lekava udehuge ca cunic kupapo zijsu li ha na ibwizmes zilamse cahobtuz. Gukekeh dabovira me ta weloveg veitu peb vewol copnoha icedupur labagfe noico lujbi. Nuttir vios tuzup but ve uwjunow jupu maopaif minsubod zeffeltu zun ef gabufge visiri arwufi fevifiw wacen. Nehow va onadok zolipa ewuamiwip kiockaz vujigaf ci facrovkeb tozis gow sijsi tir fubladulu. Kenkutdi viderji kez hunceke mog gewapoop fad jabukju uvceuv bi sa romokij. Me niwwumeja ihbuwcip unzenov noc udejutwa ve pan suef ce ijiugipi nevvidsu piskah amo iwdarci lujvo gehok ahcudu.",
 *	     "private": 0,
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "patent": 0,
 *	     "patent_number": "fpxHnGYQ",
 *	     "primary_purpose": "Apefa vitruumo gakofohe mop mibdumbuz atewubo hoccabad hidar gi majpuz zu keomel beb zawmasa ci onluwi. Jubec ad ze jum fekni la gud sov sahajiw tidiwjo jetukano lobe hefvuman. Baf kuves ceme uvu kivi kigat raswesbes vinini gursa tol jo sisjikab vop to ju.",
 *	     "secondary_purpose": "Tib usotfik eceav cinhutsa mowpa viredrup vole vuvfa cil kimajuna mikor ner rakvekic ba. Rolmubte puf zigzameb bab udeivnu taku alivuna covfek iroili tihagpe ze lat fedzor. Bupgapfaf imfamez niz vewo uva vujnig taskamdog bo nirasu dinwa kultok akbakap veloczip. Ew ej ofanewtu jigup oze vihasihu citkimje kibuz mazmapgu fibvuk bippikse nouku sutin ojkagumi giw vo kezecefag migeli. Besoiku sirba jo gukcamale tuvci nugegizu za pid jifuladu mal zupgohuzi husnu pujrevuk mesza pozenhed.",
 *	     "application_mode": "Aki nadjode sas mairu kahhohgac capuza kaddosvi gi penkes husdaar ujaal nuizsuf. Pezvupjo meh ukze eddutra ok gi wi jasnuril fuba gefuj separ vopok era tu kinisu. Zadofobe cu le wocjozir jehrare dehucgur pofav volhaz neji tabum abewoh faplab deku pi obe on awu igukeso. Norago nedire ciduipa aneno esuub wethur vamon ivmusu biwusur abgapco dicha ivi mowuguj zohutla. Zu ucijvo acegajbes rolel amuwijbi safli cufe onalif rudaz veknilju urogeza um teje vi gi. Roj adamigtu ife ukeguv sa ocgi neksipze du rijoz copzoh johurna aldob ef.",
 *	     "application_examples": "Lohpa siseva wibjonol efuzudje nunfih og pidmuvu juton zuvev depdo joikiad puk ti kos. Ro unrug nevcol vi vengiluk kug ezmin ale bag wu eha ca wa upedaboj matdarfu. Cipe erpucu set gekim tazjodfu lahhi mokkobil oh sanursi losael mom lidacew di zoupike wu. Jemobhus wotor uvecigme kof ho hej kuidu ca tunavfes ap ivzefpu po kiwvuc mohorek liaritik nibuh iteope. Wiraser keuzaso mid fuabkug weava fojbubbu kejukal izzuv banso zete huuphek ivbapjo. Uz wuk gok budonu sehimuoz pafsotegi gipfa laloji pig puwaka guzenma ruzotopuj ibnah had. Korudadef ihe hajole vi zak daihave ampil do fufrofbi pekzo juwozico lo fupnevfoz.",
 *	     "installation_time": 639,
 *	     "solves_problem": "Uti hec gip bioc ahuwomke bu teb caz ebbaiha ad rinrej asu pihi sik pupfon tut mifmecsa. Kom doc ki azojipi cel zi robokvim vadon fi iv iwoojeco ukicowosi lag gopike cekcare lo ibo. Teleewi pumev hata welophiz kav ecocu zamojijif fikwog inotadnon ossi fij kaz hemo fotvuw hesouj ecapu lo. Febpo ugumojiva fe mewvo havri jejis ajred curari otikru duhel calilu wawpuf ub setimko.",
 *	     "entailes_problem": "Ni weho dizcaluwi wur adasil okjuam po eju gozlilahe mu ciriavo ma biksimimu kivoiba kadam ohege. Ri zizrap ir juf jidasvi manpuf tefle boruli jejikjoh pef limo isevurar vuc. Lozevke za ega giot voltu kaslipeno vad rij ilwalcit pu zakvivpun fop hekkibu womgi azu umhivki isove cesid. Unihehsi kuilvuk ticip udnovum na bo ivizil asowijdo hiecpif fuh dojzud bic dibcicozu jenjir pu jeha bocihkip. Sajafpir cawavu gu rezzu jig ceb bap gires suocu rizloses po vuvulo mesuvsu. Rigegwi sep pemu nipvu tobi toh wid zec kivite ukaugupiz nizo mobid. Itiisbil apdebco tug mohgeba up cor mu pulwav fi jorul ku aje ava seacu vakiv.",
 *	     "requirements": "Wu datef bewpa wuk rot ic va sudi kosodi be tempazbog tos til bukbez zegjo jojwi ucbufal. Zarlur zo rab rotip bijlokeno afgazoh ofmokte dosed meavabu bugu usa viiniteh enu ha. Gothinso po soewe epacen se lotmi cacsov bis uwatovpoc sidow ohpizu jer sizez. Vigicwol sibi ril ulaik mosholzev kup ubo gu labebit vokfehfiv ob gir ke. Dudzi sebi ivu efbo os wizikico gockagap medebu ecegol hi toledo wize. Avhirap jebistuv emelu liho jin bem esi bezge gil pa gois mu zutda.",
 *	     "risks": "Dilzoaku oloworla laveg ti pum naculi gewucen sazde uzesihe hidot meblowdev fah eke vo si simsal ge. Gebe ho urporcod ik vuhmoz ba oloib zuusad vi su ge nuon rekhomus ur. Mub vuf ka jopivli ake ut niffu tisgefiz wuz up cuhtuw no ofuocu. Tup lupi nu tatsokjol avaza telazi difetiret nuju alovihod dustugdug dawuhueke uru niakbez ju ij fa ude.",
 *	     "contribution": "Pivpu poive lel ri hiloh uwpu tiorino dungop non cewkumzu lijjos sa sewpej. Givo samrom gilak kavedov zusehbo pejbo fozos vaplaali vu hulpued dekwovni molsi widfok bepcuk sidalibug hiefpa. Zoseag su lu taj luzor evoog bu ij kuzir zoz pauhi utge fepawde vovik duf ki ihpomod daneutu. Ebohe bisuico ogoavuud wo ho ciwaj tizatuk zadogeoz nirisivir mazkemwij tak usu bi susun ca folow. Surmuje vu ze fas nif kufev varnaube kupuvom jalo gowi siw rac neubudeh ki tuikje nu pemwa. Pa livam wislapez pasfot lap taroj wuh je ce guce boj iha iparonaki tacwak gogovwot.",
 *	     "status": "published",
 *	     "active": 1,
 *	     "created_at": "2021-02-11 18:47:26",
 *	     "updated_at": "2021-02-11 18:47:26",
 *	     "intellectual_property": 1,
 *	     "videos": [
 *	       {
 *	         "link": "https://www.youtube.com/watch?v=8h7p88oySWY",
 *	         "videoId": "8h7p88oySWY",
 *	         "provider": "Youtube",
 *	         "thumbnail": "http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg"
 *	       }
 *	     ],
 *	     "type": "software",
 *	     "public_domain": 1,
 *	     "knowledge_area_id": null,
 *	     "total_views": 0,
 *	     "objectID": "technology-33",
 *	     "users": [
 *	       {
 *	         "id": 25,
 *	         "email": "jeih@lokhol.gf",
 *	         "status": "verified",
 *	         "first_name": "MKPsAjn7$UjaMUXR",
 *	         "last_name": "VXvLjtr(",
 *	         "company": "FqUN)4db^wNN48*ydFBL",
 *	         "zipcode": "07896",
 *	         "cpf": "32589476512",
 *	         "birth_date": "2112-10-23 16:55:12.595",
 *	         "phone_number": "92436126501",
 *	         "lattes_id": "04545592213",
 *	         "address": "!paBgXb2xE4yOcYrWQ",
 *	         "address2": "66y@@peUPJ&$q[Tr3b",
 *	         "district": "6c#Z5&9fH4^[zRJKb4l",
 *	         "city": "$@Yn8sCX$P*6Ppc",
 *	         "state": "hGSWhAG1dwHA",
 *	         "country": "1y83Mmq%(vb1bw@NgWF",
 *	         "role_id": 1,
 *	         "institution_id": null,
 *	         "created_at": "2021-02-11 18:47:27",
 *	         "updated_at": "2021-02-11 18:47:27",
 *	         "researcher": 0,
 *	         "full_name": "MKPsAjn7$UjaMUXR VXvLjtr(",
 *	         "lattes_url": "http://lattes.cnpq.br/04545592213",
 *	         "pivot": {
 *	           "user_id": 25,
 *	           "technology_id": 33,
 *	           "role": "OWNER"
 *	         }
 *	       }
 *	     ],
 *	     "thumbnail": null
 *	   }
 *	 },
 *	 {
 *	   "id": 1,
 *	   "user_id": 25,
 *	   "service_id": 3,
 *	   "quantity": 72,
 *	   "status": "requested",
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "comment": null,
 *	   "type": "S",
 *	   "user": {
 *	     "id": 25,
 *	     "email": "jeih@lokhol.gf",
 *	     "status": "verified",
 *	     "first_name": "MKPsAjn7$UjaMUXR",
 *	     "last_name": "VXvLjtr(",
 *	     "company": "FqUN)4db^wNN48*ydFBL",
 *	     "zipcode": "07896",
 *	     "cpf": "32589476512",
 *	     "birth_date": "2112-10-23 16:55:12.595",
 *	     "phone_number": "92436126501",
 *	     "lattes_id": "04545592213",
 *	     "address": "!paBgXb2xE4yOcYrWQ",
 *	     "address2": "66y@@peUPJ&$q[Tr3b",
 *	     "district": "6c#Z5&9fH4^[zRJKb4l",
 *	     "city": "$@Yn8sCX$P*6Ppc",
 *	     "state": "hGSWhAG1dwHA",
 *	     "country": "1y83Mmq%(vb1bw@NgWF",
 *	     "role_id": 1,
 *	     "institution_id": null,
 *	     "created_at": "2021-02-11 18:47:27",
 *	     "updated_at": "2021-02-11 18:47:27",
 *	     "researcher": 0,
 *	     "full_name": "MKPsAjn7$UjaMUXR VXvLjtr(",
 *	     "lattes_url": "http://lattes.cnpq.br/04545592213"
 *	   },
 *	   "service": {
 *	     "id": 3,
 *	     "name": "Vaptet cisev dej aziricuf zamdo.",
 *	     "description": "Gi fa odnivli wefa walze ufpe hivzo lev kof jodo.",
 *	     "type": "labor",
 *	     "price": 621,
 *	     "measure_unit": "other",
 *	     "payment_message": null,
 *	     "user_id": 28,
 *	     "created_at": "2021-02-11 18:47:27",
 *	     "updated_at": "2021-02-16 17:28:37",
 *	     "thumbnail_id": null,
 *	     "likes": 1,
 *	     "objectID": "service-3",
 *	     "user": {
 *	       "id": 28,
 *	       "email": "cikhub@vig.pg",
 *	       "status": "verified",
 *	       "first_name": "0^8c2#[hA$IuAw",
 *	       "last_name": "ia7y]OzUJ^aNl]YnAR4",
 *	       "company": "^kl^%c*e",
 *	       "zipcode": "17348",
 *	       "cpf": "90361343408",
 *	       "birth_date": "2075-06-02 14:38:04.513",
 *	       "phone_number": "89247156111",
 *	       "lattes_id": "27667327437",
 *	       "address": "SSf)s^^d",
 *	       "address2": "pZ^SI3(15zKR*e",
 *	       "district": "RbYRG%zvNC]n%ZJm",
 *	       "city": "mA[)mnCTj*xK@@io",
 *	       "state": "CAIU4YHwLY%3ulEGQ",
 *	       "country": "R*&7M",
 *	       "role_id": 1,
 *	       "institution_id": 12,
 *	       "created_at": "2021-02-11 18:47:27",
 *	       "updated_at": "2021-02-11 18:47:27",
 *	       "researcher": 0,
 *	       "full_name": "0^8c2#[hA$IuAw ia7y]OzUJ^aNl]YnAR4",
 *	       "lattes_url": "http://lattes.cnpq.br/27667327437"
 *	     }
 *	   }
 *	 },
 *	 {
 *	   "id": 2,
 *	   "user_id": 10,
 *	   "service_id": 4,
 *	   "quantity": 78,
 *	   "status": "requested",
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "comment": null,
 *	   "type": "S",
 *	   "user": {
 *	     "id": 10,
 *	     "email": "tippefaw@gonfuze.mc",
 *	     "status": "pending",
 *	     "first_name": "08twISe4w[EZN@CB",
 *	     "last_name": "APNdfmgOrB03%",
 *	     "company": "Ou(chef(0",
 *	     "zipcode": "87111",
 *	     "cpf": "10829647534",
 *	     "birth_date": "2060-02-24 18:09:22.192",
 *	     "phone_number": "65231704035",
 *	     "lattes_id": "20877586315",
 *	     "address": "ydl4YQi!F6U$@KW&9[mN",
 *	     "address2": "1%X7VyAhOxmz",
 *	     "district": "X2LqkogTrykAC*t!i",
 *	     "city": "@uVnFqKan[KhyZw#M",
 *	     "state": "pCa1^WF6T9uyP^HFgG^",
 *	     "country": "*TQJZ#$M(",
 *	     "role_id": 1,
 *	     "institution_id": null,
 *	     "created_at": "2021-02-11 18:47:23",
 *	     "updated_at": "2021-02-11 18:47:23",
 *	     "researcher": 0,
 *	     "full_name": "08twISe4w[EZN@CB APNdfmgOrB03%",
 *	     "lattes_url": "http://lattes.cnpq.br/20877586315"
 *	   },
 *	   "service": {
 *	     "id": 4,
 *	     "name": "Sile widivi nemunos wi wupomi.",
 *	     "description": "Ipjot rajubuw epasej wamet jenewup ecbu goveg ma ro witidezo.",
 *	     "type": "analysis",
 *	     "price": 43695,
 *	     "measure_unit": "unit",
 *	     "payment_message": null,
 *	     "user_id": 28,
 *	     "created_at": "2021-02-11 18:47:27",
 *	     "updated_at": "2021-02-11 18:47:27",
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "objectID": "service-4",
 *	     "user": {
 *	       "id": 28,
 *	       "email": "cikhub@vig.pg",
 *	       "status": "verified",
 *	       "first_name": "0^8c2#[hA$IuAw",
 *	       "last_name": "ia7y]OzUJ^aNl]YnAR4",
 *	       "company": "^kl^%c*e",
 *	       "zipcode": "17348",
 *	       "cpf": "90361343408",
 *	       "birth_date": "2075-06-02 14:38:04.513",
 *	       "phone_number": "89247156111",
 *	       "lattes_id": "27667327437",
 *	       "address": "SSf)s^^d",
 *	       "address2": "pZ^SI3(15zKR*e",
 *	       "district": "RbYRG%zvNC]n%ZJm",
 *	       "city": "mA[)mnCTj*xK@@io",
 *	       "state": "CAIU4YHwLY%3ulEGQ",
 *	       "country": "R*&7M",
 *	       "role_id": 1,
 *	       "institution_id": 12,
 *	       "created_at": "2021-02-11 18:47:27",
 *	       "updated_at": "2021-02-11 18:47:27",
 *	       "researcher": 0,
 *	       "full_name": "0^8c2#[hA$IuAw ia7y]OzUJ^aNl]YnAR4",
 *	       "lattes_url": "http://lattes.cnpq.br/27667327437"
 *	     }
 *	   }
 *	 },
 *	 {
 *	   "id": 3,
 *	   "user_id": 14,
 *	   "service_id": 7,
 *	   "quantity": 53,
 *	   "status": "requested",
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "comment": null,
 *	   "type": "S",
 *	   "user": {
 *	     "id": 14,
 *	     "email": "sabiatestingadmin@gmail.com",
 *	     "status": "verified",
 *	     "first_name": "AdminName",
 *	     "last_name": "AdminLastName",
 *	     "company": "UFPA",
 *	     "zipcode": "12345123",
 *	     "cpf": "25543261004",
 *	     "birth_date": "2020-12-24T03:00:00.000Z",
 *	     "phone_number": "99 9 9999-9999",
 *	     "lattes_id": "1",
 *	     "address": "Rua dos Calafates, 405",
 *	     "address2": "Cond. Green Garden, apt 104",
 *	     "district": "Alto de São Manoel",
 *	     "city": "Mossoró",
 *	     "state": "RN",
 *	     "country": "Brasil",
 *	     "role_id": 5,
 *	     "institution_id": 11,
 *	     "created_at": "2021-02-11 18:47:23",
 *	     "updated_at": "2021-02-11 18:47:23",
 *	     "researcher": 0,
 *	     "full_name": "AdminName AdminLastName",
 *	     "lattes_url": "http://lattes.cnpq.br/1"
 *	   },
 *	   "service": {
 *	     "id": 7,
 *	     "name": "Pijnooru ratoad agfe zuf wiv.",
 *	     "description": "Nes zec uvapeg tecipaw cugo genu suufke kotub bi avsecem.",
 *	     "type": "consulting",
 *	     "price": 76111,
 *	     "measure_unit": "day",
 *	     "payment_message": null,
 *	     "user_id": 28,
 *	     "created_at": "2021-02-11 18:47:27",
 *	     "updated_at": "2021-02-11 18:47:27",
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "objectID": "service-7",
 *	     "user": {
 *	       "id": 28,
 *	       "email": "cikhub@vig.pg",
 *	       "status": "verified",
 *	       "first_name": "0^8c2#[hA$IuAw",
 *	       "last_name": "ia7y]OzUJ^aNl]YnAR4",
 *	       "company": "^kl^%c*e",
 *	       "zipcode": "17348",
 *	       "cpf": "90361343408",
 *	       "birth_date": "2075-06-02 14:38:04.513",
 *	       "phone_number": "89247156111",
 *	       "lattes_id": "27667327437",
 *	       "address": "SSf)s^^d",
 *	       "address2": "pZ^SI3(15zKR*e",
 *	       "district": "RbYRG%zvNC]n%ZJm",
 *	       "city": "mA[)mnCTj*xK@@io",
 *	       "state": "CAIU4YHwLY%3ulEGQ",
 *	       "country": "R*&7M",
 *	       "role_id": 1,
 *	       "institution_id": 12,
 *	       "created_at": "2021-02-11 18:47:27",
 *	       "updated_at": "2021-02-11 18:47:27",
 *	       "researcher": 0,
 *	       "full_name": "0^8c2#[hA$IuAw ia7y]OzUJ^aNl]YnAR4",
 *	       "lattes_url": "http://lattes.cnpq.br/27667327437"
 *	     }
 *	   }
 *	 },
 *	 {
 *	   "id": 4,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 82,
 *	   "status": "requested",
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "comment": null,
 *	   "type": "S",
 *	   "user": {
 *	     "id": 11,
 *	     "email": "sabiatestinge2e@gmail.com",
 *	     "status": "verified",
 *	     "first_name": "Sabia",
 *	     "last_name": "Testing",
 *	     "company": "UFERSA",
 *	     "zipcode": "12345123",
 *	     "cpf": "71943347042",
 *	     "birth_date": "2020-12-24T03:00:00.000Z",
 *	     "phone_number": "99 9 9999-9999",
 *	     "lattes_id": "1",
 *	     "address": "Rua dos Calafates, 405",
 *	     "address2": "Cond. Green Garden, apt 104",
 *	     "district": "Alto de São Manoel",
 *	     "city": "Mossoró",
 *	     "state": "RN",
 *	     "country": "Brasil",
 *	     "role_id": 1,
 *	     "institution_id": 11,
 *	     "created_at": "2021-02-11 18:47:23",
 *	     "updated_at": "2021-02-17 12:28:02",
 *	     "researcher": 0,
 *	     "full_name": "Sabia Testing",
 *	     "lattes_url": "http://lattes.cnpq.br/1"
 *	   },
 *	   "service": {
 *	     "id": 2,
 *	     "name": "Acipop ogteor beafhi nalube ekgu.",
 *	     "description": "Se te ir ub evupin imi uhiru caimaguk se namwiwoh.",
 *	     "type": "analysis",
 *	     "price": 50129,
 *	     "measure_unit": "week",
 *	     "payment_message": null,
 *	     "user_id": 28,
 *	     "created_at": "2021-02-11 18:47:27",
 *	     "updated_at": "2021-02-11 18:47:27",
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "objectID": "service-2",
 *	     "user": {
 *	       "id": 28,
 *	       "email": "cikhub@vig.pg",
 *	       "status": "verified",
 *	       "first_name": "0^8c2#[hA$IuAw",
 *	       "last_name": "ia7y]OzUJ^aNl]YnAR4",
 *	       "company": "^kl^%c*e",
 *	       "zipcode": "17348",
 *	       "cpf": "90361343408",
 *	       "birth_date": "2075-06-02 14:38:04.513",
 *	       "phone_number": "89247156111",
 *	       "lattes_id": "27667327437",
 *	       "address": "SSf)s^^d",
 *	       "address2": "pZ^SI3(15zKR*e",
 *	       "district": "RbYRG%zvNC]n%ZJm",
 *	       "city": "mA[)mnCTj*xK@@io",
 *	       "state": "CAIU4YHwLY%3ulEGQ",
 *	       "country": "R*&7M",
 *	       "role_id": 1,
 *	       "institution_id": 12,
 *	       "created_at": "2021-02-11 18:47:27",
 *	       "updated_at": "2021-02-11 18:47:27",
 *	       "researcher": 0,
 *	       "full_name": "0^8c2#[hA$IuAw ia7y]OzUJ^aNl]YnAR4",
 *	       "lattes_url": "http://lattes.cnpq.br/27667327437"
 *	     }
 *	   }
 *	 },
 *	 {
 *	   "id": 5,
 *	   "user_id": 3,
 *	   "service_id": 1,
 *	   "quantity": 82,
 *	   "status": "requested",
 *	   "created_at": "2021-02-11 18:47:27",
 *	   "updated_at": "2021-02-11 18:47:27",
 *	   "comment": null,
 *	   "type": "S",
 *	   "user": {
 *	     "id": 3,
 *	     "email": "wega@ewnipu.gu",
 *	     "status": "pending",
 *	     "first_name": "nF3K^H&8CeQ",
 *	     "last_name": "$K&sGKLL^n9",
 *	     "company": "n&BsaL^Hu",
 *	     "zipcode": "16147",
 *	     "cpf": "29728544053",
 *	     "birth_date": "2028-09-24 11:34:32.571",
 *	     "phone_number": "45236456484",
 *	     "lattes_id": "21033304489",
 *	     "address": "7zj)$*AM1",
 *	     "address2": "xSh!@K4dmPV",
 *	     "district": "F%oGVE^iuUl4bIGaj",
 *	     "city": "2K6ptaNHI(jWD!#s31",
 *	     "state": "rji$ffCGPR9F!IJs*",
 *	     "country": "zi[jEsb9I7y!",
 *	     "role_id": 1,
 *	     "institution_id": null,
 *	     "created_at": "2021-02-11 18:47:23",
 *	     "updated_at": "2021-02-11 18:47:23",
 *	     "researcher": 0,
 *	     "full_name": "nF3K^H&8CeQ $K&sGKLL^n9",
 *	     "lattes_url": "http://lattes.cnpq.br/21033304489"
 *	   },
 *	   "service": {
 *	     "id": 1,
 *	     "name": "Pi ihe lewhuzi latu urcetloz.",
 *	     "description": "Je awusiw nadjubig peijo jawwiz okaogoti musano elumeap ger potmep.",
 *	     "type": "consulting",
 *	     "price": 38087,
 *	     "measure_unit": "day",
 *	     "payment_message": null,
 *	     "user_id": 28,
 *	     "created_at": "2021-02-11 18:47:27",
 *	     "updated_at": "2021-02-16 17:28:37",
 *	     "thumbnail_id": null,
 *	     "likes": 0,
 *	     "objectID": "service-1",
 *	     "user": {
 *	       "id": 28,
 *	       "email": "cikhub@vig.pg",
 *	       "status": "verified",
 *	       "first_name": "0^8c2#[hA$IuAw",
 *	       "last_name": "ia7y]OzUJ^aNl]YnAR4",
 *	       "company": "^kl^%c*e",
 *	       "zipcode": "17348",
 *	       "cpf": "90361343408",
 *	       "birth_date": "2075-06-02 14:38:04.513",
 *	       "phone_number": "89247156111",
 *	       "lattes_id": "27667327437",
 *	       "address": "SSf)s^^d",
 *	       "address2": "pZ^SI3(15zKR*e",
 *	       "district": "RbYRG%zvNC]n%ZJm",
 *	       "city": "mA[)mnCTj*xK@@io",
 *	       "state": "CAIU4YHwLY%3ulEGQ",
 *	       "country": "R*&7M",
 *	       "role_id": 1,
 *	       "institution_id": 12,
 *	       "created_at": "2021-02-11 18:47:27",
 *	       "updated_at": "2021-02-11 18:47:27",
 *	       "researcher": 0,
 *	       "full_name": "0^8c2#[hA$IuAw ia7y]OzUJ^aNl]YnAR4",
 *	       "lattes_url": "http://lattes.cnpq.br/27667327437"
 *	     }
 *	   }
 *	 }
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
Route.get('orders', 'OrderController.index').middleware(['auth', 'handleParams']);

/**
 * @api {get} /orders/:id Gets an Order (TechnologyOrder or ServiceOrder)
 * @apiGroup Orders
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Query Param) {String="technology","service"} orderType Mandatory order type
 * @apiParamExample  {json} Request sample:
 *	/orders/11?orderType=technology
 * @apiSuccess {Object} Order (TechnologyOrder or ServiceOrder).
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 11,
 *	 "user_id": 31,
 *	 "technology_id": 15,
 *	 "quantity": 1,
 *	 "status": "open",
 *	 "use": "private",
 *	 "funding": "has_funding",
 *	 "comment": "olá, teste",
 *	 "cancellation_reason": null,
 *	 "unit_value": null,
 *	 "created_at": "2021-03-27 19:21:06",
 *	 "updated_at": "2021-03-27 19:21:06",
 *	 "type": "technology",
 *	 "technology": {
 *	   "id": 15,
 *	   "title": "Wapiwi kiz woped.",
 *	   "slug": "wapiwi-kiz-woped",
 *	   "description": "Hottig wu mok jonoco zapa webah lujcav avti bi bum pe lieti loize holatseh. Ovbefu sitab waad tipipu vin ki moh vuaboli vuvato pe dituv bora evuloraw fejic fiucazo jo ju. Gusu wiwegso ehvona lucidif utwup colonmo efi josuja zigsokate hatete uvhawudi genre lop wiv jowa. Ji vo wenbiswes tegfip mecfi ifam be ur sapceshi miataam pajputcis bovcaso etu kagum waruwal re sebdabmaw. Vajru rur medi pudovba az jicuv fu tugaf dut afehas babza wavof eha gagpise rom. Wa liki il gaphihaf dud dolwotoz cipnol dimwiji somlo bo rif jilsat gurmemzew maca ruz eca iciwogoc nazzi. Coludfeg zevger cuh haj piwmib una zu pesifbo nuwhaz piowjav kera tonkiab.",
 *	   "private": 0,
 *	   "thumbnail_id": null,
 *	   "likes": 3,
 *	   "patent": 0,
 *	   "patent_number": "xyrhX24L",
 *	   "primary_purpose": "Dob ri ti et bo belehef idiuddo jujep bi zaduiza azusam obiwafza ca anarpi ofjognu cihucciv ro. Usoir musub afnud hifleaz pib zah sotakpu so iwkun odu jek neges mifigbot inu ep ami fihufuv. Humi dec uzuhesu ciiromev toidu zairu dunmepwu usvo hasma do lagosuki ujnukga rohsirsog mivho. Fellulem las ige giga voblatne ametolhu kozmoszub saossev lajladko osu edeweba ti apdanag ajiv opkaw omimal wohovnar. Juvupuv wivdik cepo adme kel ije rokbu buma tetikwi tecigopa jocip oknegib zisascob ug. Pucwo ag ace reranij azmacip luv te odo lefi bepah jolle begetoto bopulcuc voah pead ika ervubho zub.",
 *	   "secondary_purpose": "Emoc kam zawi jihna punam egivepkus hugga ociow rum nu afinodaf kegdiv ci cil neaj utu nodacno. Afouho potboj ja zazbujez unevuba galanu muga gizgi fiavpiw neoj hevidguz povlep lipwus. Gucezeiw vu mimmik eza daga umred let okawef zimatrar pu hoh las wacesana goomeho fiz. Mirejpop zodbus ku oleku ciwe siflec dogta luzod be houf vi cow higowo colgozi evawifiv foje. Paj dewfuroku ugurop gushavfut wud ho lef udecoeb ton gucufe vel uso beslawu bujujur.",
 *	   "application_mode": "Obawuklip ve vivetgim hacoas ko oz kevid nizohkoz zefocjas lucu biwasavim cidoz zittushe meref gul soka. Oju esduc fomen uwifo etzuw rocwac odto uwaidetud vemsogig tid pudmup ahsugfa zageb zune teg opamactaw. Palahuc pov sorhecci munibat obve nuwcan ufcez cu wi bikujesop nu oskokab gopil zu hozvad he movgoslu zojton. Seane uzaje cip ro jut arobam viduboho tov kodavwi poneedi ofupi egohegoz lupuvne une apmaile fupuhti duzagzoc wiwlut.",
 *	   "application_examples": "Ner zom riir nahir ujiwat wakubba nu nowegu ciitarup luswu taj rituf. Ewte medes ij bi faes jak sudhozu am itunu be lir let. Titrocjit hewpelihe zovfa tuw vof ebiok mifot el natbubi ahwiav atugirti ukojetpo je awawo amsan oh. Ti mafzo levu po rowi johir lavho ruj cu wittojik vero pamvo jakke legivkon valajge. Hijcem ribukke uca calipihe ekoomipu reg bahwu nosijo zut cu ewga cuev. Fo nica uno mijo ci uw joc ij ihatiw dovuwni gewtiv nir epi ruttirfe odiho zil da. Laricsa gesuvo seiwogu dikev beona neki hoj idefi bozma zevpur tecipi oji akrel sir evroboz vawamwic di.",
 *	   "installation_time": 727,
 *	   "solves_problem": "Ur epu wishibha age adagacpe egapipu zidsadpej nujukta he misrew azijihi do uw pu huveve moube. Wi asuwube jafoegu sogvuum ofa vuhta wo gupiv iv mogjan ci bomofeeke raoz mapug zamwu wozakwi forkuv gahlu. Bokoctot mo rik cu zub vepi delolo hilub finu nevfuan re gaj nuvtuef lutim ogo. Noolozi liznu pocjifuh uni kew ju cu ke hannibjid dus kubedlil aharapen mojagaegi duhguv ki. Tuleh irumel mu tabanke gebazeawu niaresu ekapueb hih latafe hu zu difzasres. Bagjav it ociicpug navpu utbuif rewij zuradbok eri kasred getjuedo im keriseko upoca ci.",
 *	   "entailes_problem": "Zo sujru hic ave inawuwa nomoj sov ce it gomo huvbu izesefo wedbareg. Pojhe guhija vem hin ku ruzfu nozep umonujo cosgir du kojoh sub jokeh ih ra cugbu fodu. Da lericgip ru catkufeb kudhibhuk varzuhi iki vudkogu mij rempu mabad zumishe be rujjir liniro rurifezo. Weclih weh adedusga nad wu wetmek hufnidcu zivbes no vompa ado suvke diufju ce ferkuhrep ducpi ikuimu lurhafip.",
 *	   "requirements": "Vake vewu con newwilpi bupuor elkiknen wuz iro pe haicicuf avtotaj soihuza na gijvopfi. Mu ga fecem up hiog pazibceg he akinu mod rarag huhu giregu tifizub. Ocoojwa azotbu kazib douno rivi advaful lusoneha jusmo ak ruj ubu per. Ecmasaf tompalzi cadupi zahbilkut beetean conuuv gihwelfa zu sobti tid zuheud fujbuw. Dape zozfef ikka icvic ek lov gel awum desatoz oz amizotceb tolnacpic rinata vit nefrubsu escephe gim zija.",
 *	   "risks": "Deuza pelalhi johleni tohal oco ve od rur kedfocel siko taz wednofo jejuz odigut. Ubu faini usufet eploz pevebjaz rolnu hagfu gurazam ewagi simbopom so tosga hoghucab di ecder vohromiv hoimu cifojka. Nab utbeho culubas ero li maufra at ipnevvaz doctu avaru urocve geobja zaro. Hiju iw emfopor ubazocfa mu pazet fehota eveuwi lukezmeh got migi buvaju jedhob. Diluvroc pog teuki gof sewuj vof ti zakajvun hufbeah togikhag jir ecu lej. Tefoko rimte jicetjal jud tucu piocwu leri ranjefegu ovuju feh lesbej buw. Waltal rumcu karaf ozlo lufsacofe pukmolas logaszak bapu to moelu til ikokum forub rutrok.",
 *	   "contribution": "Di ibademim he sietu homhewmu suv wipuc dinalpot sut bub bohtebu owerro battij. Uzapak zili wagifit siwmo tucsaefe wepak gak gucrefap cium fus humfu ewhopu soniz capawfot bewdeno biwaje muzezzih vo. Elebijvit cecvo viip hagecu bagak rucopi lozom mapzozef sutibgip motam dubi iwa faf me mainawud reheg. Zu rob pig hanfefe lupif pov gudos tefvup ahicac tomohsi tasamwiv zuzpence su vafos. Gotetuco wojoce eluza jafokor bovpoawe nekli jafuv agva ugzaz henaven bebbimtok zitpup hiukodum towe cin kap do. Zi pamihije ajujec tilmeim sespo ozpobla gofewoca uni lil wo odelikdo facoh gitlada eg wasurubo ne onpunek lo. Vis kispeeta rijel wuv kufupvec pik pijrezi sodnumi guzjo gapowze di uhwifke wak.",
 *	   "status": "published",
 *	   "active": 1,
 *	   "created_at": "2021-02-11 18:47:23",
 *	   "updated_at": "2021-02-11 18:47:25",
 *	   "intellectual_property": 1,
 *	   "videos": [
 *	     {
 *	       "link": "https://www.youtube.com/watch?v=8h7p88oySWY",
 *	       "videoId": "8h7p88oySWY",
 *	       "provider": "Youtube",
 *	       "thumbnail": "http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg"
 *	     }
 *	   ],
 *	   "type": "service",
 *	   "public_domain": 1,
 *	   "knowledge_area_id": 10604073,
 *	   "total_views": 0,
 *	   "objectID": "technology-15",
 *	   "users": [
 *	     {
 *	       "id": 11,
 *	       "email": "sabiatestinge2e@gmail.com",
 *	       "status": "verified",
 *	       "first_name": "Sabia",
 *	       "last_name": "Testing",
 *	       "company": "UFERSA",
 *	       "zipcode": "12345123",
 *	       "cpf": "71943347042",
 *	       "birth_date": "2020-12-24T03:00:00.000Z",
 *	       "phone_number": "99 9 9999-9999",
 *	       "lattes_id": "1",
 *	       "address": "Rua dos Calafates, 405",
 *	       "address2": "Cond. Green Garden, apt 104",
 *	       "district": "Alto de São Manoel",
 *	       "city": "Mossoró",
 *	       "state": "RN",
 *	       "country": "Brasil",
 *	       "role_id": 1,
 *	       "institution_id": 11,
 *	       "created_at": "2021-02-11 18:47:23",
 *	       "updated_at": "2021-02-17 12:28:02",
 *	       "researcher": 0,
 *	       "full_name": "Sabia Testing",
 *	       "lattes_url": "http://lattes.cnpq.br/1",
 *	       "pivot": {
 *	         "user_id": 11,
 *	         "technology_id": 15,
 *	         "role": "OWNER"
 *	       }
 *	     }
 *	   ],
 *	   "thumbnail": null
 *	 }
 *	}
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Resource TechnologyOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyOrder was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.get('orders/:id', 'OrderController.show')
	.middleware(['auth', 'handleParams'])
	.validator('OrderType');

/**
 * @api {put} /orders/:id/close Closes an Order (TechnologyOrder or ServiceOrder)
 * @apiGroup Orders
 * @apiPermission CLOSE_TECHNOLOGY_ORDER or CLOSE_SERVICE_ORDER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Query Param) {String="technology","service"} orderType Mandatory order type
 * @apiParam (Route Param) {Number} id Mandatory TechnologyOrder ID or ServiceOrder ID
 * @apiParam {Number} quantity Quantity acquired
 * @apiParam {Number} unit_value Unit value traded
 * @apiParamExample  {json} Request sample:
 *	/orders/1/close?orderType=technology
 * @apiSuccess {Object} Order (TechnologyOrder or ServiceOrder).
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
 * @apiErrorExample {json} Validation Error: orderType Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The orderType is required.",
 *       				"field": "orderType",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: orderType should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The orderType should fall within defined values of (technology, service).",
 *       				"field": "orderType",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.put('orders/:id/close', 'OrderController.closeOrder')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.CLOSE_TECHNOLOGY_ORDER]),
		getMiddlewarePermissions([permissions.CLOSE_SERVICE_ORDER]),
	])
	.validator('CloseOrder');
/**
 * @api {put} /orders/:id/cancel Cancels an Order (TechnologyOrder or ServiceOrder)
 * @apiGroup Orders
 * @apiPermission CANCEL_TECHNOLOGY_ORDER or CANCEL_SERVICE_ORDER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Query Param) {String="technology","service"} orderType Mandatory order type
 * @apiParam (Route Param) {Number} id Mandatory Order ID (TechnologyOrder or ServiceOrder ID)
 * @apiParam {String} [cancellation_reason] Optional Cancellation Reason
 * @apiParamExample  {json} Request sample:
 *	/orders/1/cancel?orderType=technology
 * @apiSuccess {Object} Order (TechnologyOrder or ServiceOrder).
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
 * * @apiErrorExample {json} Validation Error: orderType Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The orderType is required.",
 *       				"field": "orderType",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: orderType should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The orderType should fall within defined values of (technology, service).",
 *       				"field": "orderType",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.put('orders/:id/cancel', 'OrderController.cancelOrder')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.CANCEL_TECHNOLOGY_ORDER]),
		getMiddlewarePermissions([permissions.CANCEL_SERVICE_ORDER]),
	])
	.validator('OrderType');
/**
 * @api {put} /services/orders/:id/perform Performs a Service Order
 * @apiDescription User responsible for service order can perform it
 * @apiGroup Orders
 * @apiPermission PERFORM_SERVICE_ORDER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service Order ID
 * @apiSuccess {Number} id ServiceOrder ID.
 * @apiSuccess {Number} quantity ServiceOrder quantity.
 * @apiSuccess {String="performed"} status Service Order Status.
 * @apiSuccess {Number} user_id ServiceOrder user requester.
 * @apiSuccess {Number} service_id ServiceOrder service related.
 * @apiSuccess {Date} created_at ServiceOrder Register date
 * @apiSuccess {Date} updated_at ServiceOrder Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 19,
 *  "user_id": 28,
 *  "service_id": 7,
 *  "quantity": 9,
 *  "status": "performed",
 *  "created_at": "2021-01-14 14:35:47",
 *  "updated_at": "2021-01-14 14:58:30"
 * }
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.put('services/orders/:id/perform', 'OrderController.performServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.PERFORM_SERVICE_ORDER]),
]);
/**
 * @api {delete} /services/orders/:id Deletes a Service Order
 * @apiDescription User that requested service order can delete it.
 * @apiGroup Orders
 * @apiPermission DELETE_SERVICE_ORDER or DELETE_SERVICE_ORDERS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service Order ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /services/orders/1
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.delete('services/orders/:id', 'OrderController.destroyServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_SERVICE_ORDER, permissions.DELETE_SERVICE_ORDERS]),
]);
/**
 * @api {delete} /services/orders/reviews/:id Deletes a Service Order Review
 * @apiDescription User that create service order review can delete it,
 * @apiGroup Orders
 * @apiPermission DELETE_SERVICE_ORDER_REVIEW
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory ServiceOrderReview ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /services/orders/reviews/1
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
 * @apiErrorExample {json} Resource ServiceOrderReview was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrderReview was not found"
 * 			}
 *		}
 */
Route.delete(
	'services/orders/reviews/:id',
	'OrderController.destroyServiceOrderReview',
).middleware(['auth', getMiddlewarePermissions([permissions.DELETE_SERVICE_ORDER_REVIEW])]);
