const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTechnologyCost extends BaseValidator {
	get rules() {
		return {
			costs: 'array',
			'costs.*.cost_type': 'in:DEVELOPMENT COST,IMPLEMENTATION COST,MAINTENANCE COST',
			'costs.*.description': 'string',
			'costs.*.type': 'string',
			'costs.*.quantity': 'number',
			'costs.*.value': 'number',
		};
	}
}

module.exports = UpdateTechnologyCost;
