const BaseValidator = use('App/Validators/BaseValidator');

class ChangeUserEmail extends BaseValidator {
	get rules() {
		return {
			temp_email: 'required|email|unique:users,email',
			scope: 'required|string',
		};
	}
}

module.exports = ChangeUserEmail;
