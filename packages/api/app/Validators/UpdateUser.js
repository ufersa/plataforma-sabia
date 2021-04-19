const BaseValidator = use('App/Validators/BaseValidator');

class UpdateUser extends BaseValidator {
	get rules() {
		return {
			full_name: 'required|string',
			zipcode: 'required|number',
			cpf: 'required|number|cpf',
			birth_date: 'required|date',
			phone_number: 'required|string',
			institution_id: 'number|exists:institutions,id',
			lattes_id: 'number',
			address: 'required|string',
			address2: 'required|string',
			district: 'required|string',
			city: 'required|string',
			state: 'required|string',
			country: 'required|string',
			areas: 'array|max:4',
			'areas.*': 'number|exists:knowledge_areas,knowledge_area_id',
		};
	}
}

module.exports = UpdateUser;
