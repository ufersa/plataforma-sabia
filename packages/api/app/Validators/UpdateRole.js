const BaseValidator = use('App/Validators/BaseValidator');

class UpdateRole extends BaseValidator {
	get rules() {
		return {
			role: 'unique:roles',
		};
	}
}

module.exports = UpdateRole;
