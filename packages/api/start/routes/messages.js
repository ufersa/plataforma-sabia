/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');
/**
 * @api {get} /messages Lists All User Messages
 * @apiGroup Messages
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Query Param) {String} [subject] Filters by subject
 * @apiParam (Query Param) {String} [content] Filters by content
 * @apiParam (Query Param) {String="new","read"} [status] Filters by message status
 * @apiParam (Query Param) {String="email","notification"} [type] Filters by message type
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /messages?status=new
 * @apiSuccess {Object[]} messages Message Collection
 * @apiSuccess {Number} messages.id Message ID.
 * @apiSuccess {Number} messages.user_id Owner message User ID.
 * @apiSuccess {String} messages.subject Message subject.
 * @apiSuccess {String} messages.content Message content.
 * @apiSuccess {String="new","read"} messages.status Message status
 * @apiSuccess {String="email","notification"} messages.type Message type
 * @apiSuccess {Date} messages.created_at Message Register date
 * @apiSuccess {Date} messages.updated_at Message Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 2,
 *	   "user_id": 11,
 *	   "subject": "Sabiá Platform - New Technology Question",
 *	   "content": "<h2> Olá FirstName LastName </h2>\n\n<p>\n  Uma pergunta para sua tecnologia Ekemeddo imiuche jabcovu. foi feito pela plataforma, acesse sua área do pesquisador, menu perguntas para mais informações. <br />\n  <strong>Pergunta:</strong> Vocês dão suporte a implantação?\n</p>\n\n<p>\n  Atenciosamente, <br />\n  Equipe Plataforma Sabiá\n</p>\n",
 *	   "status": "new",
 *	   "type": "email",
 *	   "created_at": "2020-12-09 15:34:28",
 *	   "updated_at": "2020-12-09 15:34:28"
 *	 }
 *	]
 * @apiUse AuthError
 */
Route.get('messages', 'MessageController.index').middleware(['auth', 'handleParams']);
/**
 * @api {get} /messages/new Gets the count of new messages of the logged user
 * @apiGroup Messages
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 *	/messages/new
 * @apiSuccess {Number} total_new_messages number of new messages
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "total_new_messages": 3
 * }
 * @apiUse AuthError
 */
Route.get('messages/new', 'MessageController.getCountNewMessages').middleware(['auth']);
/**
 * @api {get} /messages/:id Gets a single user message
 * @apiDescription Only owner user can view the message. After viewed the message status changes to READ.
 * @apiGroup Messages
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Message ID.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /messages/1
 * @apiSuccess {Number} id Message ID.
 * @apiSuccess {Number} user_id Owner message User ID.
 * @apiSuccess {String} subject Message subject.
 * @apiSuccess {String} content Message content.
 * @apiSuccess {String="read"} status Message status
 * @apiSuccess {String="email","notification"} type Message type
 * @apiSuccess {Date} created_at Message Register date
 * @apiSuccess {Date} updated_at Message Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 1,
 *  "user_id": 1,
 *  "subject": "Sabiá Platform - New Technology Question",
 *  "content": "<h2> Olá dqorvomgP Pwh73zA3hEMBTq </h2>\n\n<p>\n  Uma pergunta para sua tecnologia undefined foi feito pela plataforma, acesse sua área do pesquisador, menu perguntas para mais informações. <br />\n  <strong>Pergunta:</strong> Vocês dão suporte a implantação?\n</p>\n\n<p>\n  Atenciosamente, <br />\n  Equipe Plataforma Sabiá\n</p>\n",
 *  "status": "read",
 *  "type": "email",
 *  "created_at": "2020-12-09 14:44:13",
 *  "updated_at": "2020-12-11 14:58:50"
 * }
 * @apiUse AuthError
 * @apiErrorExample {json} Resource Message was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Message was not found"
 * 			}
 *		}
 */
Route.get('messages/:id', 'MessageController.show').middleware(['auth', 'handleParams']);
/**
 * @api {post} /messages Creates a new message
 * @apiDescription Only ADMIN user can create a new message and delivery to a user.
 * @apiGroup Messages
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} to Mandatory recipient email. Should be exists in users.
 * @apiParam {String} subject Mandatory message subject.
 * @apiParam {String} content Mandatory message content.
 * @apiParam {String="email","notification"} type Mandatory Message type
 * @apiSuccess {Number} id Message ID.
 * @apiSuccess {Number} user_id Owner message User ID.
 * @apiSuccess {String} subject Message subject.
 * @apiSuccess {String} content Message content.
 * @apiSuccess {String="new"} status Message status
 * @apiSuccess {String="email","notification"} type Message type
 * @apiSuccess {Date} created_at Message Register date
 * @apiSuccess {Date} updated_at Message Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "subject": "New Notification",
 *  "content": "Você precisa finalizar seu cadastro",
 *  "type": "notification",
 *  "created_at": "2020-12-12 19:02:24",
 *  "updated_at": "2020-12-12 19:02:24",
 *  "id": 9,
 *  "user_id": 18
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
 * @apiErrorExample {json} Validation Error: to Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "to is required.",
 *                		"field": "to",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: to should exist in users
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The to should exist in users.",
 *                		"field": "to",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: subject Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "subject is required.",
 *                		"field": "subject",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: content Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "content is required.",
 *                		"field": "content",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: type Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "type is required.",
 *                		"field": "type",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: type should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The type should fall within defined values of (email,notification).",
 *                		"field": "type",
 *                		"validation": "in"
 *            		}
 *        		]
 *   		}
 *		}
 */
Route.post('messages', 'MessageController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('StoreMessage');
/**
 * @api {put} /messages/mark-as-read Marks user messages as read
 * @apiDescription The user only can mark as read your own messages. The messages status changes to READ.
 * @apiGroup Messages
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number[]} messages Message ID Array.
 * @apiSuccess {Number} Number of marked as read messages
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * 3
 * @apiUse AuthError
 * @apiErrorExample {json} Validation Error: messages Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "messages is required.",
 *                		"field": "messages",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The messages.[index] should exist in messages
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The messages.0 should exist in messages.",
 *                		"field": "messages.0",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 */
Route.put('messages/mark-as-read', 'MessageController.markAsRead')
	.middleware(['auth'])
	.validator('markMessages');
/**
 * @api {put} /messages/mark-as-new Marks user messages as new
 * @apiDescription The user only can mark as new your own messages. The messages status changes to NEW.
 * @apiGroup Messages
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number[]} messages Message ID Array.
 * @apiSuccess {Number} Number of marked as new messages
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * 3
 * @apiUse AuthError
 * @apiErrorExample {json} Validation Error: messages Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "messages is required.",
 *                		"field": "messages",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The messages.[index] should exist in messages
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The messages.0 should exist in messages.",
 *                		"field": "messages.0",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 */
Route.put('messages/mark-as-new', 'MessageController.markAsNew')
	.middleware(['auth'])
	.validator('markMessages');
/**
 * @api {delete} /messages Delete multiple messages
 * @apiDescription The user only can delete your own messages.
 * @apiGroup Messages
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} ids List of messages IDs.
 * @apiParamExample  {json} Request sample:
 *	/messages?ids=1,2,3
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
 * @apiErrorExample {json} Validation Error: Ids Required
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

Route.delete('messages', 'MessageController.destroyMany')
	.middleware(['auth', 'handleParams'])
	.validator('DeleteMany');
