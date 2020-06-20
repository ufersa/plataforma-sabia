const BaseValidator = use('App/Validators/BaseValidator');

class UpdateRole extends BaseValidator {
	get rules() {
		return {
			role: 'string|unique:roles,id',
		};
	}
}

module.exports = UpdateRole;
