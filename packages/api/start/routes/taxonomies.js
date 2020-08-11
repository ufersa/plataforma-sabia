/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Taxonomy routes */
Route.group(() => {
	/**
	 * @api {post} /taxonomies Creates a new Taxonomy
	 * @apiGroup Taxonomies
	 * @apiPermission ADMIN
	 * @apiHeader {String} Authorization Authorization Bearer Token.
	 * @apiHeaderExample {json} Header-Example:
	 *    {
	 *      "Authorization": "Bearer <token>"
	 *    }
	 * @apiParam {String} taxonomy Mandatory Unique Taxonomy.
	 * @apiParam {String} description Mandatory Taxonomy Description.
	 * @apiParamExample  {json} Request sample:
	 *    {
	 *		"taxonomy": "TEST_TAXONOMY",
	 *		"description": "Test Taxonomy Description"
	 *    }
	 * @apiSuccess {Number} id Taxonomy ID
	 * @apiSuccess {String} taxonomy Taxonomy
	 * @apiSuccess {String} description Taxonomy Description
	 * @apiSuccess {Date} created_at Taxonomy Register date
	 * @apiSuccess {Date} updated_at Taxonomy Update date
	 * @apiSuccessExample {json} Success
	 * HTTP/1.1 200 OK
	 *	{
	 *		"taxonomy": "TEST_TAXONOMY",
	 *		"description": "Test Taxonomy Description",
	 *		"created_at": "2020-08-10 17:44:04",
	 *		"updated_at": "2020-08-10 17:44:04",
	 *		"id": 10
	 *	}
	 *@apiError (Bad Request 400) {Object} error Error object
	 *@apiError (Bad Request 400) {String} error.error_code Error code
	 *@apiError (Bad Request 400) {Object[]} error.message Error messages
	 *@apiErrorExample {json} Validation Error: Unique Taxonomy
	 *    HTTP/1.1 400 Bad Request
	 *		{
	 * 			"error": {
	 *   			"error_code": "VALIDATION_ERROR",
	 *   			"message": [
	 *     				{
	 *       				"message": "taxonomy já existe e precisa ser único.",
	 *       				"field": "taxonomy",
	 *       				"validation": "unique"
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
	 *       				"message": "taxonomy é obrigatório e está faltando.",
	 *       				"field": "taxonomy",
	 *       				"validation": "required"
	 *     				}
	 *   			]
	 * 			}
	 *		}
	 *@apiErrorExample {json} Validation Error: Description Required
	 *    HTTP/1.1 400 Bad Request
	 *		{
	 * 			"error": {
	 *   			"error_code": "VALIDATION_ERROR",
	 *   			"message": [
	 *     				{
	 *       				"message": "description é obrigatório e está faltando.",
	 *       				"field": "description",
	 *       				"validation": "required"
	 *     				}
	 *   			]
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
	Route.post('taxonomies', 'TaxonomyController.store').validator('StoreTaxonomy');
	/**
	 * @api {put} /taxonomies/:id Updates a Taxonomy
	 * @apiGroup Taxonomies
	 * @apiPermission ADMIN
	 * @apiHeader {String} Authorization Authorization Bearer Token.
	 * @apiHeaderExample {json} Header-Example:
	 *    {
	 *      "Authorization": "Bearer <token>"
	 *    }
	 * @apiParam (Route Param) {Number|String} id Mandatory Taxonomy ID or Slug.
	 * @apiParam {String} [taxonomy] Optional Unique Taxonomy.
	 * @apiParam {String} [description] Optional Taxonomy Description.
	 * @apiParamExample  {json} Request sample:
	 *    {
	 *		"description": "Updated Test Taxonomy Description"
	 *    }
	 * @apiSuccess {Number} id Taxonomy ID
	 * @apiSuccess {String} taxonomy Taxonomy
	 * @apiSuccess {String} description Taxonomy Description
	 * @apiSuccess {Date} created_at Taxonomy Register date
	 * @apiSuccess {Date} updated_at Taxonomy Update date
	 * @apiSuccessExample {json} Success
	 * HTTP/1.1 200 OK
	 *		{
	 *			"id": 10,
	 *			"taxonomy": "UPDATED_TEST_TAXONOMY",
	 *			"description": "Updated Test Taxonomy Description",
	 *			"created_at": "2020-08-10 17:44:04",
	 *			"updated_at": "2020-08-10 20:23:15"
	 *		}
	 *@apiError (Bad Request 400) {Object} error Error object
	 *@apiError (Bad Request 400) {String} error.error_code Error code
	 *@apiError (Bad Request 400) {Object[]} error.message Error messages
	 *@apiErrorExample {json} Validation Error: Unique Taxonomy
	 *    HTTP/1.1 400 Bad Request
	 *		{
	 * 			"error": {
	 *   			"error_code": "VALIDATION_ERROR",
	 *   			"message": [
	 *     				{
	 *       				"message": "taxonomy já existe e precisa ser único.",
	 *       				"field": "taxonomy",
	 *       				"validation": "unique"
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
	Route.put('taxonomies/:id', 'TaxonomyController.update').validator('UpdateTaxonomy');
	/**
	 * @api {delete} /taxonomies/:id Deletes a Taxonomy
	 * @apiGroup Taxonomies
	 * @apiPermission ADMIN
	 * @apiHeader {String} Authorization Authorization Bearer Token.
	 * @apiHeaderExample {json} Header-Example:
	 *    {
	 *      "Authorization": "Bearer <token>"
	 *    }
	 * @apiParam (Route Param) {Number|String} id Mandatory Taxonomy ID or Slug.
	 * @apiParamExample  {json} Request sample:
	 *	/taxonomies/10
	 * @apiSuccess {Boolean} success Success Flag
	 * @apiSuccessExample {json} Success
	 *    HTTP/1.1 200 OK
	 *    {
	 *		"success":"true"
	 *    }
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
	 *@apiErrorExample {json} Resource Taxonomy was not found
	 *    HTTP/1.1 400 Bad Request
	 *		{
	 * 			"error": {
	 *   			"error_code": "RESOURCE_NOT_FOUND",
	 *   			"message":"The resource Taxonomy was not found"
	 * 			}
	 *		}
	 */
	Route.delete('taxonomies/:id', 'TaxonomyController.destroy');
}).middleware(['auth', getMiddlewareRoles([roles.ADMIN])]);
/**
 * @api {get} /taxonomies List All Taxonomies
 * @apiGroup Taxonomies
 * @apiUse Params
 * @apiParam (Query Param) [parent] Optional Parent Param
 * @apiSuccess {Object[]} taxonomies Taxonomies Collection
 * @apiSuccess {Number} taxonomies.id Taxonomy ID
 * @apiSuccess {String} taxonomies.taxonomy Taxonomy
 * @apiSuccess {String} taxonomies.description Taxonomy Description
 * @apiSuccess {Date} taxonomies.created_at Taxonomy Register date
 * @apiSuccess {Date} taxonomies.updated_at Taxonomy Update date
 * @apiSuccess {Object[]} taxonomies.terms List of taxonomy terms if parent is passed.
 * @apiSuccess {Number} taxonomies.terms.id Term ID.
 * @apiSuccess {String} taxonomies.terms.term Term.
 * @apiSuccess {String} taxonomies.terms.slug Term Slug.
 * @apiSuccess {Number} taxonomies.terms.parent_id Parent Term ID.
 * @apiSuccess {Number} taxonomies.terms.taxonomy_id Taxonomy ID.
 * @apiSuccess {Date} taxonomies.terms.created_at Term Register date
 * @apiSuccess {Date} taxonomies.terms.updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *		{
 *			"id": 1,
 *			"taxonomy": "CATEGORY",
 *			"description": "Categoria a qual pertence a tecnologia. Se o termo possuir um pai (parent_id), trata-se de uma subcategoria",
 *			"created_at": "2020-08-06 20:41:56",
 *			"updated_at": "2020-08-06 20:41:56"
 *		},
 *		{
 *			"id": 2,
 *			"taxonomy": "KEYWORDS",
 *			"description": "Palavras-chave que definem a tecnologia.",
 *			"created_at": "2020-08-06 20:41:56",
 *			"updated_at": "2020-08-06 20:41:56"
 *		},
 *		{
 *			"id": 3,
 *			"taxonomy": "CLASSIFICATION",
 *			"description": "Classificação da tecnologia.",
 *			"created_at": "2020-08-06 20:41:56",
 *			"updated_at": "2020-08-06 20:41:56"
 *		},
 *		{
 *			"id": 4,
 *			"taxonomy": "STAGE",
 *			"description": "Estágio de desenvolvimento da tecnologia baseado o TRL (Nível de Maturidade Tecnológica)",
 *			"created_at": "2020-08-06 20:41:56",
 *			"updated_at": "2020-08-06 20:41:56"
 *		},
 *		...
 *	]
 */
