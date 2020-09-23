const Reviewer = use('App/Models/Reviewer');
const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Term = use('App/Models/Term');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/TechnologyDistribution');

const { getTransaction, roles } = require('../../Utils');

class ReviewerController {
	async syncronizeCategories(trx, categories, reviewer, detach = false) {
		if (detach) {
			await reviewer.categories().detach(null, null, trx);
		}
		const categoryInstances = await Promise.all(
			categories.map((category) => Term.getTerm(category)),
		);
		await reviewer.categories().attach(
			categoryInstances.map((category) => category.id),
			null,
			trx,
		);
	}

	async index({ request }) {
		return Reviewer.query()
			.withParams(request.params)
			.fetch();
	}

	async show({ request }) {
		return Reviewer.query()
			.withParams(request.params)
			.firstOrFail();
	}

	async store({ request }) {
		const { user_id, categories } = request.only(['user_id', 'categories']);
		const user = await User.findOrFail(user_id);
		const reviewer = await Reviewer.create();
		reviewer.user().associate(user);
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await this.syncronizeCategories(trx, categories, reviewer);

			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}
		await reviewer.loadMany(['user', 'categories']);
		return reviewer;
	}

	async updateReviewerStatus({ params, request }) {
		const reviewer = await Reviewer.findOrFail(params.id);
		const { status } = request.only(['status']);
		reviewer.merge({ status });
		await reviewer.save();
		if (status === 'approved') {
			const userReviewer = await User.findOrFail(reviewer.user_id);
			const reviewerROle = await Role.getRole(roles.REVIEWER);
			await userReviewer.role().dissociate();
			await userReviewer.role().associate(reviewerROle);
			Bull.add(Job.key, null);
		}

		return reviewer;
	}
}

module.exports = ReviewerController;
