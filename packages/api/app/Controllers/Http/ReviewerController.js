const Reviewer = use('App/Models/Reviewer');
const User = use('App/Models/User');
const Term = use('App/Models/Term');

const { getTransaction } = require('../../Utils');

class ReviewerController {
	async store({ request }) {
		const { user_id } = request.only(['user_id']);
		const user = await User.findOrFail(user_id);
		const reviewer = await Reviewer.create();
		reviewer.user().associate(user);
		return reviewer;
	}

	async associateReviewerCategory({ params, request }) {
		const { id } = params;
		const reviewer = await Reviewer.findOrFail(id);
		const { categories } = request.only(['categories']);
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
		return reviewer.categories().fetch();
	}

	async showReviewerCategories({ params }) {
		const { id } = params;
		const reviewer = await Reviewer.findOrFail(id);
		return reviewer.categories().fetch();
	}

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
}

module.exports = ReviewerController;
