const BaseValidator = use('App/Validators/BaseValidator');

class ResendConfirmationEmail extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|exists:users,email',
		};
	}
}

module.exports = ResendConfirmationEmail;
