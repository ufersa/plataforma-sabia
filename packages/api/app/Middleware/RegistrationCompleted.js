/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const RegistrationUncompletedException = use('App/Exceptions/RegistrationUncompletedException');

class RegistrationCompleted {
	async handle({ auth }, next) {
		const user = await auth.getUser();

		if (!user.toJSON().registration_completed) {
			throw new RegistrationUncompletedException();
		}

		return next();
	}
}

module.exports = RegistrationCompleted;
