/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Term routes */
/**
 * @api {post} /terms Creates a new Term
 * @apiGroup Terms
 * @apiPermission CREATE_TERMS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} term Mandatory Term.
 * @apiParam {Number} parent_id Optional Term ID.
 * @apiParam {String} [slug] Optional Term Slug, if not passed is generated.
 * @apiParam {Number|String} taxonomy Mandatory Taxonomy ID or Slug.
 * @apiParam {Object[]} [metas] Optional Metas object array.
 * @apiParam {String} [metas.meta_key] Meta Key.
 * @apiParam {String} [metas.meta_value] Meta Value.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"term": "UFERSA",
 *		"taxonomy": "PLACE",
 *		"metas":[
 *			{
 *				"meta_key":"latitude",
 *				"meta_value":"-5.2036578"
 *			},
 *			{
 *				"meta_key":"longitude",
 *				"meta_value":"-37.3251447"
 *			}
 *		]
 *	}
 * @apiSuccess {Number} id Term ID
 * @apiSuccess {Number} taxonomy_id Taxonomy ID
 * @apiSuccess {String} term Term
 * @apiSuccess {String} slug Term Slug
 * @apiSuccess {Date} created_at Term Register date
 * @apiSuccess {Date} updated_at Term Update date
 * @apiSuccess {Object} taxonomy Taxonomy Object
 * @apiSuccess {Number} taxonomy.id Taxonomy ID
 * @apiSuccess {String} taxonomy.taxonomy Taxonomy
 * @apiSuccess {String} taxonomy.description Taxonomy Description
 * @apiSuccess {Date} taxonomy.created_at Taxonomy Register date
 * @apiSuccess {Date} taxonomy.updated_at Taxonomy Update date
 * @apiSuccess {Object[]} metas Metas Object Array
 * @apiSuccess {Number} metas.id Meta ID
 * @apiSuccess {Number} metas.term_id Term ID
 * @apiSuccess {String} metas.meta_key Meta Key.
 * @apiSuccess {String} metas.meta_value Meta Value.
 * @apiSuccess {Date} metas.created_at Meta Register date
 * @apiSuccess {Date} metas.updated_at Meta Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"term": "UFERSA",
 *		"slug": "ufersa",
 *		"taxonomy_id": 11,
 *		"created_at": "2020-08-12 18:08:12",
 *		"updated_at": "2020-08-12 18:08:12",
 *		"id": 232,
 *		"taxonomy": {
 *			"id": 11,
 *			"taxonomy": "PLACE",
 *			"description": "Place Taxonomy",
 *			"created_at": "2020-08-12 18:06:10",
 *			"updated_at": "2020-08-12 18:06:10"
 *		},
 *		"metas": [
 *			{
 *			"id": 1,
 *			"term_id": 232,
 *			"meta_key": "latitude",
 *			"meta_value": "-5.2036578",
 *			"created_at": "2020-08-12 18:08:13",
 *			"updated_at": "2020-08-12 18:08:13"
 *			},
 *			{
 *			"id": 2,
 *			"term_id": 232,
 *			"meta_key": "longitude",
 *			"meta_value": "-37.3251447",
 *			"created_at": "2020-08-12 18:08:13",
 *			"updated_at": "2020-08-12 18:08:13"
 *			}
 *		]
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Term Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The term is required.",
 *       				"field": "term",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Taxonomy Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The taxonomy is required.",
 *       				"field": "taxonomy",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Resource Taxonomy was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Taxonomy was not found"
 * 			}
 *		}
 *@apiErrorExample {json} Unique Term Error
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "UNIQUE_TERM_ERROR",
 *   			"message":"This term already exists for this taxonomy"
 * 			}
 *		}
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
 */
Route.post('terms', 'TermController.store')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TERMS])])
	.validator('StoreTerm');
