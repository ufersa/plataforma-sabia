const BaseValidator = use('App/Validators/BaseValidator');

class GetState extends BaseValidator {
	get rules() {
		return {
			name: 'string|max:30',
		};
	}
}

module.exports = GetState;