Route.get('taxonomies', 'TaxonomyController.index').middleware(['handleParams']);
/**
 * @api {get} /taxonomies/:id Get a single Taxonomy
 * @apiGroup Taxonomies
 * @apiUse Params
 * @apiParam (Route Param) {Number|String} id Mandatory Taxonomy ID or Slug.
 * @apiParam (Query Param) [parent] Optional Parent Param
 * @apiParamExample  {json} Request sample:
 *	/taxonomies/1?parent=12
 * @apiSuccess {Number} id Taxonomy ID
 * @apiSuccess {String} taxonomy Taxonomy
 * @apiSuccess {String} description Taxonomy Description
 * @apiSuccess {Date} created_at Taxonomy Register date
 * @apiSuccess {Date} updated_at Taxonomy Update date
 * @apiSuccess {Object[]} terms List of taxonomy terms if parent is passed.
 * @apiSuccess {Number} terms.id Term ID.
 * @apiSuccess {String} terms.term Term.
 * @apiSuccess {String} terms.slug Term Slug.
 * @apiSuccess {Number} terms.parent_id Parent Term ID.
 * @apiSuccess {Number} terms.taxonomy_id Taxonomy ID.
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 1,
 *		"taxonomy": "CATEGORY",
 *		"description": "Categoria a qual pertence a tecnologia. Se o termo possuir um pai (parent_id), trata-se de uma subcategoria",
 *		"created_at": "2020-08-06 20:41:56",
 *		"updated_at": "2020-08-06 20:41:56",
 *		"terms": [
 *			{
 *			"id": 13,
 *			"term": "Oferta de Água/Armazenamento",
 *			"slug": "oferta-de-aguaarmazenamento",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *			},
 *			{
 *			"id": 14,
 *			"term": "Coleta de água de chuva",
 *			"slug": "coleta-de-agua-de-chuva",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *			},
 *			{
 *			"id": 15,
 *			"term": "Manejo de aquíferos",
 *			"slug": "manejo-de-aquiferos",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *			},
 *			{
 *			"id": 16,
 *			"term": "Demanda de Água/Usos Sustentáveis (o tema reuso será tratado neste subitem",
 *			"slug": "demanda-de-aguausos-sustentaveis-(o-tema-reuso-sera-tratado-neste-subitem",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *			},
 *			{
 *			"id": 17,
 *			"term": "Qualidade da Água/ Dessalinização.",
 *			"slug": "qualidade-da-agua-dessalinizacao.",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *			},
 *			{
 *			"id": 18,
 *			"term": "Outros.",
 *			"slug": "outros.",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *			}
 *		]
 *	}
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource Taxonomy was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Taxonomy was not found"
 * 			}
 *		}
 */
