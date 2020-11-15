/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Institution = use('App/Models/Institution');
const { errors, errorPayload } = require('../../Utils');

class InstitutionController {
	constructor() {
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
		const data = request.only(this.fields);
		const institution = await Institution.create({ ...data, user_id: auth.user.id });
		return response.status(201).send({ institution });
	}

	/**
	 * Update an institution.
	 * PUT /institution/:id
	 */
	async update({ request, params, response }) {
		const { id } = params;
		const data = request.only(this.fields);
		await Institution.query()
			.where({ id })
			.update(data);
		return response.status(204).send();
	}

	/**
	 * Delete an institution.
	 * DELETE permissions/:id
	 */
	async destroy({ params, request, response }) {
		try {
			const { id } = params;
			const result = await Institution.query()
				.where({ id })
				.delete();

			if (!result) {
				throw errorPayload(
					errors.RESOURCE_DELETED_ERROR,
					request.antl('error.resource.resourceDeletedError'),
				);
			}

			return response.status(204).send();
		} catch (error) {
			return response.status(400).send(error);
		}
	}
}

module.exports = InstitutionController;
