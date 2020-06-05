const BaseValidator = use('App/Validators/BaseValidator');

class Session extends BaseValidator {
	get rules() {
		return {
			email: 'required|email',
			password: 'required|string',
		};
	}
}

module.exports = Session;
