const BaseValidator = use('App/Validators/BaseValidator');

class ConfirmNewEmail extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|exists:users,email',
			token: 'required',
			scope: 'required|string',
		};
	}
}

module.exports = ConfirmNewEmail;
