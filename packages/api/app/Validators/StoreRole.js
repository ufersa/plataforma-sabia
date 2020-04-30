const BaseValidator = use('App/Validators/BaseValidator');

class StoreRole extends BaseValidator {
	get rules() {
		return {
			role: 'required|unique:roles',
			description: 'required',
		};
	}
}

module.exports = StoreRole;
