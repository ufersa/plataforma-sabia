const BaseValidator = use('App/Validators/BaseValidator');

class Disclaimer extends BaseValidator {
	get rules() {
		return {
			description: 'required|string',
			required: 'required|boolean',
			type: 'in:privacypolicy,termsOfUseRegister,termsOfUseTechnology',
			version: 'required|string',
		};
	}
}

module.exports = Disclaimer;
