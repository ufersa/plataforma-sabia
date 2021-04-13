/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const Route = use('Route');
const {
	getMiddlewarePermissions,
	permissions,
	getMiddlewareRoles,
	roles,
} = require('../../app/Utils/roles_capabilities');
/** Institution routes */
/**
 * @api {get} /institutions Lists all institutions
 * @apiGroup Institutions
 * @apiUse Params
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer <token>"
 * }
 * @apiSuccess {Object[]} institutions Institution collection
 * @apiSuccess {Number} institutions.id Institution id
 * @apiSuccess {String} institutions.responsible Institution owner id
 * @apiSuccess {String} institutions.name Institution name
 * @apiSuccess {String} institutions.initials Institution initials
 * @apiSuccess {String} institutions.cnpj Institution CNPJ
 * @apiSuccess {String} institutions.address Institution address
 * @apiSuccess {String} institutions.district Institution district
 * @apiSuccess {String} institutions.zipcode Institution zipcode
 * @apiSuccess {String} institutions.city Institution city
 * @apiSuccess {String} institutions.state Institution state
 * @apiSuccess {String} institutions.lat Institution latitude
 * @apiSuccess {String} institutions.lng Institution longitude
 * @apiSuccess {String} institutions.email Institution email
 * @apiSuccess {String} institutions.phone_number Institution Phone Number
 * @apiSuccess {String} institutions.website Institution Web Site
 * @apiSuccess {String} institutions.logo_id Institution Logo ID
 * @apiSuccess {String='public','private','mixed','other'} institutions.type Institution Type
 * @apiSuccess {String='university','institute','association','foundation','cooperative','company','other'} institutions.category Institution Category
 * @apiSuccess {Date} institutions.created_at Institution register date
 * @apiSuccess {Date} institutions.updated_at Institution update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 	{
 *	 	  "id": 1,
 *	 	  "responsible": 11,
 *	 	  "name": "Universidade Federal Rural do Semi-Árido",
 *	 	  "initials": "UFERSA",
 *	 	  "cnpj": "24.529.265/0001-40",
 *	 	  "address": "Av .Francisco Mota, 572",
 *	 	  "district": "Costa e Silva",
 *	 	  "zipcode": "59.625-900",
 *	 	  "city": "Mossoró",
 *	 	  "state": "RN",
 *	 	  "lat": "-5.2041563",
 *	 	  "lng": "-37.3245685",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-16 15:33:05",
 *	 	  "email": "ufersa@ufersa.edu.br",
 *	 	  "phone_number": "84 33178243",
 *	 	  "website": "http://www.ufersa.edu.br",
 *	 	  "logo_id": 1,
 *	 	  "type": "public",
 *	 	  "category": "university"
 *	 	},
 *	 	{
 *	 	  "id": 2,
 *	 	  "responsible": 1,
 *	 	  "name": "Georgia-Pacific Corporation",
 *	 	  "initials": "VSOYL",
 *	 	  "cnpj": "41.513.995/1972-03",
 *	 	  "address": "1262 Hizdet View",
 *	 	  "district": "1TTx9Z8",
 *	 	  "zipcode": "76201",
 *	 	  "city": "Tizioso",
 *	 	  "state": "DE",
 *	 	  "lat": "42.00638",
 *	 	  "lng": "116.62478",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 3,
 *	 	  "responsible": 2,
 *	 	  "name": "CDI Corp.",
 *	 	  "initials": "CJUSN",
 *	 	  "cnpj": "71.066.526/6152-30",
 *	 	  "address": "437 Wawiv Point",
 *	 	  "district": "eFl6[tx3Qgv",
 *	 	  "zipcode": "67247",
 *	 	  "city": "Luhhela",
 *	 	  "state": "NM",
 *	 	  "lat": "-8.53629",
 *	 	  "lng": "-41.90592",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 4,
 *	 	  "responsible": 5,
 *	 	  "name": "United Technologies Corporation",
 *	 	  "initials": "LCRRB",
 *	 	  "cnpj": "23.621.465/4391-18",
 *	 	  "address": "1365 Aramul River",
 *	 	  "district": "QXV@wWW^FF",
 *	 	  "zipcode": "99993",
 *	 	  "city": "Rejuot",
 *	 	  "state": "NH",
 *	 	  "lat": "73.13265",
 *	 	  "lng": "112.7549",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 5,
 *	 	  "responsible": 7,
 *	 	  "name": "Devon Energy Corporation",
 *	 	  "initials": "YCPJO",
 *	 	  "cnpj": "43.735.672/1593-62",
 *	 	  "address": "417 Idbi Ridge",
 *	 	  "district": "IguyePCSO!FpE",
 *	 	  "zipcode": "87828",
 *	 	  "city": "Utudada",
 *	 	  "state": "ND",
 *	 	  "lat": "20.59843",
 *	 	  "lng": "142.88109",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 6,
 *	 	  "responsible": 8,
 *	 	  "name": "The MONY Group Inc.",
 *	 	  "initials": "CZGAF",
 *	 	  "cnpj": "60.520.676/7927-45",
 *	 	  "address": "1818 Ceiga Terrace",
 *	 	  "district": "BuEb93^[VQZuBTchTXq",
 *	 	  "zipcode": "09428",
 *	 	  "city": "Rebkudnip",
 *	 	  "state": "HI",
 *	 	  "lat": "49.64306",
 *	 	  "lng": "64.38074",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 7,
 *	 	  "responsible": 11,
 *	 	  "name": "Loews Corporation",
 *	 	  "initials": "CECHF",
 *	 	  "cnpj": "40.294.263/5486-37",
 *	 	  "address": "1469 Oraiwe Point",
 *	 	  "district": "GAbabe9ib879*9BTXH",
 *	 	  "zipcode": "73949",
 *	 	  "city": "Ufgohle",
 *	 	  "state": "CO",
 *	 	  "lat": "48.59921",
 *	 	  "lng": "121.21646",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 8,
 *	 	  "responsible": 11,
 *	 	  "name": "Pier 1 Imports Inc.",
 *	 	  "initials": "SLHRJ",
 *	 	  "cnpj": "91.864.364/7278-65",
 *	 	  "address": "1778 Zagmo Path",
 *	 	  "district": "Na[U&i7Hk]r$S[O",
 *	 	  "zipcode": "40017",
 *	 	  "city": "Misawfum",
 *	 	  "state": "DE",
 *	 	  "lat": "83.58696",
 *	 	  "lng": "94.01422",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 9,
 *	 	  "responsible": 12,
 *	 	  "name": "Weis Markets Inc.",
 *	 	  "initials": "MVOBY",
 *	 	  "cnpj": "13.774.402/0327-22",
 *	 	  "address": "297 Rulguc Street",
 *	 	  "district": "]ezt%R8mK[",
 *	 	  "zipcode": "24847",
 *	 	  "city": "Wibudfa",
 *	 	  "state": "WA",
 *	 	  "lat": "-19.44385",
 *	 	  "lng": "-152.17818",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	},
 *	 	{
 *	 	  "id": 10,
 *	 	  "responsible": 3,
 *	 	  "name": "R.J. Reynolds Tobacco Company",
 *	 	  "initials": "OVZWG",
 *	 	  "cnpj": "79.378.832/0079-78",
 *	 	  "address": "408 Zahsak Heights",
 *	 	  "district": "UTHTFZ$bmg7sWtRFo1@j",
 *	 	  "zipcode": "60575",
 *	 	  "city": "Wuvazdi",
 *	 	  "state": "AL",
 *	 	  "lat": "-50.37175",
 *	 	  "lng": "-91.8321",
 *	 	  "created_at": "2020-12-14 21:08:26",
 *	 	  "updated_at": "2020-12-14 21:08:26",
 *	 	  "email": null,
 *	 	  "phone_number": null,
 *	 	  "website": null,
 *	 	  "logo_id": null,
 *	 	  "type": "other",
 *	 	  "category": "other"
 *	 	}
 *	 ]
 * @apiUse AuthError
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
 * @apiSuccess {String} responsible Institution owner id
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
 * @apiSuccess {String} email Institution email
 * @apiSuccess {String} phone_number Institution Phone Number
 * @apiSuccess {String} website Institution Web Site
 * @apiSuccess {String} logo_id Institution Logo ID
 * @apiSuccess {String='public','private','mixed','other'} type Institution Type
 * @apiSuccess {String='university','institute','association','foundation','cooperative','company','other'} category Institution Category
 * @apiSuccess {Date} created_at Institution register date
 * @apiSuccess {Date} updated_at Institution update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	  "id": 1,
 *	  "responsible": 11,
 *	  "name": "Universidade Federal Rural do Semi-Árido",
 *	  "initials": "UFERSA",
 *	  "cnpj": "24.529.265/0001-40",
 *	  "address": "Av .Francisco Mota, 572",
 *	  "district": "Costa e Silva",
 *	  "zipcode": "59.625-900",
 *	  "city": "Mossoró",
 *	  "state": "RN",
 *	  "lat": "-5.2041563",
 *	  "lng": "-37.3245685",
 *	  "created_at": "2020-12-14 21:08:26",
 *	  "updated_at": "2020-12-16 15:33:05",
 *	  "email": "ufersa@ufersa.edu.br",
 *	  "phone_number": "84 33178243",
 *	  "website": "http://www.ufersa.edu.br",
 *	  "logo_id": 1,
 *	  "type": "public",
 *	  "category": "university"
 *	}
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Institution was not found
 * HTTP/1.1 400 Bad Request
 * {
 *  	"error": {
 *    		"error_code": "RESOURCE_NOT_FOUND",
 *    		"message": "The resource Institution was not found"
 * 		}
 * }
 */
