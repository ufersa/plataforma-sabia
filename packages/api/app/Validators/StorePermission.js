const BaseValidator = use('App/Validators/BaseValidator');

class StorePermission extends BaseValidator {
	get rules() {
		return {
			permission: 'required|unique:permissions',
			description: 'required',
		};
	}
}

module.exports = StorePermission;
