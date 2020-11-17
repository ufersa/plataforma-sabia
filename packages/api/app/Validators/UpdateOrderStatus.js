const BaseValidator = use('App/Validators/BaseValidator');
const { orderStatuses } = require('../Utils');

class UpdateOrderStatus extends BaseValidator {
	get rules() {
		return {
			status: `required|string|in:${Object.values(orderStatuses).join()}`,
		};
	}
}

module.exports = UpdateOrderStatus;
