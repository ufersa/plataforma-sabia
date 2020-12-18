/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const Route = use('Route');

/**
 * @api {get} /chat get the chat
 * @apiGroup Chat
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam (Query Param) {String="technology-order"} object_type type of entity
 * @apiParam (Query Param) {String} [object_id] entity id
 * @apiParam (Query Param) {String} [target_user] target user of my chat
 * @apiParamExample  {json} Request sample:
 * GET /chat?object_type=technology-order&object_id=3&target_user=2
 * @apiSuccess {String} chatId chat id
 * @apiSuccess {String} object_id entity id
 * @apiSuccess {String} object_type type of entity
 * @apiSuccess {String} status chat status
 * @apiSuccess {Array} participants array of users of the chat
 * @apiSuccess {Date} created_at created at date
 * @apiSuccess {Date} updated_at updated at date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": "cc692a91-b8bd-4879-b7ae-57497a6db512",
 *		"object_id": 1,
 *		"object_type": "technology-order",
 *		"status": "active",
 *		"participants": [
 *			21,
 *			2
 *		],
 *		"created_at": "2020-12-17 18:57:40",
 *		"updated_at": "2020-12-17 18:57:40"
 *	}
 * @apiUse AuthError
 * @apiErrorExample {json} The object type sent is no allowed
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "NOT_ALLOWED_OBJECT_TYPE",
 *   			"message":"The object type sent is no allowed"
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: target_user Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The target_user is required.",
 *       				"field": "target_user",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: target_user should exist in users
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The target_user should exist in users.",
 *       				"field": "target_user",
 *       				"validation": "exists"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: object_type Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The object_type is required.",
 *       				"field": "object_type",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: object_type should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The object_type should fall within defined values of (technology-order).",
 *       				"field": "object_type",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: object_id Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The object_id is required.",
 *       				"field": "object_id",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.get('chat', 'ChatController.show')
	.middleware(['auth'])
	.validator('getChat');

/**
 * @api {get} /chat/:id/messages get the list of the chat messages
 * @apiGroup Chat
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam (Route Param) {Number} id Mandatory Chat ID
 * @apiParam (Query Param) {String} [offset] number of elements you want to skip
 * @apiParamExample  {json} Request sample:
 * GET /chat/cc692a91-b8bd-4879-b7ae-57497a6db512/messages?offset=10
 * @apiParamExample  {json} Request sample:
 * GET /chat/cc692a91-b8bd-4879-b7ae-57497a6db512/messages
 * @apiSuccess {Object[]} messages Messages Collection
 * @apiSuccess {Number} messages.id User Id
 * @apiSuccess {String} messages.chatId the id of the chat
 * @apiSuccess {String} messages.type the type of the message
 * @apiSuccess {Number} messages.fromUserId user who sent the message
 * @apiSuccess {String} messages.content.text message text content
 * @apiSuccess {Date} messages.updated_at the updated at date
 * @apiSuccess {Date} messages.created_at the created at date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *		{
 *			"id": 2,
 *			"chatId": "cc692a91-b8bd-4879-b7ae-57497a6db512",
 *			"type": "text",
 *			"fromUserId": 21,
 *			"content": {
 *			"text": "Bom dia, está disponível?"
 *			},
 *			"created_at": "2020-12-17 19:10:53",
 *			"updated_at": "2020-12-17 19:10:53"
 *		},
 *		{
 *			"id": 1,
 *			"chatId": "cc692a91-b8bd-4879-b7ae-57497a6db512",
 *			"type": "text",
 *			"fromUserId": 21,
 *			"content": {
 *			"text": "Bom dia, está disponível?"
 *			},
 *			"created_at": "2020-12-17 19:07:53",
 *			"updated_at": "2020-12-17 19:07:53"
 *		}
 *	]
 * @apiUse AuthError
 * @apiErrorExample {json} The chat id is not in the correct format
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "BAD_FORMATTED_ID",
 *   			"message":"The chat id is not in the correct format"
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
 */
Route.get('chat/:id/messages', 'ChatController.index').middleware(['auth']);

/**
 * @api {post} /chat/:id/messages store a new message into a chat
 * @apiGroup Chat
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam {String} content.text message text
 * @apiParamExample  {json} Request sample:
 * {
 * 		"content": {
 *      	"text": "Bom dia",
 *      }
 * }
 * @apiSuccess {String} content content stringied
 * @apiSuccess {String} type type of the message
 * @apiSuccess {String} fromUserId user who sent the message
 * @apiSuccess {String} id id of the chat
 * @apiSuccess {String} id id of the message
 * @apiSuccess {Date} created_at created at date
 * @apiSuccess {Date} updated_at updated at date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  {
 *		"content": "{\"text\":\"Bom dia\"}",
 *		"type": "text",
 *		"fromUserId": 21,
 *		"chatId": "cc692a91-b8bd-4879-b7ae-57497a6db512",
 *		"created_at": "2020-12-17 19:07:53",
 *		"updated_at": "2020-12-17 19:07:53",
 *		"id": 1
 *  }
 * @apiUse AuthError
 * @apiErrorExample {json} The chat id is not in the correct format
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "BAD_FORMATTED_ID",
 *   			"message":"The chat id is not in the correct format"
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
 * @apiErrorExample {json} Validation Error: content Required
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
 * @apiErrorExample {json} Validation Error: content.text Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The content.text is required.",
 *       				"field": "content.text",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.post('chat/:id/messages', 'ChatController.store')
	.middleware(['auth'])
	.validator('ChatPostMessage');