Route.get('institutions/:id', 'InstitutionController.show').middleware(['handleParams']);

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
 * @apiParam {String} [email] Institution email
 * @apiParam {String} [phone_number] Institution Phone Number
 * @apiParam {String} [website] Institution Web Site
 * @apiParam {String} [logo_id] Institution Logo ID
 * @apiParam {String='public','private','mixed','other'} type Institution Type
 * @apiParam {String='university','institute','association','foundation','cooperative','company','other'} category Institution Category
 * @apiParamExample  {json} Request sample:
 *	{
 *	  "name": "Universidade Federal Rural do Semi-Árido",
 *	  "initials": "UFERSA",
 *	  "cnpj": "24.529.265/0001-40",
 *	  "address": "Av .Francisco Mota, 572",
 *	  "district": "Costa e Silva",
 *	  "zipcode": "59.625-900",
 *	  "city": "Mossoró",
 *	  "state": "RN",
 *	  "lat": "-5.2041563",
 *	  "lng": "-37.3245685",
 *	  "email": "ufersa@ufersa.edu.br",
 *	  "phone_number": "84 33178243",
 *	  "website": "http://www.ufersa.edu.br",
 *	  "logo_id": 1,
 *	  "type": "public",
 *	  "category": "university"
 *	}
 * @apiSuccess {Number} id Institution id
 * @apiSuccess {String} responsible Institution owner id
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
 * @apiSuccess {String} email Institution email
 * @apiSuccess {String} phone_number Institution Phone Number
 * @apiSuccess {String} website Institution Web Site
 * @apiSuccess {String} logo_id Institution Logo ID
 * @apiSuccess {String='public','private','mixed','other'} type Institution Type
 * @apiSuccess {String='university','institute','association','foundation','cooperative','company','other'} category Institution Category
 * @apiSuccess {Date} created_at Institution register date
 * @apiSuccess {Date} updated_at Institution update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 201 Created
 * {
 * "institution": {
 *   "name": "Universidade Federal Rural do Semi-Árido",
 *   "initials": "UFERSA",
 *   "cnpj": "24.529.265/0001-40",
 *   "address": "Av .Francisco Mota, 572",
 *   "district": "Costa e Silva",
 *   "zipcode": "59.625-900",
 *   "city": "Mossoró",
 *   "state": "RN",
 *   "lat": "-5.2041563",
 *   "lng": "-37.3245685",
 *   "email": "ufersa@ufersa.edu.br",
 *   "phone_number": "84 33178243",
 *   "website": "http://www.ufersa.edu.br",
 *   "type": "public",
 *   "category": "university",
 *   "created_at": "2020-12-14 14:30:23",
 *   "updated_at": "2020-12-14 14:30:23",
 *   "id": 1,
 *   "responsible": 18,
 *   "logo_id": 1
 * }
 *}
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {Object[]} error.message Error messages
 * @apiErrorExample {json} Validation Error: name Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The name is required.",
 *       			"field": "name",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: initials Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The initials is required.",
 *       			"field": "initials",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
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
 * @apiErrorExample {json} Validation Error: address Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The address is required.",
 *       			"field": "address",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: district Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The district is required.",
 *       			"field": "district",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: zipcode Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The zipcode is required.",
 *       			"field": "zipcode",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: city Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The city is required.",
 *       			"field": "city",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: state Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The state is required.",
 *       			"field": "state",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: lat Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The lat is required.",
 *       			"field": "lat",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: lng Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The lng is required.",
 *       			"field": "lng",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: type Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The type is required.",
 *       			"field": "type",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: type should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The type should fall within defined values of (public,private,mixed,other).",
 *       				"field": "type",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: category Required
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "VALIDATION_ERROR",
 *   		"message": [
 *     			{
 *       			"message": "The category is required.",
 *       			"field": "category",
 *       			"validation": "required"
 *     			}
 *   		]
 * 		}
 *	}
 * @apiErrorExample {json} Validation Error: category should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The category should fall within defined values of (university,institute,association,foundation,cooperative,company,other).",
 *       				"field": "category",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: logo id should exist in uploads
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The logo_id should exist in uploads",
 *       				"field": "logo_id",
 *       				"validation": "exists"
 *     				}
 *   			]
 * 			}
 *		}
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
Route.post('institutions', 'InstitutionController.store')
	.middleware(['auth', 'registrationCompleted:check_personal_data'])
	.validator('StoreInstitution');

