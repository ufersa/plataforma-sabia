const BaseValidator = use('App/Validators/BaseValidator');

class UpdateLocation extends BaseValidator {
	get rules() {
		return {
			place_id: 'string|unique:locations',
			address: 'string',
			city_id: 'number|exists:cities,id',
			lat: 'string',
			lng: 'string',
		};
	}
}

module.exports = UpdateLocation;
