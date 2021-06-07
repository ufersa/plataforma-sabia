/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

/**
 * @api {get} /locations Lists All Locations
 * @apiGroup Locations
 * @apiParam (Query Param) {Number} [city_id] Filters by city
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /locations?city_id=2408003
 * @apiSuccess {Object[]} locations Locaction Collection
 * @apiSuccess {Number} locations.id location ID.
 * @apiSuccess {String} locations.place_id location google place ID.
 * @apiSuccess {String} locations.address location address.
 * @apiSuccess {String} locations.city_id City id in cities.
 * @apiSuccess {String} locations.lat Latitude.
 * @apiSuccess {String} locations.lng Longitude.
 * @apiSuccess {Date} locations.created_at Location Register date
 * @apiSuccess {Date} locations.updated_at Location Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *		 {
 *		   "id": 1,
 *		   "place_id": "ChIJC87VdOAGugcRvp7xXf5PaUY",
 *		   "address": "Mossoró Centro da cidade",
 *		   "city_id": 2408003,
 *		   "lat": "-5.188568",
 *		   "lng": "-37.341648",
 *		   "created_at": "2021-05-24 19:39:54",
 *		   "updated_at": "2021-05-25 18:19:19"
 *		 },
 *		 {
 *		   "id": 2,
 *		   "place_id": "ChIJvVKrU2wHugcRbrBuRzXZaE8",
 *		   "address": "UFERSA",
 *		   "city_id": 2408003,
 *		   "lat": "-5.188569",
 *		   "lng": "-37.341641",
 *		   "created_at": "2021-05-25 18:26:19",
 *		   "updated_at": "2021-05-25 18:26:19"
 *	 	}
 *	]
 */
Route.get('locations', 'LocationController.index').middleware(['handleParams']);
/**
 * @api {get} /locations/:id Gets an single Location
 * @apiGroup Locations
 * @apiParam (Route Param) {Number} id location id or place_id
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /locations/ChIJvVKrU2wHugcRbrBuRzXZaE8
 * @apiSuccess {Number} id location ID.
 * @apiSuccess {String} place_id location google place ID.
 * @apiSuccess {String} address location address.
 * @apiSuccess {String} city_id City id in cities.
 * @apiSuccess {String} lat Latitude.
 * @apiSuccess {String} lng Longitude.
 * @apiSuccess {Date} created_at Location Register date
 * @apiSuccess {Date} updated_at Location Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 2,
 *	 "place_id": "ChIJvVKrU2wHugcRbrBuRzXZaE8",
 *	 "address": "UFERSA",
 *	 "city_id": 2408003,
 *	 "lat": "-5.188569",
 *	 "lng": "-37.341641",
 *	 "created_at": "2021-05-25 18:26:19",
 *	 "updated_at": "2021-05-25 18:26:19"
 *	}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Location was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Location was not found"
 * 			}
 *		}
 */
Route.get('locations/:id', 'LocationController.show').middleware(['handleParams']);
/**
 * @api {post} /locations Creates a new location
 * @apiGroup Locations
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} place_id Mandatory Google Place ID
 * @apiParam {String} address Mandatory Address
 * @apiParam {Number} city_id Mandatory City ID in cities
 * @apiParam {String} lat location latitude
 * @apiParam {String} lng location longitude
 * @apiSuccess {Number} id location ID.
 * @apiSuccess {String} place_id location google place ID.
 * @apiSuccess {String} address location address.
 * @apiSuccess {String} city_id City id in cities.
 * @apiSuccess {String} lat Latitude.
 * @apiSuccess {String} lng Longitude.
 * @apiSuccess {Date} created_at Location Register date
 * @apiSuccess {Date} updated_at Location Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "location": {
 *	   "place_id": "ChIJvVKrU2wHugcRbrBuRzXZaE8",
 *	   "address": "UFERSA",
 *	   "city_id": 2408003,
 *	   "lat": "-5.188569",
 *	   "lng": "-37.341641",
 *	   "created_at": "2021-05-25 18:26:19",
 *	   "updated_at": "2021-05-25 18:26:19",
 *	   "id": 2,
 *	   "city": {
 *	     "id": 2408003,
 *	     "name": "Mossoró"
 *	   }
 *	 }
 *	}
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: place_id Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "place_id is required.",
 *                		"field": "place_id",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: place_id Unique
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The place_id has already been taken by someone else.",
 *                		"field": "place_id",
 *                		"validation": "unique"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: address Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "address is required.",
 *                		"field": "address",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: city_id Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "city_id is required.",
 *                		"field": "city_id",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: city_id should exist in cities
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The city_id should exist in cities.",
 *                		"field": "city_id",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: lat Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "lat is required.",
 *                		"field": "lat",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: lng Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "lng is required.",
 *                		"field": "lng",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * */
Route.post('locations', 'LocationController.store')
	.middleware(['auth'])
	.validator('StoreLocation');
/**
 * @api {put} /locations/:id Updates a location
 * @apiGroup Locations
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id location id
 * @apiParam {String} [place_id] Google Place ID
 * @apiParam {String} [address] Address
 * @apiParam {Number} [city_id] City ID in cities
 * @apiParam {String} [lat] location latitude
 * @apiParam {String} [lng] location longitude
 * @apiSuccess {Number} id location ID.
 * @apiSuccess {String} place_id location google place ID.
 * @apiSuccess {String} address location address.
 * @apiSuccess {String} city_id City id in cities.
 * @apiSuccess {String} lat Latitude.
 * @apiSuccess {String} lng Longitude.
 * @apiSuccess {Date} created_at Location Register date
 * @apiSuccess {Date} updated_at Location Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 1,
 *	 "place_id": "ChIJC87VdOAGugcRvp7xXf5PaUY",
 *	 "address": "Mossoró Centro da cidade",
 *	 "city_id": 2408003,
 *	 "lat": "-5.188568",
 *	 "lng": "-37.341648",
 *	 "created_at": "2021-05-24 19:39:54",
 *	 "updated_at": "2021-05-25 18:19:19",
 *	 "city": {
 *	   "id": 2408003,
 *	   "name": "Mossoró"
 *	 }
 *	}
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: place_id Unique
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The place_id has already been taken by someone else.",
 *                		"field": "place_id",
 *                		"validation": "unique"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: city_id should exist in cities
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The city_id should exist in cities.",
 *                		"field": "city_id",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Resource Location was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Location was not found"
 * 			}
 *		}
 * */
Route.put('locations/:id', 'LocationController.update')
	.middleware(['auth'])
	.validator('UpdateLocation');
/**
 * @api {delete} /locations/:id Deletes a Location
 * @apiGroup Locations
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Location ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /locations/1
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
 * @apiErrorExample {json} Resource Location was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Location was not found"
 * 			}
 *		}
 */
Route.delete('locations/:id', 'LocationController.destroy').middleware(['auth']);
