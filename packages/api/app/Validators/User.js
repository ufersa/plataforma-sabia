const BaseValidator = use('App/Validators/BaseValidator');

class User extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|unique:users',
			first_name: 'required_without_all:full_name',
			full_name: 'required_without_all:first_name',
			password: 'required|string',
		};
	}
}

module.exports = User;
