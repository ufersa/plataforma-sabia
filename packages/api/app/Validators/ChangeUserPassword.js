const BaseValidator = use('App/Validators/BaseValidator');

class ChangeUserPassword extends BaseValidator {
	get rules() {
		return {
			currentPassword: 'required|string',
			newPassword: 'required|string',
		};
	}
}

module.exports = ChangeUserPassword;
