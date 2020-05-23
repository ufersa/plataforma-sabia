/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Technology = use('App/Models/Technology');
const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');
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
	 * GET technologies?term_slug=
	 */
	async index({ request }) {
		const query = request.get();

		if (query.term) {
			let term;

			try {
				term = await Term.getTerm(query.term);
			} catch (error) {
				throw new ResourceNotFoundException('term', 400, 'E_RESOURCE_NOT_FOUND');
			}

			return Technology.query()
				.whereHas('terms', (builder) => {
					builder.where('id', term.id);
				})
				.with('terms', (builder) => {
					builder.where('id', term.id);
				})
				.fetch();
		}

		return Technology.all();
	}

	/**
	 * Get a single technology.
	 * GET technologies/:id
	 */
	async show({ params }) {
		const { id } = params;
		let technology;
		try {
			technology = await Technology.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('technology', 400, 'E_RESOURCE_NOT_FOUND');
		}
		return technology;
	}

	/**
	 * Get technology terms.
	 * GET /technologies/:id/terms?taxonomy=
	 */
	async showTechnologyTerms({ request, params }) {
		const { id } = params;
		const query = request.get();
		let technology;
		try {
			technology = await Technology.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('technology', 400, 'E_RESOURCE_NOT_FOUND');
		}
		if (query.taxonomy) {
			const taxonomy = await Taxonomy.getTaxonomy(query.taxonomy);

			if (!taxonomy)
				throw new ResourceNotFoundException('taxonomy', 400, 'E_RESOURCE_NOT_FOUND');

			return Term.query()
				.whereHas('technologies', (builder) => {
					builder.where('id', technology.id);
				})
				.where('taxonomy_id', taxonomy.id)
				.fetch();
		}

		return Term.query()
			.whereHas('technologies', (builder) => {
				builder.where('id', technology.id);
			})
			.fetch();
	}

	/**
	 * Delete a technology with id.
	 * DELETE technologies/:id
	 */
	async destroy({ params, response }) {
		let technology;
		try {
			technology = await Technology.findOrFail(params.id);
		} catch (error) {
			throw new ResourceNotFoundException('technology', 400, 'E_RESOURCE_NOT_FOUND');
		}

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
	 * DELETE technologies/:idTechnology/terms/:term
	 */
	async deleteTechnologyTerm({ params, response }) {
		const { idTechnology, term } = params;
		let technology;
		try {
			technology = await Technology.findOrFail(idTechnology);
		} catch (error) {
			throw new ResourceNotFoundException('technology', 400, 'E_RESOURCE_NOT_FOUND');
		}
		let termObj;
		try {
			termObj = await Term.getTerm(term);
		} catch (error) {
			throw new ResourceNotFoundException('term', 400, 'E_RESOURCE_NOT_FOUND');
		}

		await technology.terms().detach([termObj.id]);

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
	 * If termId or termSlug is passed in body, creates a new technolgy term
	 */
	async update({ params, request }) {
		let technology;
		try {
			technology = await Technology.findOrFail(params.id);
		} catch (error) {
			throw new ResourceNotFoundException('technology', 400, 'E_RESOURCE_NOT_FOUND');
		}

		const data = getFields(request);

		technology.merge(data);
		await technology.save();

		const { term } = request.only(['term']);

		if (term) {
			let termObj;

			try {
				termObj = await Term.getTerm(term);
			} catch (error) {
				throw new ResourceNotFoundException('term', 400, 'E_RESOURCE_NOT_FOUND');
			}

			await technology.terms().save(termObj);
			technology.terms = await technology.terms().fetch();
		}

		return technology;
	}
}

module.exports = TechnologyController;
