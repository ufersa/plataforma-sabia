const BaseValidator = use('App/Validators/BaseValidator');

class AnswerQuestion extends BaseValidator {
	get rules() {
		return {
			answer: 'string|required',
		};
	}
}

module.exports = AnswerQuestion;
