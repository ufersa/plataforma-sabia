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
 * @apiGroup Service Orders
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
 * @apiGroup Service Order Reviews
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
Route.get('technologies/:id/orders', 'OrderController.showTechnologyOrders').middleware([
	'auth',
	'handleParams',
]);

/**
 * @api {get} /services/orders Lists user responsible service orders
 * @apiGroup Service Orders
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
 * @apiGroup Service Order Reviews
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
 * @apiGroup Service Orders
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
 * @apiGroup Service Order Reviews
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
Route.put('orders/:id/update-status', 'OrderController.updateStatus')
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
Route.get('orders', 'OrderController.index').middleware(['auth', 'handleParams']);

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
Route.get('orders/:id', 'OrderController.show').middleware(['auth', 'handleParams']);

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
Route.put('orders/:id/close', 'OrderController.closeTechnologyOrder')
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

Route.put('orders/:id/cancel', 'OrderController.cancelTechnologyOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.CANCEL_TECHNOLOGY_ORDER]),
]);
/**
 * @api {put} /services/orders/:id/perform Performs a Service Order
 * @apiDescription User responsible for service order can perform it
 * @apiGroup Service Orders
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
 * @apiGroup Service Orders
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
 * @apiGroup Service Orders
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
