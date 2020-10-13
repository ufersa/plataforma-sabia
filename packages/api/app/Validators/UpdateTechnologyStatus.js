const BaseValidator = use('App/Validators/BaseValidator');
const { technologyStatuses } = require('../Utils');

class UpdateTechnologyStatus extends BaseValidator {
	get rules() {
		return {
			status: `required|string|in:${Object.entries(technologyStatuses)
				.map((status) => status[1])
				.join()}`,
		};
	}
}

module.exports = UpdateTechnologyStatus;
