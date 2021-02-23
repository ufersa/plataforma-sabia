const BaseValidator = use('App/Validators/BaseValidator');

class StoreDeviceToken extends BaseValidator {
	get rules() {
		return {
			device_uuid: 'required|string|unique:device_tokens',
			device_token: 'required|string',
		};
	}
}

module.exports = StoreDeviceToken;
