const BaseValidator = use('App/Validators/BaseValidator');

class UpdateUser extends BaseValidator {
	get rules() {
		return {
			email: 'email|unique:users',
		};
	}
}

module.exports = UpdateUser;
