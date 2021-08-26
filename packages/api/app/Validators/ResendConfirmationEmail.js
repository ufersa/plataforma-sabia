const BaseValidator = use('App/Validators/BaseValidator');

class ResendConfirmationEmail extends BaseValidator {
	get rules() {
		return {
			email: 'required|email',
		};
	}
}

module.exports = ResendConfirmationEmail;
