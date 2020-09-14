/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Taxonomy = use('App/Models/Taxonomy');
const Term = use('App/Models/Term');

const { errors, errorPayload } = require('../../Utils');

class TaxonomyController {
	/**
	 * Show a list of all taxonomies.
	 * GET taxonomies
	 */
	async index({ request }) {
		const filters = request.all();

		return Taxonomy.query()
			.withFilters(filters)
			.withParams(request);
	}

	/**
	 * Create/save a new taxonomy.
	 * POST taxonomies
	 */
	async store({ request }) {
		const { taxonomy, description } = request.all();
		return Taxonomy.create({ taxonomy, description });
	}

	/**
	 * Get a single taxonomy.
	 * GET taxonomies/:id
	 */
	async show({ request }) {
		const filters = request.all();

		return Taxonomy.query()
			.getTaxonomy(request.params.id)
			.withFilters(filters)
			.withParams(request);
	}

	/**
	 * Get a taxonomy terms.
	 * GET taxonomies/:id/terms
	 */
	async showTerms({ request, params }) {
		const filters = request.all();
		// using getTaxonomy to yield errors if taxonomy does not exist
		const taxonomy = await Taxonomy.getTaxonomy(params.id);
		filters.taxonomy = taxonomy.id;

		return Term.query()
			.withFilters(filters)
			.withParams(request, { filterById: false });
	}

	/**
	 * Update taxonomy details.
	 * PUT or PATCH taxonomies/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upTaxonomy = await Taxonomy.getTaxonomy(id);
		const { taxonomy, description } = request.all();
		upTaxonomy.merge({ taxonomy, description });
		await upTaxonomy.save();
		return upTaxonomy.toJSON();
	}

	/**
	 * Delete a taxonomy with id.
	 * DELETE taxonomies/:id
	 */
	async destroy({ params, request, response }) {
		const { id } = params;
		const taxonomy = await Taxonomy.getTaxonomy(id);
		const result = await taxonomy.delete();
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
		return response.status(200).send({ success: true });
	}
}

module.exports = TaxonomyController;
