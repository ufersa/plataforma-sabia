/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');

const { antl, errors, errorPayload } = require('../../Utils');

class TermController {
	/**
	 * Show a list of all terms with taxonomy.
	 * GET terms
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */

	async index() {
		/* const terms = await Taxonomy.query()
			.with('terms')
			.fetch();

        return terms; */

		const terms = await Term.query()
			.with('taxonomy')
			.fetch();

		return terms;
	}

	/**
	 * Create/save a new term.
	 * POST terms
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async store({ request }) {
		const { term, taxonomyId } = request.all();

		const taxonomy = await Taxonomy.findOrFail(taxonomyId);

		const newTerm = await taxonomy.terms().create({
			term,
		});

		await newTerm.load('taxonomy');

		return newTerm;
	}

	/**
	 * Get a single term.
	 * GET terms/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */

	async show({ params }) {
		const { id } = params;
		const term = await Term.findOrFail(id);
		await term.load('taxonomy');
		return term;
	}

	/**
	 * Update term details.
	 * PUT or PATCH terms/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async update({ params, request }) {
		const { id } = params;
		const upTerm = await Term.findOrFail(id);
		const { term, taxonomyId } = request.all();
		if (taxonomyId && taxonomyId !== upTerm.taxonomy_id) {
			const taxonomy = await Taxonomy.findOrFail(taxonomyId);
			await upTerm.taxonomy().dissociate();
			await taxonomy.terms().save(upTerm);
		}
		upTerm.merge({ term });
		await upTerm.save();
		return upTerm.toJSON();
	}

	/**
	 * Delete a term with id.
	 * DELETE terms/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async destroy({ params, response }) {
		const { id } = params;

		const term = await Term.findOrFail(id);
		const result = await term.delete();

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

module.exports = TermController;
