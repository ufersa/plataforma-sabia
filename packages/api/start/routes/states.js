/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/** State routes */
/**
 * @api {get} /states Gets all states
 * @apiParam {String} name Optional state name or initials to filter
 * @apiParamExample {json} Request sample:
 * /states/?name=rio
 * @apiGroup States
 * @apiSuccess {Number} id State id
 * @apiSuccess {String} name State name
 * @apiSuccess {String} initials State initials
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 33,
 *     "name": "Rio de Janeiro",
 *     "initials": "RJ"
 *   },
 *   {
 *     "id": 24,
 *     "name": "Rio Grande do Norte",
 *     "initials": "RN"
 *   },
 *   {
 *     "id": 43,
 *     "name": "Rio Grande do Sul",
 *     "initials": "RS"
 *   }
 * ]
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: Maximum name length
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     "error_code": "VALIDATION_ERROR",
 *     "message": [
 *       {
 *         "message": "The name should not be more than 30.",
 *         "field": "name",
 *         "validation": "max"
 *       }
 *     ]
 *   }
 * }
 */
Route.get('states', 'StateController.index').validator('GetState');

/**
 * @api {get} /states/:id/cities Gets all cities in a given state
 * @apiGroup States
 * @apiParam (Route Param) {Number} id Mandatory State ID
 * @apiParamExample {json} Request sample:
 * /states/43/cities
 * @apiParam {String} name Optional city name to filter
 * @apiParamExample {json} Request sample:
 * /states/43/cities?name=gramado
 * @apiSuccess {Number} id City id
 * @apiSuccess {String} name City name
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 4300034,
 *     "name": "Aceguá"
 *   },
 *   {
 *     "id": 4300059,
 *     "name": "Água Santa"
 *   }
 * ]
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: Maximum name length
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     "error_code": "VALIDATION_ERROR",
 *     "message": [
 *       {
 *         "message": "The name should not be more than 50.",
 *         "field": "name",
 *         "validation": "max"
 *       }
 *     ]
 *   }
 * }
 */
Route.get('states/:id/cities', 'StateController.cities').validator('GetCity');
