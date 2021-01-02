const { servicesTypes, serviceMeasureUnits } = require('../Utils');

const BaseValidator = use('App/Validators/BaseValidator');

class StoreService extends BaseValidator {
	get rules() {
		return {
			name: 'string|required',
			description: 'string|required',
			type: `required|string|in:${Object.values(servicesTypes).join()}`,
			price: 'required|number',
			measure_unit: `required|string|in:${Object.values(serviceMeasureUnits).join()}`,
			keywords: 'array|required',
		};
	}
}

module.exports = StoreService;
