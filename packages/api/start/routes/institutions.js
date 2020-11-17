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
 *     "user_id": 1,
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
 *     "user_id": 1,
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
 * 	"user_id": 1,
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

/**
 * @api {post} /institutions Creates a new institution
 * @apiGroup Institutions
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam {String} name Institution name
 * @apiParam {String} initials Institution initials
 * @apiParam {String} cnpj Institution CNPJ
 * @apiParam {String} address Institution address
 * @apiParam {String} district Institution district
 * @apiParam {String} zipcode Institution zipcode
 * @apiParam {String} city Institution city
 * @apiParam {String} state Institution state
 * @apiParam {String} lat Institution latitude
 * @apiParam {String} lng Institution longitude
 * @apiParamExample  {json} Request sample:
 * {
 * 		"name": "Universidade Federal Rural do Semi-Árido",
 * 		"initials": "UFERSA",
 * 		"cnpj": "24.529.265/0001-40",
 * 		"address": "Rua Francisco Mota Bairro",
 * 		"district": "Pres. Costa e Silva",
 * 		"zipcode": "59625-900",
 * 		"city": "Mossoró",
 * 		"state": "RN",
 * 		"lat": "-5.2036578",
 * 		"lng": "-37.3251447"
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
 * HTTP/1.1 201 Created
 * {
 *  	"institution": {
 *  		"name": "Universidade Federal Rural do Semi-Árido",
 *  		"initials": "UFERSA",
 *  		"cnpj": "24.529.265/0001-40",
 *  		"address": "Rua Francisco Mota Bairro",
 *  		"district": "Pres. Costa e Silva",
 *  		"zipcode": "59625-900",
 *  		"city": "Mossoró",
 *  		"state": "RN",
 *  		"lat": "-5.2036578",
 *  		"lng": "-37.3251447",
 *  		"user_id": 11,
 *  		"created_at": "2020-11-16 20:45:22",
 *  		"updated_at": "2020-11-16 20:45:22",
 *  		"id": 3
 *  	}
 * }
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 * {
 *  	"error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 *  		"message":"Você não tem permissão para acessar esse recurso"
 *  	}
 * }
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {Object[]} error.message Error messages
 * @apiErrorExample {json} Validation Error: Unique CNPJ
 * HTTP/1.1 400 Bad Request
 * {
 *  	"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *    			{
 *      			"message": "The cnpj has already been taken by someone else.",
 *      			"field": "cnpj",
 *      			"validation": "unique"
 *    			}
 *   		]
 *  	}
 * }
 * @apiErrorExample {json} Validation Error: CNPJ Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The cnpj is required.",
 *       			"field": "cnpj",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 */
Route.post('institutions', 'InstitutionController.store')
	.middleware(['auth'])
	.validator('StoreInstitution');

/**
 * @api {put} /institutions/:id Updates a Institution
 * @apiGroup Institutions
 * @apiPermission UPDATE_INSTITUTION or UPDATE_INSTITUTIONS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam (Route Param) {Number} id Mandatory Institution ID
 * @apiParam {String} [name] Institution name
 * @apiParam {String} [initials] Institution initials
 * @apiParam {String} [cnpj] Institution CNPJ
 * @apiParam {String} [address] Institution address
 * @apiParam {String} [district] Institution district
 * @apiParam {String} [zipcode] Institution zipcode
 * @apiParam {String} [city] Institution city
 * @apiParam {String} [state] Institution state
 * @apiParam {String} [lat] Institution latitude
 * @apiParam {String} [lng] Institution longitude
 * @apiParamExample  {json} Request sample:
 * {
 * 		"district": "Presidente Costa e Silva"
 * }
 * @apiSuccessExample {json} Success
 * HTTP/1.1 204 OK
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 *	{
 * 		"error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 *  		"message":"Você não tem permissão para acessar esse recurso"
 * 		}
 *	}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Institution was not found
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *  		"error_code": "RESOURCE_NOT_FOUND",
 *  		"message":"The resource Institution was not found"
 * 		}
 * }
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {Object[]} error.message Error messages
 * @apiErrorExample {json} Validation Error: Unique CNPJ
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The cnpj has already been taken by someone else.",
 *       			"field": "cnpj",
 *     				"validation": "unique"
 *  			}
 *  		]
 * 		}
 *	}
 */
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
