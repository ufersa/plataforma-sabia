const BaseValidator = use('App/Validators/BaseValidator');

class UpdatePermission extends BaseValidator {
	get rules() {
		return {
			permission: 'unique:permissions',
		};
	}
}

module.exports = UpdatePermission;
