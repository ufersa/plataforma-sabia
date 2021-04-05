const BaseValidator = use('App/Validators/BaseValidator');

const { ordersTypes } = require('../Utils');

class CloseOrder extends BaseValidator {
	get rules() {
		return {
			quantity: 'required|number',
			unit_value: 'required|number',
			orderType: `required|string|in:${Object.values(ordersTypes).join()}`,
		};
	}
}

module.exports = CloseOrder;
