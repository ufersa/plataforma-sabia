/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** TechnologyCosts Routes */
/**
 * @api {get} /technologies/:id/costs Gets Technology Costs
 * @apiGroup Technology Costs
 * @apiUse Params
 * @apiParam (Route Param) {Number} id Technology ID.
 * @apiParamExample  {json} Request sample:
 *	/technologies/1/costs
 * @apiSuccess {Number} id Technology Cost ID
 * @apiSuccess {Number} technology_id Technology Related ID
 * @apiSuccess {Boolean} funding_required Specifies if is required funding
 * @apiSuccess {Number} funding_value Funding value
 * @apiSuccess {String} funding_status Funding status
 * @apiSuccess {String} notes Notes
 * @apiSuccess {Date} created_at Technology Cost Register date
 * @apiSuccess {Date} updated_at Technology Cost Update date
 * @apiSuccess {Object[]} costs Related costs
 * @apiSuccess {Number} costs.id Cost ID.
 * @apiSuccess {String} costs.cost_type Cost Type.
 * @apiSuccess {String} costs.description Cost Description.
 * @apiSuccess {String} costs.type Type.
 * @apiSuccess {Number} costs.quantity Cost quantity.
 * @apiSuccess {Number} costs.value Cost value.
 * @apiSuccess {Number} costs.technology_cost_id Technology Cost Related ID.
 * @apiSuccess {Date} costs.created_at Cost Register date
 * @apiSuccess {Date} costs.updated_at Cost Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 1,
 *		"funding_required": 1,
 *		"funding_type": "public",
 *		"funding_value": 88580343,
 *		"funding_status": "not_acquired",
 *		"notes": "Dol puhfuce su woamoka aru fum nuj uwzu ari paduv ducdefugo ojkod zu te nesa wagean ezu. Zutoda ore ke heotgut dic midohop jal ru zipawi rob gam ter lutwo mebuwec hiho ajtozaje ezeilem. Od ducoiju juowiah iga du hu kimor go puje ravam lo wi hemisew jifi akpo.",
 *		"technology_id": 1,
 *		"created_at": "2020-08-06 20:43:00",
 *		"updated_at": "2020-08-06 20:43:00",
 *		"costs": [
 *			{
 *			"id": 1,
 *			"cost_type": "maintenance_costs",
 *			"description": "Akroke kabbeuw iro defe borok wi zaudusev re je zezow.",
 *			"type": "equipment",
 *			"quantity": 71,
 *			"value": 466988,
 *			"technology_cost_id": 1,
 *			"created_at": "2020-08-06 20:43:00",
 *			"updated_at": "2020-08-06 20:43:00"
 *			},
 *			{
 *			"id": 2,
 *			"cost_type": "development_costs",
 *			"description": "Hucmunnol onoseji faf kofoec it cateknu cilad vogrutur wo aparo.",
 *			"type": "raw_input",
 *			"quantity": 57,
 *			"value": 89507667,
 *			"technology_cost_id": 1,
 *			"created_at": "2020-08-06 20:43:00",
 *			"updated_at": "2020-08-06 20:43:00"
 *			},
 *			{
 *			"id": 3,
 *			"cost_type": "maintenance_costs",
 *			"description": "Muh cebo am gibcul mi cap am ujuemejan fadga vicdof.",
 *			"type": "others",
 *			"quantity": 25,
 *			"value": 72267181,
 *			"technology_cost_id": 1,
 *			"created_at": "2020-08-06 20:43:00",
 *			"updated_at": "2020-08-06 20:43:00"
 *			}
 *		]
 *	}
 */
