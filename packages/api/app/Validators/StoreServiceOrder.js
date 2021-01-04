class StoreServiceOrder {
	get rules() {
		return {
			services: 'array|required',
			'services.*.service_id': 'required|number|exists:services,id',
			'services.*.quantity': 'required|number',
		};
	}
}

module.exports = StoreServiceOrder;
