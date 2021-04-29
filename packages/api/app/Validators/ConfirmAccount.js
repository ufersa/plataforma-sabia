const BaseValidator = use('App/Validators/BaseValidator');

class ConfirmAccount extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|exists:users,email',
			token: 'required',
		};
	}
}

module.exports = ConfirmAccount;
