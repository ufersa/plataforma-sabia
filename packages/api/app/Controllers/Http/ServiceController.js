const Service = use('App/Models/Service');
const Term = use('App/Models/Term');

const { getTransaction, errorPayload, errors } = require('../../Utils');

class ServiceController {
	async syncronizeTerms(trx, keywords, service, detach = false) {
		const keywordInstances = await Promise.all(
			keywords.map((keyword) => Term.getTerm(keyword)),
		);
		if (detach) {
			await service.terms().detach(null, null, trx);
		}

		await service.terms().attach(
			keywordInstances.map((keyword) => keyword.id),
			null,
			trx,
		);
	}

	async store({ auth, request, response }) {
		const { name, description, type, price, measure_unit, keywords } = request.all();
		const serviceResponsible = await auth.getUser();
		if (!serviceResponsible.institution_id) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.USER_WITHOUT_INSTITUTION,
						request.antl('error.user.withoutInstitution'),
					),
				);
		}
		let service;
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			service = await Service.create(
				{
					name,
					description,
					type,
					price,
					measure_unit,
				},
				trx,
			);
			await service.user().associate(serviceResponsible, trx);
			if (keywords) {
				await this.syncronizeTerms(trx, keywords, service);
			}
			await service.load('terms');
			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return service;
	}
}

module.exports = ServiceController;
