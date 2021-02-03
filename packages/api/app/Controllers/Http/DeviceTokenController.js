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
}

module.exports = DeviceTokenController;
