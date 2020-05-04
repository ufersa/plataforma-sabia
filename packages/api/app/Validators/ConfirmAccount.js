const BaseValidator = use('App/Validators/BaseValidator');

class ConfirmAccount extends BaseValidator {
	get rules() {
		return {
			email: 'required|email',
			scope: 'string',
		};
	}
}

module.exports = ConfirmAccount;
