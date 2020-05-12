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
	async index() {
		const technologies = Technology.all();

		return technologies;
	}

	async show({ request, response, params }) {
		const query = request.get();

		const technology = await Technology.findOrFail(params.id);

		if (query.taxonomy) {
			const taxonomy = await Taxonomy.query()
				.where('taxonomy', query.taxonomy)
				.first();

			if (taxonomy) {
				const terms = await technology
					.terms()
					.where('taxonomy_id', taxonomy.id)
					.fetch();
				return terms;
			}

			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_NOT_FOUND,
						antl('error.resource.resourceNotFound'),
					),
				);
		}
		return technology;
	}

	async destroy({ params, response }) {
		const technology = await Technology.findOrFail(params.id);

		await technology.delete();
		return response.status(200).send({ success: true });
	}

	async store({ request }) {
		const data = getFields(request);

		try {
			return Technology.create(data);
		} catch (error) {
			return error;
		}
	}

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
