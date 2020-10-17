const BaseValidator = use('App/Validators/BaseValidator');
const { technologyStatuses } = require('../Utils');

class UpdateTechnologyStatus extends BaseValidator {
	get rules() {
		return {
			status: `required|string|in:${Object.values(technologyStatuses).join()}`,
		};
	}
}

module.exports = UpdateTechnologyStatus;
