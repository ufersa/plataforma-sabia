const BaseValidator = use('App/Validators/BaseValidator');

class StoreServiceOrder extends BaseValidator {
	get rules() {
		return {
			services: 'array|required',
			'services.*.service_id': 'required|number|exists:services,id',
			'services.*.quantity': 'required|number',
		};
	}
}

module.exports = StoreServiceOrder;
