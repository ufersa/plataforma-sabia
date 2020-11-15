const BaseValidator = use('App/Validators/BaseValidator');

class UpdateInstitution extends BaseValidator {
	get rules() {
		return {
			name: 'string',
			initials: 'string',
			cnpj: 'string',
			address: 'string',
			district: 'string',
			zipcode: 'string',
			city: 'string',
			state: 'string',
			lat: 'string',
			lng: 'string',
		};
	}
}

module.exports = UpdateInstitution;
