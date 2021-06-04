const BaseValidator = use('App/Validators/BaseValidator');

class ConfirmNewEmail extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|exists:users,email',
			token: 'required',
		};
	}
}

module.exports = ConfirmNewEmail;
