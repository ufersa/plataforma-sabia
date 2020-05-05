/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Taxonomy = use('App/Models/Taxonomy');

const { antl, errors, errorPayload } = require('../../Utils');

class TaxonomyController {
	/**
	 * Show a list of all taxonomies.
	 * GET taxonomies
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */

	async index() {
		return Taxonomy.all();
	}

	/**
	 * Create/save a new taxonomy.
	 * POST roles
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async store({ request }) {
		const { taxonomy, description } = request.all();

		return Taxonomy.create({ taxonomy, description });
	}

	/**
	 * Get a single taxonomy.
	 * GET taxonomies/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */

	async show({ params }) {
		const { id } = params;
		return Taxonomy.findOrFail(id);
	}

	/**
	 * Get a taxonomy terms.
	 * GET taxonomies/:id/terms
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */

	async showTerms({ params }) {
		const { id } = params;
		const taxonomy = await Taxonomy.findOrFail(id);
		return taxonomy.terms().fetch();
	}

	/**
	 * Update taxonomy details.
	 * PUT or PATCH taxonomies/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async update({ params, request }) {
		const { id } = params;
		const upTaxonomy = await Taxonomy.findOrFail(id);
		const { taxonomy, description } = request.all();
		upTaxonomy.merge({ taxonomy, description });
		await upTaxonomy.save();
		return upTaxonomy.toJSON();
	}

	/**
	 * Delete a taxonomy with id.
	 * DELETE taxonomies/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async destroy({ params, response }) {
		const { id } = params;

		const role = await Taxonomy.findOrFail(id);
		const result = await role.delete();

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
