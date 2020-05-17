/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Technology = use('App/Models/Technology');
const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');

const { antl, errors, errorPayload } = require('../../Utils');

// get only useful fields
const getFields = (request) =>
	request.only([
		'title',
		'description',
		'logo',
		'site_url',
		'private',
		'category',
		'price',
		'place',
		'likes',
		'weeks',
		'region',
	]);

class TechnologyController {
	/**
	 * Show a list of all technologies.
	 * GET technologies?term_id=
	 */
	async index({ request }) {
		const query = request.get();

		if (query.term_id) {
			const term = await Term.findOrFail(query.term_id);
			return term.technologies().fetch();
		}

		return Technology.all();
	}

	/**
	 * Get a single technology.
	 * GET technologies/:id?term_id=
	 */
	async show({ params }) {
		const technology = await Technology.findOrFail(params.id);

		return technology;
	}

	/**
	 * Get technology terms.
	 * GET /technologies/:id/terms?taxonomy=
	 */
	async showTechnologyTerms({ request, response, params }) {
		const { id } = params;

		const query = request.get();

		const technology = await Technology.findOrFail(id);

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

			const terms = await technology
				.terms()
				.where('taxonomy_id', taxonomy.id)
				.fetch();
			return terms;
		}

		return technology.terms().fetch();
	}

	/**
	 * Delete a technology with id.
	 * DELETE technologies/:id
	 */
	async destroy({ params, response }) {
		const technology = await Technology.findOrFail(params.id);

		const result = await technology.delete();

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

	/**
	 * Delete a technology term.
	 * DELETE technologies/:idTechnology/terms/:idTerm
	 */
	async deleteTechnologyTerm({ params, response }) {
		const { idTechnology, idTerm } = params;

		const technology = await Technology.findOrFail(idTechnology);

		const term = await Term.findOrFail(idTerm);

		await technology.terms().detach([term.id]);

		return response.status(200).send({ success: true });
	}

	/**
	 * Create/save a new technology.
	 * POST technologies
	 */
	async store({ request }) {
		const data = getFields(request);

		try {
			return Technology.create(data);
		} catch (error) {
			return error;
		}
	}

	/**
	 * Update technology details.
	 * PUT or PATCH technologies/:id
	 * If termId is passed in body, creates a new technolgy term
	 */
	async update({ params, request }) {
		const technology = await Technology.findOrFail(params.id);

		const data = getFields(request);

		technology.merge(data);
		await technology.save();

		const { termId } = request.only('termId');

		if (termId) {
			const term = await Term.findOrFail(termId);
			await technology.terms().save(term);
			technology.terms = await technology.terms().fetch();
		}

		return technology;
	}
}

module.exports = TechnologyController;
