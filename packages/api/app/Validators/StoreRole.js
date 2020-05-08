const BaseValidator = use('App/Validators/BaseValidator');

class StoreRole extends BaseValidator {
	get rules() {
		return {
			role: 'required|string|unique:roles',
			description: 'required|string',
		};
	}
}

module.exports = StoreRole;
