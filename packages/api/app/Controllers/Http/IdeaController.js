const Idea = use('App/Models/Idea');
const Term = use('App/Models/Term');

const { getTransaction } = require('../../Utils');

class IdeaController {
	async index({ request }) {
		const filters = request.all();
		return Idea.query()
			.withFilters(filters)
			.withParams(request);
	}

	async show({ request }) {
		return Idea.query().withParams(request);
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

			idea = await Idea.create(
				{
					title,
					description,
				},
				trx,
			);
			await idea.user().associate(ideaOwner, trx);
			if (keywords) {
				await this.syncronizeTerms(trx, keywords, idea);
			}
			await commit();
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
			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return idea;
	}
}

module.exports = IdeaController;
