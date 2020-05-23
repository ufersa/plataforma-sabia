const BaseValidator = use('App/Validators/BaseValidator');

class StorePermission extends BaseValidator {
	get rules() {
		return {
			permission: 'required|string|unique:permissions',
			description: 'required|string',
		};
	}
}

module.exports = StorePermission;
