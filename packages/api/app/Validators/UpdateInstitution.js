const BaseValidator = use('App/Validators/BaseValidator');

const { institutionsTypes, institutionsCategories } = require('../Utils');

class UpdateInstitution extends BaseValidator {
	get rules() {
		const { id: institutionId } = this.ctx.params;

		return {
			name: 'string',
			initials: 'string',
			cnpj: `cnpj|unique:institutions,cnpj,id,${institutionId}`,
			address: 'string',
			district: 'string',
			zipcode: 'string',
			city: 'string',
			state: 'string',
			lat: 'string',
			lng: 'string',
			email: 'email',
			phone_number: 'string',
			website: 'url',
			type: `string|in:${Object.values(institutionsTypes).join()}`,
			category: `string|in:${Object.values(institutionsCategories).join()}`,
			logo_id: 'number|exists:uploads,id',
		};
	}
}

module.exports = UpdateInstitution;
