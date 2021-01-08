const BaseValidator = use('App/Validators/BaseValidator');

const { institutionsTypes, institutionsCategories } = require('../Utils');

class StoreInstitution extends BaseValidator {
	get rules() {
		return {
			name: 'required|string',
			initials: 'required|string',
			cnpj: 'required|cnpj|unique:institutions,cnpj',
			address: 'required|string',
			district: 'required|string',
			zipcode: 'required|string',
			city: 'required|string',
			state: 'required|string',
			lat: 'required|string',
			lng: 'required|string',
			email: 'email',
			phone_number: 'string',
			website: 'url',
			type: `required|string|in:${Object.values(institutionsTypes).join()}`,
			category: `required|string|in:${Object.values(institutionsCategories).join()}`,
			logo_id: 'number|exists:uploads,id',
		};
	}
}

module.exports = StoreInstitution;
