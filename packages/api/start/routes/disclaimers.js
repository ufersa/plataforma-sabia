/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewareRoles, roles } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Disclaimer Routes */

/**
 * @api {get} /disclaimers/:id Gets a single Disclaimer
 * @apiGroup Disclaimers
 * @apiParam {Number} id Mandatory Disclaimer ID.
 * @apiParamExample  {json} Request sample:
 *	/disclaimers/1
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Boolean} required Disclaimer Is required
 * @apiSuccess {String="privacypolicy", "register", "technology", "reviewers"} type Disclaimer Type
 * @apiSuccess {String} version Disclaimer Version
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *{
 *    "id": 1,
 *    "created_at": "2020-10-28 13:29:44",
 *    "updated_at": "2020-10-28 13:36:45",
 *    "description": "Declaro ciência dos Termos e Condições de Uso.",
 *    "required": 1,
 *    "type": "privacypolicy",
 *    "version": "2"
 *}
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource Disclaimer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Disclaimer was not found"
 * 			}
 *		}
 */
Route.get('disclaimers/:id', 'DisclaimerController.show').middleware(['handleParams']);
/**
 * @api {get} /disclaimers Lists All Disclaimers
 * @apiGroup Disclaimers
 * @apiParamExample  {json} Request sample:
 *	/disclaimers
 * @apiSuccess {Object[]} disclaimers Disclaimer Collection
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Boolean} required Disclaimer Is required
 * @apiSuccess {String="privacypolicy", "register", "technology", "reviewers"} type Disclaimer Type
 * @apiSuccess {String} version Disclaimer Version
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *[
 *    {
 *        "id": 1,
 *        "created_at": "2020-10-28 13:29:44",
 *        "updated_at": "2020-10-28 13:36:45",
 *        "description": "Declaro ciência dos Termos e Condições de Uso.",
 *        "required": 1,
 *        "type": "privacypolicy",
 *        "version": "2"
 *    },
 *    {
 *        "id": 2,
 *        "created_at": "2020-10-28 13:29:44",
 *        "updated_at": "2020-10-28 13:29:44",
 *        "description": "Concordo com o processamento dos meus dados pessoais para fins de fornecimento dos serviços da Plataforma Sabiá. Veja mais na Política de Privacidade. ",
 *        "required": 1,
 *        "type": "register",
 *        "version": "1"
 *    }
 *]
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 */
Route.get('disclaimers', 'DisclaimerController.index').middleware(['handleParams']);
/**
 * @api {post} /disclaimers Creates a new Disclaimer
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} description Disclaimer Description
 * @apiParam {Boolean} required Disclaimer Is required
 * @apiParam {String="privacypolicy", "register", "technology", "reviewers"} type Disclaimer Type
 * @apiParam {String} version Disclaimer Version
 * @apiParamExample  {json} Request sample:
 * {
 *   "description": "Declaro ciência dos Termos e Condições de Uso.",
 *	 "required": true,
 *	 "type": "register",
 *	 "version": "1"
 *  }
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Boolean} required Disclaimer is required
 * @apiSuccess {String} type Disclaimer Type
 * @apiSuccess {String} version Disclaimer Version.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 * 	"id": 10,
 * 	"created_at": "2020-10-21 11:42:14",
 * 	"updated_at": "2020-10-21 11:42:14",
 * 	"description": "Declaro ciência dos Termos e Condições de Uso.",
 * 	"required": true,
 * 	"type": "register",
 * 	"version": "1"
 *  }
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Disclaimer Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "type deve estar entre os valores (privacypolicy,register,technology).",
 *       				"field": "type",
 *       				"validation": "in"
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
 */
