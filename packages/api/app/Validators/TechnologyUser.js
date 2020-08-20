const BaseValidator = use('App/Validators/BaseValidator');

class TechnologyUser extends BaseValidator {
	get rules() {
		return {
			users: 'required|array',
			'users.*.email': 'required_if:users|string',
		};
	}
}

module.exports = TechnologyUser;
