/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Institution = use('App/Models/Institution');
const Upload = use('App/Models/Upload');
const User = use('App/Models/User');
const { errors, errorPayload, getTransaction, Algolia } = require('../../Utils');

class InstitutionController {
	constructor() {
		this.algolia = Algolia.initIndex('institution');
		this.fields = [
			'name',
			'initials',
			'cnpj',
			'address',
			'district',
			'zipcode',
			'city',
			'state',
			'lat',
			'lng',
			'email',
			'phone_number',
			'website',
			'type',
			'category',
			'logo_id',
		];
	}

	/**
	 * Show all institutions.
	 * GET /institutions
	 */
	async index({ request }) {
		return Institution.query()
			.withFilters(request)
			.withParams(request);
	}

	/**
	 * Show an institution.
	 * GET /institutions/:id
	 */
	async show({ request }) {
		return Institution.query().withParams(request);
	}

	/**
	 * Create an institution.
	 * POST /institutions
	 */
	async store({ request, response, auth }) {
		const { logo_id = null, ...data } = request.only(this.fields);

		let institution;
		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();
			institution = await Institution.create(data, trx);
			await institution.responsible().associate(auth.user, trx);
			if (logo_id) {
				const logo = await Upload.findOrFail(logo_id);
				await institution.logo().associate(logo, trx);
			}
			await Promise.all([Algolia.saveIndex('institution', institution), commit()]);
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return response.status(201).send({ institution });
	}

	/**
	 * Update an institution.
	 * PUT /institutions/:id
	 */
	async update({ request, params }) {
		const { id } = params;
		const { logo_id, ...data } = request.only(this.fields);
		const institution = await Institution.findOrFail(id);
		institution.merge(data);
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();
			await institution.save(trx);
			if (logo_id) {
				const logo = await Upload.findOrFail(logo_id);
				await institution.logo().associate(logo, trx);
			}
			await Promise.all([Algolia.saveIndex('institution', institution), commit()]);
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return institution;
	}

	/**
	 * Update institution responsible.
	 * PUT /institutions/:id/update-responsible
	 */
	async updateResponsible({ request, params }) {
		const { id } = params;
		const { responsible } = request.all();
		const newResponsible = await User.findOrFail(responsible);
		const institution = await Institution.findOrFail(id);
		await institution.responsible().dissociate();
		await institution.responsible().associate(newResponsible);
		await Algolia.saveIndex('institution', institution);
		return institution;
	}

	/**
	 * Delete an institution.
	 * DELETE permissions/:id
	 */
	async destroy({ request, params, response }) {
		const { id } = params;
		const institution = await Institution.findOrFail(id);
		const result = await institution.delete();
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
		await this.algolia.deleteObject(institution.toJSON().objectID);
		return response.status(200).send({ success: true });
	}

	/**
	 * Delete many institution with array of id.
	 * DELETE institutions?ids=0,0,0
	 */
	async destroyMany({ request, response }) {
		const { ids } = request.params;
		const result = await Institution.query()
			.whereIn('id', ids)
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

		await Promise.all(
			ids.map(async (id) => this.algolia.deleteObject(new Institution().getObjectId({ id }))),
		);

		return response.status(200).send({ success: true });
	}
}

module.exports = InstitutionController;
