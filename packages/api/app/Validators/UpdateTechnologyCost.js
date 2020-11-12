const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTechnologyCost extends BaseValidator {
	get rules() {
		return {
			is_seller: 'required|boolean',
			price: 'required_when:is_seller,true|required_when:is_seller,1',
			costs: 'array',
			'costs.*.id': 'number|exists:costs,id',
			'costs.*.cost_type': 'string',
			'costs.*.description': 'string',
			'costs.*.type': 'string',
			'costs.*.quantity': 'number',
			'costs.*.value': 'number',
			'costs.*.measure_unit': 'string',
		};
	}
}

module.exports = UpdateTechnologyCost;
