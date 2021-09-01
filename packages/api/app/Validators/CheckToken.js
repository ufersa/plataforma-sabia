const BaseValidator = use('App/Validators/BaseValidator');

const { tokenTypes } = require('../Utils');

class CheckToken extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|exists:users,email',
			token: 'required',
			tokenType: `required|string|in:${Object.values(tokenTypes).join()}`,
		};
	}
}

module.exports = CheckToken;
