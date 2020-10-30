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
	async store({ request }) {
		const data = request.only(this.fields);
		return Institution.create(data);
	}

	/**
	 * Update an institution.
	 * PUT /institution/:id
	 */
	async update({ request, params }) {
		const { id } = params;
		const data = request.only(this.fields);
		return Institution.query()
			.where({ id })
			.merge(data)
			.save();
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
				throw new Error(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
			}

			return response.status(200).send({ success: true });
		} catch (error) {
			return response.status(400).send(error.message);
		}
	}
}

module.exports = InstitutionController;
