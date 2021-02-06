/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

/**
 * @api {get} /device-tokens Lists All User Device Tokens
 * @apiGroup Device Tokens
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Object[]} deviceTokens DeviceToken Collection
 * @apiSuccess {Number} deviceTokens.id DeviceToken ID.
 * @apiSuccess {Number} deviceTokens.user_id User ID.
 * @apiSuccess {String} deviceTokens.device_uuid Device UUID.
 * @apiSuccess {String} deviceTokens.device_token Device Token (Android or Apple Token).
 * @apiSuccess {Date} deviceTokens.created_at DeviceToken Register date
 * @apiSuccess {Date} deviceTokens.updated_at DeviceToken Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 4,
 *	   "user_id": 11,
 *	   "device_uuid": "17e8ae0b-0252-4b30-90aa-0628b728e182",
 *	   "device_token": "APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5cVIkZah5QUhSAxzx4Roa7b4xy9tvx9iNSYw-eXBYYd8k1XKf8Q_Qq1X9-x-U-Y79vdPr",
 *	   "created_at": "2021-02-05 21:31:34",
 *	   "updated_at": "2021-02-05 21:31:34"
 *	 },
 *	 {
 *	   "id": 5,
 *	   "user_id": 11,
 *	   "device_uuid": "17e8ae0b-0252-4b30-90aa-0628b728e183",
 *	   "device_token": "APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5cVIkZah5QUhSAxzx4Roa7b4xy9tvx9iNSYw-eXBYYd8k1XKf8Q_Qq1X9-x-U-Y79vdPs",
 *	   "created_at": "2021-02-05 21:31:43",
 *	   "updated_at": "2021-02-05 21:31:43"
 *	 }
 *	]
 * @apiUse AuthError
 */
Route.get('device-tokens', 'DeviceTokenController.index').middleware(['auth']);
/**
 * @api {get} /device-tokens/:uuid Gets a single User Device Token
 * @apiGroup Device Tokens
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} uuid Mandatory Device UUID.
 * @apiSuccess {Number} id DeviceToken ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} device_uuid Device UUID.
 * @apiSuccess {String} device_token Device Token (Android or Apple Token).
 * @apiSuccess {Date} created_at DeviceToken Register date
 * @apiSuccess {Date} updated_at DeviceToken Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 4,
 *  "user_id": 11,
 *  "device_uuid": "17e8ae0b-0252-4b30-90aa-0628b728e182",
 *  "device_token": "APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5cVIkZah5QUhSAxzx4Roa7b4xy9tvx9iNSYw-eXBYYd8k1XKf8Q_Qq1X9-x-U-Y79vdPr",
 *  "created_at": "2021-02-05 21:31:34",
 *  "updated_at": "2021-02-05 21:31:34"
 * }
 * @apiUse AuthError
 */
Route.get('device-tokens/:uuid', 'DeviceTokenController.show').middleware(['auth']);
/**
 * @api {post} /device-tokens Creates a new User Device Token
 * @apiGroup Device Tokens
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} device_uuid Mandatory Device UUID
 * @apiParam {String} device_token Mandatory Device Token (Android or Apple Push token)
 * @apiSuccess {Number} id DeviceToken ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} device_uuid Device UUID.
 * @apiSuccess {String} device_token Device Token (Android or Apple Token).
 * @apiSuccess {Date} created_at DeviceToken Register date
 * @apiSuccess {Date} updated_at DeviceToken Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "device_uuid": "17e8ae0b-0252-4b30-90aa-0628b728e190",
 *  "device_token": "APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5cVIkZah5QUhSAxzx4Roa7b4xy9tvx9iNSYw-eXBYYd8k1XKf8Q_Qq1X9-x-U-Y79vdPt",
 *  "user_id": 14,
 *  "created_at": "2021-02-06 17:00:28",
 *  "updated_at": "2021-02-06 17:00:28",
 *  "id": 7
 * }
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: device_uuid Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The device_uuid is required.",
 *                		"field": "device_uuid",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: device_token Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The device_token is required.",
 *                		"field": "device_token",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: device_uuid Unique
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The device_uuid has already been taken by someone else.",
 *                		"field": "device_uuid",
 *                		"validation": "unique"
 *            		}
 *        		]
 *   		}
 *		}
 */
Route.post('device-tokens', 'DeviceTokenController.store')
	.middleware(['auth'])
	.validator('StoreDeviceToken');
/**
 * @api {put} /device-tokens/:uuid Updates a User Device Token
 * @apiGroup Device Tokens
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} uuid Mandatory Device UUID.
 * @apiParam {String} [device_token] Optional Device Token (Android or Apple Push token)
 * @apiSuccess {Number} id DeviceToken ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} device_uuid Device UUID.
 * @apiSuccess {String} device_token Device Token (Android or Apple Token).
 * @apiSuccess {Date} created_at DeviceToken Register date
 * @apiSuccess {Date} updated_at DeviceToken Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "device_uuid": "17e8ae0b-0252-4b30-90aa-0628b728e190",
 *  "device_token": "APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5cVIkZah5QUhSAxzx4Roa7b4xy9tvx9iNSYw-eXBYYd8k1XKf8Q_Qq1X9-x-U-Y79vdPt",
 *  "user_id": 14,
 *  "created_at": "2021-02-06 17:00:28",
 *  "updated_at": "2021-02-06 17:00:28",
 *  "id": 7
 * }
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: device_uuid Unique
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The device_uuid has already been taken by someone else.",
 *                		"field": "device_uuid",
 *                		"validation": "unique"
 *            		}
 *        		]
 *   		}
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
Route.put('device-tokens/:uuid', 'DeviceTokenController.update').middleware(['auth']);
/**
 * @api {delete} /device-tokens/:uuid Deletes a Device Token
 * @apiGroup Device Tokens
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} uuid Mandatory Device UUID.
 * @apiParamExample  {json} Request sample:
 * DELETE /device-tokens/17e8ae0b-0252-4b30-90aa-0628b728e181
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Deleted Error
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_DELETED_ERROR",
 *   			"message":"An error occurred while trying to delete the resource"
 * 			}
 *		}
 */
Route.delete('device-tokens/:uuid', 'DeviceTokenController.destroy').middleware(['auth']);
/**
 * @api {delete} /device-tokens Deletes user Device Tokens
 * @apiGroup Device Tokens
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 * DELETE /device-tokens
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Deleted Error
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_DELETED_ERROR",
 *   			"message":"An error occurred while trying to delete the resource"
 * 			}
 *		}
 */
Route.delete('device-tokens', 'DeviceTokenController.destroyMany').middleware(['auth']);