Route.get('/technologies/:id/costs', 'TechnologyCostController.show').middleware(['handleParams']);
/**
 * @api {put} /technologies/:id/costs Updates Technology Cost
 * @apiGroup Technology Costs
 * @apiPermission UPDATE_TECHNOLOGY or UPDATE_TECHNOLOGIES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Technology ID
 * @apiParam {Boolean} [funding_required] Optional Funding Required Param
 * @apiParam {String} [funding_required[funding_type]] Optional Funding Required
 * @apiParam {Number} [funding_required[funding_value]] Optional Funding Value
 * @apiParam {String} [funding_required[funding_status]] Optional Funding Status
 * @apiParam {String} [notes] Optional Notes
 * @apiParam {Object[]} [costs] Optional Costs
 * @apiParam {Number} [costs.id] If cost ID is passed the cost is updated. if cost ID is not passed the cost is created. If cost ID exists and is not passed the cost is deleted.
 * @apiParam {String} [costs.cost_type] Cost Type.
 * @apiParam {String} [costs.description] Cost Description.
 * @apiParam {String} [costs.type] Type.
 * @apiParam {Number} [costs.quantity] Cost quantity.
 * @apiParam {Number} [costs.value] Cost value.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"funding_required": 1,
 *		"funding_type": "PRIVATE",
 *		"funding_value": 52820093,
 *		"funding_status": "APPROVED",
 *		"notes": "Some important notes.",
 *		"costs": [
 *			{
 *			"id": 1,
 *			"cost_type": "maintenance_costs",
 *			"description": "Akroke kabbeuw iro defe borok wi zaudusev re je zezow.",
 *			"type": "equipment",
 *			"quantity": 80,
 *			"value": 466988
 *			},
 *			{
 *			"id": 2,
 *			"cost_type": "development_costs",
 *			"description": "Hucmunnol onoseji faf kofoec it cateknu cilad vogrutur wo aparo.",
 *			"type": "raw_input",
 *			"quantity": 57,
 *			"value": 89507667
 *
 *			},
 *				{
 *			"cost_type": "development_costs",
 *			"description": "Hucmunnol onoseji faf kofoec it cateknu cilad vogrutur wo aparo.",
 *			"type": "raw_input",
 *			"quantity": 57,
 *			"value": 89507667
 *				}
 *		]
 *	}
 * @apiSuccess {Number} id Technology Cost ID
 * @apiSuccess {Number} technology_id Technology Related ID
 * @apiSuccess {Boolean} funding_required Specifies if is required funding
 * @apiSuccess {String} funding_type Funding Type
 * @apiSuccess {Number} funding_value Funding value
 * @apiSuccess {String} funding_status Funding status
 * @apiSuccess {String} notes Notes
 * @apiSuccess {Date} created_at Technology Cost Register date
 * @apiSuccess {Date} updated_at Technology Cost Update date
 * @apiSuccess {Object[]} costs Related costs
 * @apiSuccess {Number} costs.id Cost ID.
 * @apiSuccess {String} costs.cost_type Cost Type.
 * @apiSuccess {String} costs.description Cost Description.
 * @apiSuccess {String} costs.type Type.
 * @apiSuccess {Number} costs.quantity Cost quantity.
 * @apiSuccess {Number} costs.value Cost value.
 * @apiSuccess {Number} costs.technology_cost_id Technology Cost Related ID.
 * @apiSuccess {Date} costs.created_at Cost Register date
 * @apiSuccess {Date} costs.updated_at Cost Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *		"id": 1,
 *		"funding_required": 1,
 *		"funding_type": "PRIVATE",
 *		"funding_value": 52820093,
 *		"funding_status": "APPROVED",
 *		"notes": "Some important notes.",
 *		"technology_id": 1,
 *		"created_at": "2020-08-06 20:43:00",
 *		"updated_at": "2020-08-10 21:44:42",
 *		"costs": [
 *			{
 *			"id": 1,
 *			"cost_type": "maintenance_costs",
 *			"description": "Akroke kabbeuw iro defe borok wi zaudusev re je zezow.",
 *			"type": "equipment",
 *			"quantity": 80,
 *			"value": 466988,
 *			"technology_cost_id": 1,
 *			"created_at": "2020-08-06 20:43:00",
 *			"updated_at": "2020-08-10 21:50:29"
 *			},
 *			{
 *			"id": 2,
 *			"cost_type": "development_costs",
 *			"description": "Hucmunnol onoseji faf kofoec it cateknu cilad vogrutur wo aparo.",
 *			"type": "raw_input",
 *			"quantity": 57,
 *			"value": 89507667,
 *			"technology_cost_id": 1,
 *			"created_at": "2020-08-06 20:43:00",
 *			"updated_at": "2020-08-06 20:43:00"
 *			},
 *			{
 *			"id": 91,
 *			"cost_type": "development_costs",
 *			"description": "Hucmunnol onoseji faf kofoec it cateknu cilad vogrutur wo aparo.",
 *			"type": "raw_input",
 *			"quantity": 57,
 *			"value": 89507667,
 *			"technology_cost_id": 1,
 *			"created_at": "2020-08-10 21:50:29",
 *			"updated_at": "2020-08-10 21:50:29"
 *			}
 *		]
 *	}
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
 *@apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 */
Route.put('/technologies/:id/costs', 'TechnologyCostController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_TECHNOLOGY, permissions.UPDATE_TECHNOLOGIES]),
	])
	.validator('UpdateTechnologyCost');