/**
 * @api {put} /terms/:id Updates a Term
 * @apiGroup Terms
 * @apiPermission UPDATE_TERMS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Term ID.
 * @apiParam {String} [term] Optional Term.
 * @apiParam {Number} parent_id Optional Term ID.
 * @apiParam {String} [slug] Optional Term Slug.
 * @apiParam {Number} [taxonomy_id] Optional Taxonomy ID.
 * @apiParam {Object[]} [metas] Optional Metas object array.
 * @apiParam {String} [metas.meta_key] If meta_key is passed the meta_value is updated. if meta_key do not exists the meta is created. If meta_key exists and is not passed the meta is deleted.
 * @apiParam {String} [metas.meta_value] Meta Value.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"term": "UFERSA",
 *		"metas":[
 *			{
 *				"meta_key":"latitude",
 *				"meta_value":"-5.2036578"
 *			},
 *			{
 *				"meta_key":"longitude",
 *				"meta_value":"-37.3251447"
 *			},
 *			{
 *				"meta_key":"city",
 *				"meta_value":"Mossoró"
 *			},
 *			{
 *				"meta_key":"state",
 *				"meta_value":"RN"
 *			}
 *		]
 *	}
 * @apiSuccess {Number} id Term ID
 * @apiSuccess {Number} taxonomy_id Taxonomy ID
 * @apiSuccess {Number} parent_id Parent ID
 * @apiSuccess {String} term Term
 * @apiSuccess {String} slug Term Slug
 * @apiSuccess {Date} created_at Term Register date
 * @apiSuccess {Date} updated_at Term Update date
 * @apiSuccess {Object} taxonomy Taxonomy Object
 * @apiSuccess {Number} taxonomy.id Taxonomy ID
 * @apiSuccess {String} taxonomy.taxonomy Taxonomy
 * @apiSuccess {String} taxonomy.description Taxonomy Description
 * @apiSuccess {Date} taxonomy.created_at Taxonomy Register date
 * @apiSuccess {Date} taxonomy.updated_at Taxonomy Update date
 * @apiSuccess {Object[]} metas Metas Object Array
 * @apiSuccess {Number} metas.id Meta ID
 * @apiSuccess {Number} metas.term_id Term ID
 * @apiSuccess {String} metas.meta_key Meta Key.
 * @apiSuccess {String} metas.meta_value Meta Value.
 * @apiSuccess {Date} metas.created_at Meta Register date
 * @apiSuccess {Date} metas.updated_at Meta Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 232,
 *		"term": "UFERSA",
 *		"parent_id": null,
 *		"taxonomy_id": 11,
 *		"created_at": "2020-08-12 18:08:12",
 *		"updated_at": "2020-08-12 18:35:17",
 *		"metas": [
 *			{
 *			"id": 1,
 *			"term_id": 232,
 *			"meta_key": "latitude",
 *			"meta_value": "-5.2036578",
 *			"created_at": "2020-08-12 18:08:13",
 *			"updated_at": "2020-08-12 18:08:13"
 *			},
 *			{
 *			"id": 2,
 *			"term_id": 232,
 *			"meta_key": "longitude",
 *			"meta_value": "-37.3251447",
 *			"created_at": "2020-08-12 18:08:13",
 *			"updated_at": "2020-08-12 18:08:13"
 *			},
 *			{
 *			"id": 3,
 *			"term_id": 232,
 *			"meta_key": "city",
 *			"meta_value": "Mossoró",
 *			"created_at": "2020-08-12 18:34:55",
 *			"updated_at": "2020-08-12 18:34:55"
 *			},
 *			{
 *			"id": 4,
 *			"term_id": 232,
 *			"meta_key": "state",
 *			"meta_value": "RN",
 *			"created_at": "2020-08-12 18:34:55",
 *			"updated_at": "2020-08-12 18:34:55"
 *			}
 *		]
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
 *@apiErrorExample {json} Resource Taxonomy was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Taxonomy was not found"
 * 			}
 *		}
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
 */
Route.put('terms/:id', 'TermController.update')
	.middleware(['auth', getMiddlewarePermissions([permissions.UPDATE_TERMS])])
	.validator('UpdateTerm');
