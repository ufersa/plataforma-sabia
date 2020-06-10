/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');

const { antl, errors, errorPayload } = require('../../Utils');

class TermController {
	/**
	 * Show a list of all terms with taxonomy.
	 * GET terms?taxonomy=
	 */
	async index({ request }) {
		const query = request.get();
		if (query.taxonomy) {
			const taxonomy = await Taxonomy.getTaxonomy(query.taxonomy);
			return taxonomy
				.terms()
				.with('taxonomy')
				.withParams(request.params)
				.fetch();
		}
		return Term.query()
			.with('taxonomy')
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Create/save a new term.
	 * POST terms
	 */
	async store({ request }) {
		const { term, slug, taxonomy } = request.all();
		let taxonomyObj = null;
		if (taxonomy) {
			taxonomyObj = await Taxonomy.getTaxonomy(taxonomy);
		}
		const newTerm = await taxonomyObj.terms().create({
			term,
			slug,
		});
		await newTerm.load('taxonomy');
		return newTerm;
	}

	/**
	 * Get a single term.
	 * GET terms/:id
	 */
	async show({ params }) {
		return Term.query()
			.withEmbed(params)
			.fetch();
	}

	/**
	 * Update term details.
	 * PUT or PATCH terms/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upTerm = await Term.getTerm(id);
		const { term, slug, taxonomyId } = request.all();
		if (taxonomyId && taxonomyId !== upTerm.taxonomy_id) {
			const taxonomy = await Taxonomy.findOrFail(taxonomyId);
			await upTerm.taxonomy().dissociate();
			await taxonomy.terms().save(upTerm);
		}
		upTerm.merge({ term, slug });
		await upTerm.save();
		return upTerm.toJSON();
	}

	/**
	 * Delete a term with id.
	 * DELETE terms/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		const term = await Term.getTerm(id);
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
