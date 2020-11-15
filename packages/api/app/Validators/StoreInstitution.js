const BaseValidator = use('App/Validators/BaseValidator');

class StoreInstitution extends BaseValidator {
	get rules() {
		return {
			name: 'required|string',
			initials: 'required|string',
			cnpj: 'required|string',
			address: 'required|string',
			district: 'required|string',
			zipcode: 'required|string',
			city: 'required|string',
			state: 'required|string',
			lat: 'required|string',
			lng: 'required|string',
		};
	}
}

module.exports = StoreInstitution;
