const BaseValidator = use('App/Validators/BaseValidator');

class ConfirmAccount extends BaseValidator {
	get rules() {
		return {
			token: 'required',
			scope: 'required|string',
		};
	}
}

module.exports = ConfirmAccount;
