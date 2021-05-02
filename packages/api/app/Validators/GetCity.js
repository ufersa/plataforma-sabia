const BaseValidator = use('App/Validators/BaseValidator');

class GetCity extends BaseValidator {
	get rules() {
		return {
			state: 'required|max:2',
			name: 'string|max:50',
		};
	}
}

module.exports = GetCity;
