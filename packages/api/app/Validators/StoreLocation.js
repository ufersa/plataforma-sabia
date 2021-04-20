const BaseValidator = use('App/Validators/BaseValidator');

class StoreLocation extends BaseValidator {
	get rules() {
		return {
			place_id: 'required|string|unique:locations',
			address: 'required|string',
			state: 'required|string',
			city_id: 'required|number',
			lat: 'required|string',
			lng: 'required|string',
		};
	}
}

module.exports = StoreLocation;
