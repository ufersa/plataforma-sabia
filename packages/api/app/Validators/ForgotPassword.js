const BaseValidator = use('App/Validators/BaseValidator');

class ForgotPassword extends BaseValidator {
	get rules() {
		return {
			email: 'required|email',
		};
	}
}

module.exports = ForgotPassword;
