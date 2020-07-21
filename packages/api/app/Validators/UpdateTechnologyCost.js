const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTechnologyCost extends BaseValidator {
	get rules() {
		return {
			costs: 'array',
			'costs.*.id': 'number|exists:costs,id',
			'costs.*.cost_type': 'in:DEVELOPMENT_COST,IMPLEMENTATION_COST,MAINTENANCE_COST',
			'costs.*.description': 'string',
			'costs.*.type': 'string',
			'costs.*.quantity': 'number',
			'costs.*.value': 'number',
		};
	}
}

module.exports = UpdateTechnologyCost;
