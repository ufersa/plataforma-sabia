const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTechnologyStatus extends BaseValidator {
	get rules() {
		return {
			status: 'required|string|in:pending,in review,rejected,published',
		};
	}
}

module.exports = UpdateTechnologyStatus;
