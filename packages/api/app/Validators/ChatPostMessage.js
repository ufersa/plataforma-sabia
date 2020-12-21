const BaseValidator = use('App/Validators/BaseValidator');

class ChatPostMessage extends BaseValidator {
	get rules() {
		return {
			content: 'required',
			'content.text': 'required|string|max:150',
		};
	}
}

module.exports = ChatPostMessage;