Route.get('taxonomies/:id', 'TaxonomyController.show').middleware(['handleParams']);
/**
 * @api {get} /taxonomies/:id/terms Get a Taxonomy Terms
 * @apiGroup Taxonomies
 * @apiUse Params
 * @apiParam (Route Param) {Number|String} id Mandatory Taxonomy ID or Slug.
 * @apiParam (Query Param) [parent] Optional Parent Param
 * @apiParamExample  {json} Request sample:
 *	/taxonomies/1/terms?parent=12
 * @apiSuccess {Object[]} terms Term Collection
 * @apiSuccess {Number} terms.id Term ID.
 * @apiSuccess {String} terms.term Term.
 * @apiSuccess {String} terms.slug Term Slug.
 * @apiSuccess {Number} terms.parent_id Parent Term ID.
 * @apiSuccess {Number} terms.taxonomy_id Taxonomy ID.
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *		{
 *			"id": 13,
 *			"term": "Oferta de Água/Armazenamento",
 *			"slug": "oferta-de-aguaarmazenamento",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 14,
 *			"term": "Coleta de água de chuva",
 *			"slug": "coleta-de-agua-de-chuva",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 15,
 *			"term": "Manejo de aquíferos",
 *			"slug": "manejo-de-aquiferos",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 16,
 *			"term": "Demanda de Água/Usos Sustentáveis (o tema reuso será tratado neste subitem",
 *			"slug": "demanda-de-aguausos-sustentaveis-(o-tema-reuso-sera-tratado-neste-subitem",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 17,
 *			"term": "Qualidade da Água/ Dessalinização.",
 *			"slug": "qualidade-da-agua-dessalinizacao.",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		},
 *		{
 *			"id": 18,
 *			"term": "Outros.",
 *			"slug": "outros.",
 *			"parent_id": 12,
 *			"taxonomy_id": 1,
 *			"created_at": "2020-08-06 20:41:57",
 *			"updated_at": "2020-08-06 20:41:57"
 *		}
 *	]
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource Taxonomy was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Taxonomy was not found"
 * 			}
 *		}
 */
Route.get('taxonomies/:id/terms', 'TaxonomyController.showTerms').middleware(['handleParams']);
