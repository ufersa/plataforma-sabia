const DeviceToken = use('App/Models/DeviceToken');
class DeviceTokenController {
	async store({ auth, request }) {
		const { device_uuid, device_token } = request.all();
		const deviceOwner = await auth.getUser();
		const deviceToken = await deviceOwner.deviceTokens().create({
			device_uuid,
			device_token,
		});
		return deviceToken;
	}

	async show({ auth, params }) {
		const { uuid } = params;
		const deviceOwner = await auth.getUser();
		const deviceToken = await DeviceToken.query()
			.where({ device_uuid: uuid })
			.where({ user_id: deviceOwner.id })
			.first();
		return deviceToken;
	}
}

module.exports = DeviceTokenController;
