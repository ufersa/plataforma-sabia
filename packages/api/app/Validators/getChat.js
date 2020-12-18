const BaseValidator = use('App/Validators/BaseValidator');
const { chatTypes } = require('../Utils');

class getChat extends BaseValidator {
	get rules() {
		return {
			target_user: 'required|number|exists:users,id',
			object_type: `required|string|in:${Object.values(chatTypes).join()}`,
			object_id: 'required|number',
		};
	}
}

module.exports = getChat;