/**
 * @api {put} /institutions/:id Updates an Institution
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
 * @apiParam {String} [email] Institution email
 * @apiParam {String} [phone_number] Institution Phone Number
 * @apiParam {String} [website] Institution Web Site
 * @apiParam {String} [logo_id] Institution Logo ID
 * @apiParam {String='public','private','mixed','other'} type Institution Type
 * @apiParam {String='university','institute','association','foundation','cooperative','company','other'} category Institution Category
 * @apiParamExample  {json} Request sample:
 * {
 * 		"district": "Presidente Costa e Silva"
 * }
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * 	{
 *		"id": 1,
 *		"responsible": 11,
 *		"name": "Universidade Federal Rural do Semi-Árido",
 *		"initials": "UFERSA",
 *		"cnpj": "24.529.265/0001-40",
 *		"address": "Av .Francisco Mota, 572",
 *		"district": "Presidente Costa e Silva",
 *		"zipcode": "59.625-900",
 *		"city": "Mossoró",
 *		"state": "RN",
 *		"lat": "-5.2041563",
 *		"lng": "-37.3245685",
 *		"created_at": "2020-12-14 21:08:26",
 *		"updated_at": "2020-12-16 16:15:08",
 *		"email": "ufersa@ufersa.edu.br",
 *		"phone_number": "84 33178243",
 *		"website": "http://www.ufersa.edu.br",
 *		"logo_id": 1,
 *		"type": "public",
 *		"category": "university"
 *	}
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 * {
 * 		"error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 *  		"message": "Você não tem permissão para acessar esse recurso"
 * 		}
 * }
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Institution was not found
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *  		"error_code": "RESOURCE_NOT_FOUND",
 *  		"message": "The resource Institution was not found"
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
 * @apiErrorExample {json} Validation Error: type should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The type should fall within defined values of (public,private,mixed,other).",
 *       				"field": "type",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: category should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The category should fall within defined values of (university,institute,association,foundation,cooperative,company,other).",
 *       				"field": "category",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: logo id should exist in uploads
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The logo_id should exist in uploads",
 *       				"field": "logo_id",
 *       				"validation": "exists"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.put('institutions/:id', 'InstitutionController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_INSTITUTION, permissions.UPDATE_INSTITUTIONS]),
	])
	.validator('UpdateInstitution');
/**
 * @api {put} /institutions/:id/update-responsible Updates Institution Responsible
 * @apiGroup Institutions
 * @apiPermission UPDATE_INSTITUTIONS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam (Route Param) {Number} id Mandatory Institution ID
 * @apiParam {Number} responsible New Institution responsible id, should be exists in users schema
 * @apiParamExample  {json} Request sample:
 * {
 * 		"responsible": 18
 * }
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * 	{
 *		"id": 1,
 *		"responsible": 18,
 *		"name": "Universidade Federal Rural do Semi-Árido",
 *		"initials": "UFERSA",
 *		"cnpj": "24.529.265/0001-40",
 *		"address": "Av .Francisco Mota, 572",
 *		"district": "Presidente Costa e Silva",
 *		"zipcode": "59.625-900",
 *		"city": "Mossoró",
 *		"state": "RN",
 *		"lat": "-5.2041563",
 *		"lng": "-37.3245685",
 *		"created_at": "2020-12-14 21:08:26",
 *		"updated_at": "2020-12-16 16:15:08",
 *		"email": "ufersa@ufersa.edu.br",
 *		"phone_number": "84 33178243",
 *		"website": "http://www.ufersa.edu.br",
 *		"logo_id": 1,
 *		"type": "public",
 *		"category": "university"
 *	}
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 * {
 * 		"error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 *  		"message": "Você não tem permissão para acessar esse recurso"
 * 		}
 * }
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Institution was not found
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *  		"error_code": "RESOURCE_NOT_FOUND",
 *  		"message": "The resource Institution was not found"
 * 		}
 * }
 * @apiErrorExample {json} Validation Error: responsible Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The responsible is required.",
 *       				"field": "responsible",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: responsible should exist in users
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The responsible should exist in users",
 *       				"field": "responsible",
 *       				"validation": "exists"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.put('institutions/:id/update-responsible', 'InstitutionController.updateResponsible')
	.middleware(['auth', getMiddlewarePermissions([permissions.UPDATE_INSTITUTIONS])])
	.validator('UpdateInstitutionResponsible');

/**
 * @api {delete} /institutions/:id Deletes an Institution
 * @apiGroup Institutions
 * @apiPermission DELETE_INSTITUTION or DELETE_INSTITUTIONS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 * {
 * 		"Authorization": "Bearer <token>"
 * }
 * @apiParam (Route Param) {Number} id Mandatory Institution ID.
 * @apiParamExample  {json} Request sample:
 *	/institutions/3
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 * HTTP/1.1 204 OK
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 * {
 * 		"error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 *  		"message": "Você não tem permissão para acessar esse recurso"
 * 		}
 * }
 * @apiErrorExample {json} Resource Institution was not found
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *   		"error_code": "RESOURCE_NOT_FOUND",
 *  		"message": "The resource Institution was not found"
 * 		}
 * }
 */
Route.delete('institutions/:id', 'InstitutionController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_INSTITUTION, permissions.DELETE_INSTITUTIONS]),
]);
/**
 * @api {delete} /institutions Delete multiple Institutions
 * @apiGroup Institutions
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} ids List of institutions IDs.
 * @apiParamExample  {json} Request sample:
 *	/institutions?ids=1,2,3
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Ids Required
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
Route.delete('institutions/', 'InstitutionController.destroyMany').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
