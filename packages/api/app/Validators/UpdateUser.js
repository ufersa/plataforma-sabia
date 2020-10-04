const BaseValidator = use('App/Validators/BaseValidator');

class UpdateUser extends BaseValidator {
	get rules() {
		return {
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

module.exports = UpdateUser;
