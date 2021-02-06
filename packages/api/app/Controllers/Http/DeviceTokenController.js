const DeviceToken = use('App/Models/DeviceToken');
const { errorPayload, errors } = require('../../Utils');

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

	async destroy({ auth, params, response, request }) {
		const { uuid } = params;
		const deviceOwner = await auth.getUser();
		const result = await DeviceToken.query()
			.where({ device_uuid: uuid })
			.where({ user_id: deviceOwner.id })
			.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}

	async destroyMany({ auth, response, request }) {
		const deviceOwner = await auth.getUser();
		const result = await DeviceToken.query()
			.where({ user_id: deviceOwner.id })
			.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}
}

module.exports = DeviceTokenController;
