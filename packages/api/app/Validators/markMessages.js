const BaseValidator = use('App/Validators/BaseValidator');

class markMessages extends BaseValidator {
	get rules() {
		return {
			messages: 'required|array',
			'messages.*': 'number|exists:messages,id',
		};
	}
}

module.exports = markMessages;
