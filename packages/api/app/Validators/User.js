const BaseValidator = use('App/Validators/BaseValidator');

class User extends BaseValidator {
	get rules() {
		return {
			email: 'required|email|unique:users',
			first_name: 'required_without_all:full_name',
			full_name: 'required_without_all:first_name',
			password: 'required|string',
			zipcode: 'number',
			cpf: 'number|cpf',
			birth_date: 'date',
			phone_number: 'string',
			lattes_id: 'number',
			address: 'string',
			address2: 'string',
			district: 'string',
			city: 'string',
			state: 'string',
			country: 'string',
		};
	}
}

module.exports = User;
