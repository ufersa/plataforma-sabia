const BaseValidator = use('App/Validators/BaseValidator');

class ConfirmNewEmail extends BaseValidator {
	get rules() {
		return {
			token: 'required',
			scope: 'required|string',
		};
	}
}

module.exports = ConfirmNewEmail;
