/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/** Contact routes */
/**
 * @api {post} /contact Send mail
 * @apiGroup Contact
 * @apiParam {String} name User name
 * @apiParam {String} email User mail
 * @apiParam {String} phone User phone
 * @apiParam {String} subject Mail subject
 * @apiParam {String} message Mail message
 * @apiParamExample  {json} Request sample:
 *    {
 *		"name": "any name",
 *		"email": "any@mail.com",
 *		"phone": "any number",
 *		"subject": "any subject",
 *		"message": "any message"
 *    }
 * @apiSuccessExample {json} Success
 * HTTP/1.1 204 OK
 * @apiErrorExample {json} Validation Error: Message Required
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     "error_code": "VALIDATION_ERROR",
 *     "message": [
 *       {
 *         "message": "The message is required.",
 *         "field": "message",
 *         "validation": "required"
 *       }
 *     ]
 *   }
 * }
 */
Route.get('cities', 'CityController.index')
	.middleware('handleParams')
	.validator('GetCity');
