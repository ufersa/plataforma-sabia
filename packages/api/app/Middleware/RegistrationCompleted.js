/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { errors, errorPayload } = require('../Utils');

class RegistrationCompleted {
	async handle({ auth, request, response }, next, properties) {
		const user = await auth.getUser();
		const mappingCheckMethods = {
			check_personal_data: 'getCheckPersonalData',
			check_academic_data: 'getCheckAcademicData',
			check_organizational_data: 'getCheckOrganizationalData',
		};
		const unCompletedFields = await Promise.all(
			properties
				.map(async (check) => (await user[mappingCheckMethods[check]]()) || null)
				.filter(Boolean),
		);

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
