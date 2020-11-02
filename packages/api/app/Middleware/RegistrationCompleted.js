/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const RegistrationUncompletedException = use('App/Exceptions/RegistrationUncompletedException');

class RegistrationCompleted {
	async handle({ auth }, next, properties) {
		const user = await auth.getUser();

		if (properties[0] === 'be_curator') {
			if (!user.toJSON().can_be_curator) {
				throw new RegistrationUncompletedException();
			}
		}

		if (properties[0] === 'acquire_technology') {
			if (!user.toJSON().can_buy_technology) {
				throw new RegistrationUncompletedException();
			}
		}

		return next();
	}
}

module.exports = RegistrationCompleted;
