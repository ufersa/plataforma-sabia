const BaseValidator = use('App/Validators/BaseValidator');

class ChangeUserEmail extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|unique:users,email',
		};
	}
}

module.exports = ChangeUserEmail;
