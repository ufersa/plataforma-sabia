/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/**
 * @api {get} /questions Gets the questions of the logged in user
 * @apiGroup Technology Questions
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 *	/questions
 * @apiSuccess {Object[]} questions User Technology Questions
 * @apiSuccess {Number} questions.id Question ID.
 * @apiSuccess {Number} questions.technology_id Technology ID.
 * @apiSuccess {Number} questions.user_id Buyer User ID.
 * @apiSuccess {String} questions.question Technology question.
 * @apiSuccess {String} questions.answer Technology question answer.
 * @apiSuccess {String} questions.status Technology Question Status.
 * @apiSuccess {Date} questions.created_at Order Register date
 * @apiSuccess {Date} questions.updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *	{
 *	   "id": 24,
 *	   "user_id": 1,
 *	   "technology_id": 1,
 *	   "question": "Rejib gucta jutucu limzurrip padpocre.",
 *	   "answer": "Ga nukuso ovulova fem keibe pivobe co kiopi esi eke badeofi wemsadwo ducvamah tugi pul vebho ujakad.",
 *	   "status": "unanswered",
 *	   "created_at": "2020-11-25 18:15:40",
 *	   "updated_at": "2020-11-25 18:15:40"
 *	}
 * ]
 * @apiUse AuthError
 */
Route.get('questions', 'TechnologyQuestionController.index').middleware(['auth', 'handleParams']);
/**
 * @api {get} /questions/unanswered Gets the count of unanswered questions of the logged in user
 * @apiGroup Technology Questions
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 *	/questions/unanswered
 * @apiSuccess {Number} total_unanswered number of unanswered questions
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "total_unanswered": 3
 * }
 * @apiUse AuthError
 */
Route.get(
	'questions/unanswered',
	'TechnologyQuestionController.getCountUnansweredQuestions',
).middleware(['auth']);
/**
 * @api {get} /questions/:id Shows a public question
 * @apiGroup Technology Questions
 * @apiParamExample  {json} Request sample:
 *	/questions/33
 * @apiParam (Route Param) {Number} id Mandatory Technology Question ID
 * @apiUse Params
 * @apiSuccess {Number} id Question ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Number} user_id Buyer User ID.
 * @apiSuccess {String} question Technology question.
 * @apiSuccess {String} answer Technology question answer.
 * @apiSuccess {String} status Technology Question Status.
 * @apiSuccess {Date} created_at Order Register date
 * @apiSuccess {Date} updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 33,
 *  "user_id": 15,
 *  "technology_id": 8,
 *  "question": "Osvageb ivi potcajum suhhom barsozin.",
 *  "answer": "A resposta é a seguinte: Damos suporte sim.",
 *  "status": "answered",
 *  "created_at": "2020-11-25 19:42:23",
 *  "updated_at": "2020-11-25 21:40:34"
 * }
 * @apiErrorExample {json} Resource TechnologyQuestion was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyQuestion was not found"
 * 			}
 *		}
 */
Route.get('questions/:id', 'TechnologyQuestionController.show').middleware(['handleParams']);
/**
 * @api {post} /questions Makes a technology question
 * @apiGroup Technology Questions
 * @apiParam {String} question Mandatory Question
 * @apiParam {Number|String} technology Mandatory Technology ID or Slug
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Number} id Question ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Number} user_id Buyer User ID.
 * @apiSuccess {String} question Technology question.
 * @apiSuccess {String="unanswered"} status Technology Question Status.
 * @apiSuccess {Date} created_at Order Register date
 * @apiSuccess {Date} updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "question": "Vocês dão suporte a implantação?",
 *  "status": "unanswered",
 *  "created_at": "2020-11-23 19:49:33",
 *  "updated_at": "2020-11-23 19:49:33",
 *  "id": 3,
 *  "technology_id": 1,
 *  "user_id": 18
 *	}
 * @apiUse AuthError
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
Route.post('/questions', 'TechnologyQuestionController.store')
	.middleware(['auth', 'registrationCompleted:check_personal_data'])
	.validator('MakeQuestion');

/**
 * @api {put} questions/:id/answer Answers a question
 * @apiGroup Technology Questions
 * @apiPermission ANSWER_TECHNOLOGY_QUESTION
 * @apiParam (Route Param) {Number} id Mandatory Technology Question ID
 * @apiParam {String} answer Mandatory Answer
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 *	questions/33/answer
 * @apiSuccess {Number} id Question ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Number} user_id Buyer User ID.
 * @apiSuccess {String} question Technology question.
 * @apiSuccess {String="answered"} status Technology Question Status.
 * @apiSuccess {Date} created_at Order Register date
 * @apiSuccess {Date} updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 33,
 *  "user_id": 15,
 *  "technology_id": 8,
 *  "question": "Osvageb ivi potcajum suhhom barsozin.",
 *  "answer": "A resposta é a seguinte: Damos suporte sim.",
 *  "status": "answered",
 *  "created_at": "2020-11-25 19:42:23",
 *  "updated_at": "2020-11-25 21:40:34"
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
 * @apiErrorExample {json} Resource TechnologyQuestion was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyQuestion was not found"
 * 			}
 *		}
 */
Route.put('questions/:id/answer', 'TechnologyQuestionController.update')
	.middleware(['auth', getMiddlewarePermissions([permissions.ANSWER_TECHNOLOGY_QUESTION])])
	.validator('AnswerQuestion');
/**
 * @api {put} questions/:id/disable Disables a question
 * @apiGroup Technology Questions
 * @apiPermission DISABLE_TECHNOLOGY_QUESTION
 * @apiParam (Route Param) {Number} id Mandatory Technology Question ID
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 *	/questions/24/disable
 * @apiSuccess {Number} id Question ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Number} user_id Buyer User ID.
 * @apiSuccess {String} question Technology question.
 * @apiSuccess {String="disabled"} status Technology Question Status.
 * @apiSuccess {Date} created_at Order Register date
 * @apiSuccess {Date} updated_at Order Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 24,
 *  "user_id": 1,
 *  "technology_id": 1,
 *  "question": "Rejib gucta jutucu limzurrip padpocre.",
 *  "answer": "Ga nukuso ovulova fem keibe pivobe co kiopi esi eke badeofi wemsadwo ducvamah tugi pul vebho ujakad.",
 *  "status": "disabled",
 *  "created_at": "2020-11-25 18:15:40",
 *  "updated_at": "2020-11-28 15:06:31"
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
 * @apiErrorExample {json} Resource TechnologyQuestion was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyQuestion was not found"
 * 			}
 *		}
 */
Route.put('questions/:id/disable', 'TechnologyQuestionController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DISABLE_TECHNOLOGY_QUESTION]),
]);
