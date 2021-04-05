const BaseValidator = use('App/Validators/BaseValidator');

const { ordersTypes } = require('../Utils');

class OrderType extends BaseValidator {
	get rules() {
		return {
			orderType: `required|string|in:${Object.values(ordersTypes).join()}`,
		};
	}
}

module.exports = OrderType;
