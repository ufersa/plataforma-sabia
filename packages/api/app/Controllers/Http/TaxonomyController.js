/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');
const Taxonomy = use('App/Models/Taxonomy');

const { antl, errors, errorPayload } = require('../../Utils');

class TaxonomyController {
	/**
	 * Show a list of all taxonomies.
	 * GET taxonomies
	 */
	async index() {
		return Taxonomy.all();
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
	async show({ params }) {
		const { id } = params;
		let taxonomy;
		try {
			taxonomy = await Taxonomy.getTaxonomy(id);
		} catch (error) {
			throw new ResourceNotFoundException('taxonomy', 400, 'E_RESOURCE_NOT_FOUND');
		}
		return taxonomy;
	}

	/**
	 * Get a taxonomy terms.
	 * GET taxonomies/:id/terms
	 */
	async showTerms({ params }) {
		const { id } = params;
		let taxonomy;
		try {
			taxonomy = await Taxonomy.getTaxonomy(id);
		} catch (error) {
			throw new ResourceNotFoundException('taxonomy', 400, 'E_RESOURCE_NOT_FOUND');
		}
		return taxonomy.terms().fetch();
	}

	/**
	 * Update taxonomy details.
	 * PUT or PATCH taxonomies/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		let upTaxonomy;
		try {
			upTaxonomy = await Taxonomy.getTaxonomy(id);
		} catch (error) {
			throw new ResourceNotFoundException('taxonomy', 400, 'E_RESOURCE_NOT_FOUND');
		}
		const { taxonomy, description } = request.all();
		upTaxonomy.merge({ taxonomy, description });
		await upTaxonomy.save();
		return upTaxonomy.toJSON();
	}

	/**
	 * Delete a taxonomy with id.
	 * DELETE taxonomies/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		let taxonomy;
		try {
			taxonomy = await Taxonomy.getTaxonomy(id);
		} catch (error) {
			throw new ResourceNotFoundException('taxonomy', 400, 'E_RESOURCE_NOT_FOUND');
		}
		const result = await taxonomy.delete();

		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						antl('error.resource.resourceDeletedError'),
					),
				);
		}

		return response.status(200).send({ success: true });
	}
}

module.exports = TaxonomyController;
