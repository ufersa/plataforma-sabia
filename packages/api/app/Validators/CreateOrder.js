const BaseValidator = use('App/Validators/BaseValidator');
const { technologyUseStatuses, fundingStatuses } = require('../Utils');

class CreateOrder extends BaseValidator {
	get rules() {
		return {
			quantity: 'required|number',
			use: `required|string|in:${Object.values(technologyUseStatuses).join()}`,
			funding: `required|string|in:${Object.values(fundingStatuses).join()}`,
			comment: 'string',
		};
	}
}

module.exports = CreateOrder;
