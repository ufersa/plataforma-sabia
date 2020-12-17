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
 * @apiParam (Query Param) {String} [object_type] type of entity
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
 */
Route.get('chat', 'ChatController.show').middleware(['auth']);

/**
 * @api {get} /chat/:id/messages get a list of the chat messages
 * @apiGroup Chat
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam (Query Param) {String} [offset] number of elements you want to skip
 * @apiParamExample  {json} Request sample:
 * GET /chat/cc692a91-b8bd-4879-b7ae-57497a6db512/messages?offset=10
 * * @apiParamExample  {json} Request sample:
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
 */
Route.post('chat/:id/messages', 'ChatController.store')
	.middleware(['auth'])
	.validator('ChatPostMessage');
