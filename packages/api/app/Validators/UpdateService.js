const { servicesTypes, serviceMeasureUnits } = require('../Utils');

const BaseValidator = use('App/Validators/BaseValidator');

class UpdateService extends BaseValidator {
	get rules() {
		return {
			name: 'string',
			description: 'string',
			type: `string|in:${Object.values(servicesTypes).join()}`,
			price: 'number',
			measure_unit: `string|in:${Object.values(serviceMeasureUnits).join()}`,
			keywords: 'array',
		};
	}
}

module.exports = UpdateService;
