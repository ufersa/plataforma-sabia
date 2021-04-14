const Idea = use('App/Models/Idea');
const Term = use('App/Models/Term');
const { getTransaction, errorPayload, errors, Algolia } = require('../../Utils');

const algoliaIndexName = 'idea';

async function algoliaPopulatedQuery(id) {
	return Idea.query()
		.populateToAlgolia(id)
		.first();
}

class IdeaController {
	async index({ request }) {
		const filters = request.all();
		return Idea.query()
			.with('keywords')
			.withFilters(filters)
			.withParams(request);
	}

	async show({ request }) {
		return Idea.query()
			.with('keywords')
			.withParams(request);
	}

	async syncronizeTerms(trx, keywords, idea, detach = false) {
		const keywordInstances = await Promise.all(
			keywords.map((keyword) => Term.getTerm(keyword)),
		);
		if (detach) {
			await idea.terms().detach(null, null, trx);
		}

		await idea.terms().attach(
			keywordInstances.map((keyword) => keyword.id),
			null,
			trx,
		);
	}

	async store({ auth, request }) {
		const { title, description, keywords } = request.all();
		const ideaOwner = await auth.getUser();
		let idea;
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			idea = await Idea.create({ title, description }, trx);
			await idea.user().associate(ideaOwner, trx);
			if (keywords) {
				await this.syncronizeTerms(trx, keywords, idea);
			}
			await idea.load('terms');

			await commit();
			await Algolia.handleObject.save(algoliaIndexName, await algoliaPopulatedQuery(idea.id));
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return idea;
	}

	async update({ params, request }) {
		const data = request.only(['title', 'description']);
		const idea = await Idea.findOrFail(params.id);
		idea.merge(data);
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await idea.save(trx);

			const { keywords } = request.only(['keywords']);
			if (keywords) {
				await this.syncronizeTerms(trx, keywords, idea, true);
			}
			await idea.load('terms');

			await commit();
			await Algolia.handleObject.save(algoliaIndexName, await algoliaPopulatedQuery(idea.id));
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return idea;
	}

	async destroy({ params, request, response }) {
		const idea = await Idea.findOrFail(params.id);
		// detaches related entities
		await idea.terms().detach();
		const result = await idea.delete();

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

		await Algolia.handleObject.remove(algoliaIndexName, idea.toJSON().objectID);
		return response.status(200).send({ success: true });
	}
}

module.exports = IdeaController;
