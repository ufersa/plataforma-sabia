/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const Route = use('Route');
const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

/** Institution routes */
/**
 * @api {get} /institutions Lists all institutions
 * @apiGroup Institutions
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer <token>"
 * }
 * @apiSuccess {Number} id Institution id
 * @apiSuccess {String} user_id Institution owner id
 * @apiSuccess {String} name Institution name
 * @apiSuccess {String} initials Institution initials
 * @apiSuccess {String} cnpj Institution CNPJ
 * @apiSuccess {String} address Institution address
 * @apiSuccess {String} district Institution district
 * @apiSuccess {String} zipcode Institution zipcode
 * @apiSuccess {String} city Institution city
 * @apiSuccess {String} state Institution state
 * @apiSuccess {String} lat Institution latitude
 * @apiSuccess {String} lng Institution longitude
 * @apiSuccess {Date} created_at Institution register date
 * @apiSuccess {Date} updated_at Institution update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "user_id": null,
 *     "name": "OfficeMax Inc",
 *     "initials": "OM",
 *     "cnpj": "103624329578606009",
 *     "address": "781 Kopve Circle",
 *     "district": "ZtF9PpIXQUO5xCTSlR",
 *     "zipcode": "19763",
 *     "city": "Kedota",
 *     "state": "MS",
 *     "lat": "19.88653",
 *     "lng": "98.69621",
 *     "created_at": "2020-11-15 13:49:00",
 *     "updated_at": "2020-11-15 13:49:00"
 *   },
 *   {
 *     "id": 2,
 *     "user_id": null,
 *     "name": "EGL Inc.",
 *     "initials": "EGL",
 *     "cnpj": "708323017099837298",
 *     "address": "1516 Witten Highway",
 *     "district": "#z8h7hjC^^ASgWT8QXR4",
 *     "zipcode": "42901",
 *     "city": "Zuwinda",
 *     "state": "VT",
 *     "lat": "-25.53688",
 *     "lng": "-124.62155",
 *     "created_at": "2020-11-15 13:49:01",
 *     "updated_at": "2020-11-15 13:49:01"
 *   }
 * ]
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 * {
 * 		error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 * 		 	"message": "Você não tem permissão para acessar esse recurso"
 * 	 	}
 * }
 */
Route.get('institutions', 'InstitutionController.index').middleware(['handleParams', 'auth']);

/**
 * @api {get} /institutions/:id Gets a single institution
 * @apiGroup Institutions
 * @apiUse Params
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer <token>"
 * }
 * @apiParam (Route Param) {Number} id Mandatory Institution ID
 * @apiParamExample  {json} Request sample:
 *	/institutions/1
 * @apiSuccess {Number} id Institution id
 * @apiSuccess {String} user_id Institution owner id
 * @apiSuccess {String} name Institution name
 * @apiSuccess {String} initials Institution initials
 * @apiSuccess {String} cnpj Institution CNPJ
 * @apiSuccess {String} address Institution address
 * @apiSuccess {String} district Institution district
 * @apiSuccess {String} zipcode Institution zipcode
 * @apiSuccess {String} city Institution city
 * @apiSuccess {String} state Institution state
 * @apiSuccess {String} lat Institution latitude
 * @apiSuccess {String} lng Institution longitude
 * @apiSuccess {Date} created_at Institution register date
 * @apiSuccess {Date} updated_at Institution update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 * 	"id": 1,
 * 	"user_id": null,
 * 	"name": "OfficeMax Inc",
 * 	"initials": "OM",
 * 	"cnpj": "103624329578606009",
 * 	"address": "781 Kopve Circle",
 * 	"district": "ZtF9PpIXQUO5xCTSlR",
 * 	"zipcode": "19763",
 * 	"city": "Kedota",
 * 	"state": "MS",
 * 	"lat": "19.88653",
 * 	"lng": "98.69621",
 * 	"created_at": "2020-11-15 13:49:00",
 * 	"updated_at": "2020-11-15 13:49:00"
 * }
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 * {
 * 		error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 * 		 	"message": "Você não tem permissão para acessar esse recurso"
 * 	 	}
 * }
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Institution was not found
 * HTTP/1.1 400 Bad Request
 * {
 *  	"error": {
 *    		"error_code": "RESOURCE_NOT_FOUND",
 *    		"message":"The resource Institution was not found"
 * 		}
 * }
 */
Route.get('institutions/:id', 'InstitutionController.show').middleware(['handleParams', 'auth']);

Route.post('institutions', 'InstitutionController.store')
	.middleware(['auth'])
	.validator('StoreInstitution');

Route.put('institutions/:id', 'InstitutionController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_INSTITUTION, permissions.UPDATE_INSTITUTIONS]),
	])
	.validator('UpdateInstitution');

Route.delete('institutions/:id', 'InstitutionController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_INSTITUTION, permissions.DELETE_INSTITUTIONS]),
]);