/**
 * @api {put} /terms/:id/meta Updates Term Meta
 * @apiGroup Terms
 * @apiPermission UPDATE_TERMS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Term ID.
 * @apiParam {String} meta_key If meta_key exists in term, meta_value is updated, else meta is created.
 * @apiParam {String} meta_value Meta Value.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"meta_key":"city",
 *		"meta_value":"Natal"
 *	}
 * @apiSuccess {Number} id Meta ID
 * @apiSuccess {Number} term_id Term ID
 * @apiSuccess {String} meta_key Meta Key
 * @apiSuccess {String} meta_value Meta Value
 * @apiSuccess {Date} created_at Meta Register date
 * @apiSuccess {Date} updated_at Meta Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	"id": 3,
 *	"term_id": 232,
 *	"meta_key": "city",
 *	"meta_value": "Natal",
 *	"created_at": "2020-08-12 18:34:55",
 *	"updated_at": "2020-08-12 19:05:27"
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
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
 */

Route.put('terms/:id/meta', 'TermController.updateMeta')
	.middleware(['auth', getMiddlewarePermissions([permissions.UPDATE_TERMS])])
	.validator('UpdateMeta');
/**
 * @api {delete} /terms/:id Deletes a Term
 * @apiGroup Terms
 * @apiPermission DELETE_TERMS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number|String} id Mandatory Term ID.
 * @apiParamExample  {json} Request sample:
 *	/terms/232
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiUse AuthError
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
 *@apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
 */

Route.delete('terms/:id', 'TermController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_TERMS]),
]);

/**
 * @api {delete} /terms Delete multiple Terms
 * @apiGroup Terms
 * @apiPermission DELETE_TERMS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} ids List of terms IDs.
 * @apiParamExample  {json} Request sample:
 *	/terms?ids=1,2,3
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiUse AuthError
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

Route.delete('terms/', 'TermController.destroyMany')
	.middleware(['auth', 'handleParams', getMiddlewarePermissions([permissions.DELETE_TERMS])])
	.validator('DeleteMany');

/**
 * @api {get} /terms Lists All Terms
 * @apiGroup Terms
 * @apiUse Params
 * @apiParam (Query Param) [parent] Optional Parent Param
 * @apiParam (Query Param) [taxonomy] Optional Taxonomy Param
 * @apiSuccess {Object[]} terms Terms Collection
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} terms.parent_id Parent ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *		{
 *			"id": 1,
 *			"term": "Avanços tecnológicos",
 *			"slug": "avancos-tecnologicos",
 *			"parent_id": null,
 *			"taxonomy_id": 3,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 2,
 *			"term": "Tecnologias Sociais",
 *			"slug": "tecnologias-sociais",
 *			"parent_id": null,
 *			"taxonomy_id": 3,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 3,
 *			"term": "Inovações sociais",
 *			"slug": "inovacoes-sociais",
 *			"parent_id": null,
 *			"taxonomy_id": 3,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 4,
 *			"term": "Tecnologia em operação",
 *			"slug": "tecnologia-em-operacao",
 *			"parent_id": null,
 *			"taxonomy_id": 4,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 5,
 *			"term": "Colocação da tecnologia em operação",
 *			"slug": "colocacao-da-tecnologia-em-operacao",
 *			"parent_id": null,
 *			"taxonomy_id": 4,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		...
 *	]
 */
Route.get('terms', 'TermController.index').middleware(['handleParams']);
/**
 * @api {get} /terms/:id Gets a single Term
 * @apiGroup Terms
 * @apiUse Params
 * @apiParam (Route Param) id Mandatory Term ID
 * @apiParamExample  {json} Request sample:
 *	/terms/232
 * @apiSuccess {Number} id Term ID
 * @apiSuccess {String} taxonomy_id Taxonomy ID
 * @apiSuccess {String} parent_id Parent ID
 * @apiSuccess {String} term Term
 * @apiSuccess {String} slug Term Slug
 * @apiSuccess {Date} created_at Term Register date
 * @apiSuccess {Date} updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 232,
 *		"term": "UFERSA",
 *		"slug": "ufersa",
 *		"parent_id": null,
 *		"taxonomy_id": 11,
 *		"created_at": "2020-08-12 18:08:12",
 *		"updated_at": "2020-08-12 18:35:17"
 *	}
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
 */
Route.get('terms/:id', 'TermController.show').middleware(['handleParams']);
