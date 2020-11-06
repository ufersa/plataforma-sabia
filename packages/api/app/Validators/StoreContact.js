const BaseValidator = use('App/Validators/BaseValidator');

class StoreContact extends BaseValidator {
	get rules() {
		return {
			name: 'required|string',
			email: 'required|email',
			phone: 'required',
			subject: 'required|string',
			message: 'required|string',
		};
	}
}

module.exports = StoreContact;
