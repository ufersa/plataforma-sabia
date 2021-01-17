/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { errors, errorPayload } = require('../Utils');

class RegistrationCompleted {
	async handle({ auth, request, response }, next, properties) {
		const user = await auth.getUser();

		const unCompletedFields = [];

		await Promise.all(
			properties.map(async (check) => {
				if (check === 'check_personal_data') {
					const unCompletedFieldsPD = user.getCheckPersonalData();
					if (unCompletedFieldsPD.length) {
						unCompletedFields.push(...unCompletedFieldsPD);
					}
				}
				if (check === 'check_academic_data') {
					const unCompletedFieldsAD = await user.getCheckAcademicData();
					if (unCompletedFieldsAD.length) {
						unCompletedFields.push(...unCompletedFieldsAD);
					}
				}
				if (check === 'check_organizational_data') {
					const unCompletedFieldsOD = await user.getCheckOrganizationalData();
					if (unCompletedFieldsOD.length) {
						unCompletedFields.push(...unCompletedFieldsOD);
					}
				}
			}),
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
