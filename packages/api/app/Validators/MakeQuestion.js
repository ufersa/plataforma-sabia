const BaseValidator = use('App/Validators/BaseValidator');

class MakeQuestion extends BaseValidator {
	get rules() {
		return {
			question: 'string|required',
		};
	}
}

module.exports = MakeQuestion;
