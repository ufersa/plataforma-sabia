const BaseValidator = use('App/Validators/BaseValidator');
const { disclaimersTypes } = require('../Utils');

class Disclaimer extends BaseValidator {
	get rules() {
		return {
			description: 'required|string',
			required: 'required|boolean',
			type: `required|string|in:${Object.values(disclaimersTypes).join()}`,
			version: 'required|string',
		};
	}
}

module.exports = Disclaimer;
