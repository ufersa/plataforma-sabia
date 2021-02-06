const DeviceToken = use('App/Models/DeviceToken');
const { errorPayload, errors } = require('../../Utils');

class DeviceTokenController {
	async index({ auth }) {
		const deviceOwner = await auth.getUser();
		const deviceTokens = await DeviceToken.query()
			.where({ user_id: deviceOwner.id })
			.fetch();
		return deviceTokens;
	}

	async store({ auth, request }) {
		const { device_uuid, device_token } = request.all();
		const deviceOwner = await auth.getUser();
		const deviceToken = await deviceOwner.deviceTokens().create({
			device_uuid,
			device_token,
		});
		return deviceToken;
	}

	async update({ auth, params, request, response }) {
		const { device_token } = request.all();
		const { uuid } = params;
		const deviceOwner = await auth.getUser();
		const deviceToken = await DeviceToken.query()
			.where({ device_uuid: uuid })
			.where({ user_id: deviceOwner.id })
			.first();
		if (!deviceToken) {
			return response
				.status(403)
				.send(
					errorPayload(
						errors.UNAUTHORIZED_ACCESS,
						request.antl('error.permission.unauthorizedAccess'),
					),
				);
		}
		deviceToken.device_token = device_token;
		await deviceToken.save();
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
