const Service = use('App/Models/Service');
const Term = use('App/Models/Term');
const Upload = use('App/Models/Upload');

const { getTransaction, errorPayload, errors, Algolia } = require('../../Utils');

class ServiceController {
	constructor() {
		this.algoliaIndexName = 'service';
		this.algoliaIndex = Algolia.initIndex(this.algoliaIndexName);
	}

	async index({ request }) {
		const filters = request.all();
		return Service.query()
			.available()
			.with('keywords')
			.with('user.institution')
			.with('thumbnail')
			.withFilters(filters)
			.withParams(request);
	}

	async show({ request }) {
		return Service.query()
			.available()
			.with('keywords')
			.with('user.institution')
			.with('thumbnail')
			.withParams(request);
	}

	async getAuthenticatedUserServices({ request, auth }) {
		const user = await auth.getUser();

		return Service.query()
			.where({ user_id: user.id })
			.with('keywords')
			.with('user.institution')
			.with('thumbnail')
			.withParams(request);
	}

	async syncronizeKeywords(trx, keywords, service, detach = false) {
		const keywordInstances = await Promise.all(
			keywords.map((keyword) => Term.getTerm(keyword)),
		);
		if (detach) {
			await service.keywords().detach(null, null, trx);
		}

		await service.keywords().attach(
			keywordInstances.map((keyword) => keyword.id),
			null,
			trx,
		);
	}

	async store({ auth, request }) {
		const {
			name,
			description,
			type,
			price,
			measure_unit,
			payment_message,
			keywords,
			thumbnail_id,
		} = request.all();
		const serviceResponsible = await auth.getUser();
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
					likes: 0,
					payment_message,
					active: 1,
				},
				trx,
			);
			await service.user().associate(serviceResponsible, trx);

			if (keywords) {
				await this.syncronizeKeywords(trx, keywords, service);
			}

			if (thumbnail_id) {
				const thumbnail = await Upload.findOrFail(thumbnail_id);
				await service.thumbnail().associate(thumbnail, trx);
			} else {
				service.thumbnail_id = null;
			}

			await service.loadMany(['keywords', 'user.institution', 'thumbnail']);

			await Promise.all([Algolia.saveIndex(this.algoliaIndexName, service), commit()]);
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return service;
	}

	async update({ params, request }) {
		const data = request.only([
			'name',
			'description',
			'type',
			'price',
			'measure_unit',
			'payment_message',
			'thumbnail_id',
		]);
		const service = await Service.findOrFail(params.id);
		service.merge(data);
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await service.save(trx);

			const { keywords } = request.only(['keywords']);
			if (keywords) {
				await this.syncronizeKeywords(trx, keywords, service, true);
			}

			await service.loadMany(['keywords', 'user.institution', 'thumbnail']);

			await Promise.all([Algolia.saveIndex(this.algoliaIndexName, service), commit()]);
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return service;
	}

	/**
	 * Updates service active status.
	 * PUT services/:id/active
	 * If it is active, it changes to inactive.
	 * If it is inactive, it changes to active.
	 */
	async updateActiveStatus({ params, response }) {
		const service = await Service.findOrFail(params.id);
		service.merge({ active: !service.active });
		await service.save();
		await service.loadMany(['keywords', 'user.institution']);

		if (service.active) {
			await Algolia.saveIndex(this.algoliaIndexName, service);
		} else {
			await this.algoliaIndex.deleteObject(service.toJSON().objectID);
		}

		return response.status(204).send();
	}

	async destroy({ params, request, response }) {
		const service = await Service.findOrFail(params.id);
		// detaches related entities
		await service.keywords().detach();
		const result = await service.delete();
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

		await this.algoliaIndex.deleteObject(service.toJSON().objectID);
		return response.status(200).send({ success: true });
	}
}

module.exports = ServiceController;