Route.post('disclaimers', 'DisclaimerController.store')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('Disclaimer');
/**
 * @api {put} /disclaimers/:id Updates a Disclaimer
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} description Disclaimer Description
 * @apiParam {Boolean} required Disclaimer Is required
 * @apiParam {String="privacypolicy", "register", "technology", "reviewers"} type Disclaimer Type
 * @apiParam {String} version Disclaimer Version
 * @apiParamExample  {json} Request sample:
 *    {
 *		"description": "Updated User Disclaimer Description"
 *    }
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Boolean} required Disclaimer is required
 * @apiSuccess {String} type Disclaimer Type
 * @apiSuccess {String} version Disclaimer Version.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 * 	"id": 10,
 * 	"created_at": "2020-10-21 11:42:14",
 * 	"updated_at": "2020-10-21 11:42:14",
 * 	"description": "Updated User Disclaimer Description",
 * 	"required": true,
 * 	"type": "register",
 * 	"version": "1"
 *  }
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
 *@apiErrorExample {json} Resource Disclaimer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Disclaimer was not found"
 * 			}
 *		}
 */
Route.put('disclaimers/:id', 'DisclaimerController.update')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('Disclaimer');
/**
 * @api {delete} /disclaimers/:id Deletes a Disclaimer
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Disclaimer ID.
 * @apiParamExample  {json} Request sample:
 *	/disclaimers/1
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
 *@apiErrorExample {json} Resource Disclaimer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Disclaimer was not found"
 * 			}
 *		}
 */
Route.delete('disclaimers/:id', 'DisclaimerController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
/**
 * @api {delete} /disclaimers Delete multiple Disclaimers
 * @apiGroup Disclaimers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} ids List of disclaimers IDs.
 * @apiParamExample  {json} Request sample:
 *	/disclaimers?ids=1,2,3
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
Route.delete('disclaimers/', 'DisclaimerController.destroyMany').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
	'handleParams',
]);
/**
 * @api {post} /disclaimers/accept Accept multiple disclaimers
 * @apiGroup Disclaimers
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number[]} [disclaimers] Mandatory Disclaimers ID array.
 * @apiParamExample  {json} Request sample:
 * {
 *   "disclaimers": [1,2]
 *  }
 * @apiSuccess {Object[]} disclaimers Disclaimer Collection
 * @apiSuccess {Number} id Disclaimer ID
 * @apiSuccess {Date} created_at Disclaimer Register date
 * @apiSuccess {Date} updated_at Disclaimer Update date
 * @apiSuccess {String} description Disclaimer Description
 * @apiSuccess {Boolean} required Disclaimer Is required
 * @apiSuccess {String="privacypolicy", "register", "technology", "reviewers"} type Disclaimer Type
 * @apiSuccess {String} version Disclaimer Version
 * @apiSuccess {Number} pivot.disclaimer_id Disclaimer ID
 * @apiSuccess {Number} pivot.user_id User ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *[
 *    {
 *        "id": 1,
 *        "created_at": "2020-10-28 13:29:44",
 *        "updated_at": "2020-10-28 13:29:44",
 *        "description": "Estou ciente de que posso revogar o consentimento de uso dos meus dados pessoais a qualquer momento. Todavia, não poderei mais utilizar os serviços da plataforma que necessitam do uso e da coleta de dados pessoais. Veja mais na Política de Privacidade. ",
 *        "required": 1,
 *        "type": "register",
 *        "version": "1",
 *        "pivot": {
 *            "disclaimer_id": 1,
 *            "user_id": 14
 *        }
 *    },
 *    {
 *        "id": 2,
 *        "created_at": "2020-10-28 13:29:44",
 *        "updated_at": "2020-10-28 13:29:44",
 *        "description": "Estou ciente quanto ao canal de suporte da Plataforma Sabiá, que estará à disposição para sanar eventual dúvida que possa surgir.",
 *        "required": 1,
 *        "type": "register",
 *        "version": "1",
 *        "pivot": {
 *            "disclaimer_id": 1,
 *            "user_id": 14
 *        }
 *    },
 *]
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: disclaimers Required
 *    HTTP/1.1 400 Bad Request
 *{
 *    "error": {
 *        "error_code": "VALIDATION_ERROR",
 *        "message": [
 *            {
 *                "message": "disclaimers é obrigatório e está faltando.",
 *                "field": "disclaimers",
 *                "validation": "required"
 *            }
 *        ]
 *    }
 *}
 */
Route.post('disclaimers/accept', 'DisclaimerController.accept')
	.middleware(['auth'])
	.validator('DisclaimerAccept');
