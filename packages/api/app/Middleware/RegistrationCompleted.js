/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { errors, errorPayload } = require('../Utils');

class RegistrationCompleted {
	async handle({ auth, request, response }, next, properties) {
		const user = await auth.getUser();

		const unCompletedFields = await user.getCheckData(properties);

		if (unCompletedFields.length) {
			return response
				.status(403)
				.send(
					errorPayload(
						errors.REGISTRATION_UNCOMPLETED,
						request.antl('error.user.registrationUncompleted', { unCompletedFields }),
					),
				);
		}

		return next();
	}
}

module.exports = RegistrationCompleted;
