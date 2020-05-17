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
	async index({ request, response }) {
		const query = request.get();

		if (query.taxonomy) {
			const taxonomy = await Taxonomy.getTaxonomy(query.taxonomy);
			if (!taxonomy) {
				return response
					.status(400)
					.send(
						errorPayload(
							errors.RESOURCE_NOT_FOUND,
							antl('error.resource.resourceNotFound'),
						),
					);
			}
			return taxonomy
				.terms()
				.with('taxonomy')
				.fetch();
		}

		const terms = await Term.query()
			.with('taxonomy')
			.fetch();

		return terms;
	}

	/**
	 * Create/save a new term.
	 * POST terms
	 */
	async store({ request, response }) {
		const { term, slug, taxonomyId, taxonomySlug } = request.all();

		let taxonomy = null;

		if (taxonomyId) {
			taxonomy = await Taxonomy.findOrFail(taxonomyId);
		} else if (taxonomySlug) {
			taxonomy = await Taxonomy.getTaxonomy(taxonomySlug);
			if (!taxonomy) {
				return response
					.status(400)
					.send(
						errorPayload(
							errors.RESOURCE_NOT_FOUND,
							antl('error.resource.resourceNotFound'),
						),
					);
			}
		}

		const newTerm = await taxonomy.terms().create({
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
		const { id } = params;
		const term = await Term.findOrFail(id);
		await term.load('taxonomy');
		return term;
	}

	/**
	 * Update term details.
	 * PUT or PATCH terms/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upTerm = await Term.findOrFail(id);
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
