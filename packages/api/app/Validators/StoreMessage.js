const { messagesTypes } = require('../Utils');

const BaseValidator = use('App/Validators/BaseValidator');

class StoreMessage extends BaseValidator {
	get rules() {
		return {
			to: 'required|email|exists:users,email',
			subject: 'required|string',
			content: 'required|string',
			type: `required|string|in:${Object.values(messagesTypes).join()}`,
		};
	}
}

module.exports = StoreMessage;
