const BaseValidator = use('App/Validators/BaseValidator');

class MakeQuestion extends BaseValidator {
	get rules() {
		return {
			technology: 'required',
			question: 'string|required',
		};
	}
}

module.exports = MakeQuestion;
