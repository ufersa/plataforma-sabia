const BaseValidator = use('App/Validators/BaseValidator');

class StoreTechnologyCost extends BaseValidator {
	get rules() {
		return {
			costs: 'array|required',
			'costs.*.cost_type': 'in:DEVELOPMENT COST,IMPLEMENTATION COST,MAINTENANCE COST',
			'costs.*.description': 'string|required',
			'costs.*.type': 'string|required',
			'costs.*.quantity': 'number|required',
			'costs.*.value': 'number|required',
		};
	}
}

module.exports = StoreTechnologyCost;
