const BaseValidator = use('App/Validators/BaseValidator');

class ConfirmAccount extends BaseValidator {
	get rules() {
		return {
			token: 'required',
			scope: 'string',
		};
	}
}

module.exports = ConfirmAccount;
