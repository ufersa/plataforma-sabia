/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Institution = use('App/Models/Institution');

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
		const institution = await Institution.create(data);
		await institution.user_id().associate(auth.user);
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
	async destroy({ params }) {
		const { id } = params;
		const institution = await Institution.findOrFail(id);
		await institution.delete();
	}
}

module.exports = InstitutionController;
