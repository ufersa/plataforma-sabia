const BaseValidator = use('App/Validators/BaseValidator');

class DisclaimerAccept extends BaseValidator {
	get rules() {
		return {
			disclaimers: 'required|array',
			'disclaimers.*': 'number',
		};
	}
}

module.exports = DisclaimerAccept;
