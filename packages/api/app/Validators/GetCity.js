const BaseValidator = use('App/Validators/BaseValidator');

class GetCity extends BaseValidator {
	get rules() {
		return {
			name: 'string|max:50',
		};
	}
}

module.exports = GetCity;
