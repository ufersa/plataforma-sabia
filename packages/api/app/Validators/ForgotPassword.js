const BaseValidator = use('App/Validators/BaseValidator');

class ForgotPassword extends BaseValidator {
	get rules() {
		return {
			email: 'required|email',
			template: 'string',
		};
	}
}

module.exports = ForgotPassword;
