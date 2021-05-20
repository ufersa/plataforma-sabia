const BaseValidator = use('App/Validators/BaseValidator');

class ResetPassword extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|exists:users,email',
			token: 'required',
			password: 'required|string',
		};
	}
}

module.exports = ResetPassword;
