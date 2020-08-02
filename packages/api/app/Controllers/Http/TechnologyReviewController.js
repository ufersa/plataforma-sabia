const Technology = use('App/Models/Technology');
const TechnologyReview = use('App/Models/TechnologyReview');

const { errors, errorPayload, getTransaction } = require('../../Utils');

class TechnologyReviewController {
	/**
	 * Show a list of all technology reviews.
	 * GET reviews
	 */
	async index({ request }) {
		return TechnologyReview.query()
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Create/save a new technology review.
	 * POST reviews
	 * */
	async store({ request, auth }) {
		const data = request.only(['content', 'rating', 'positive', 'negative', 'technologyId']);

		const review = {
			content: data.content,
			rating: data.rating,
			positive: JSON.stringify(data.positive),
			negative: JSON.stringify(data.negative),
		};

		const [technology, user] = await Promise.all([
			Technology.findOrFail(data.technologyId),
			auth.getUser(),
		]);

		let technologyReview;
		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			technologyReview = await TechnologyReview.create(review, trx);
			await Promise.all([
				technologyReview.technology().associate(technology, trx),
				technologyReview.user().associate(user, trx),
			]);

			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return technologyReview.toJSON();
	}

	/**
	 * Display a single technology review.
	 * GET reviews/:id
	 */
	async show({ request }) {
		return TechnologyReview.query()
			.withParams(request.params)
			.firstOrFail();
	}

	/**
	 * Update technology review details.
	 * PUT or PATCH reviews/:id
	 */
	async update({ params, request }) {
		const data = request.only(['content', 'rating', 'positive', 'negative']);
		const review = {
			content: data.content,
			rating: data.rating,
			positive: JSON.stringify(data.positive),
			negative: JSON.stringify(data.negative),
		};
		const updatedTechnologyReview = await TechnologyReview.findOrFail(params.id);
		updatedTechnologyReview.merge(review);
		await updatedTechnologyReview.save();
		return updatedTechnologyReview.toJSON();
	}

	/**
	 * Delete a technology review with id
	 * DELETE reviews/:id
	 * */
	async destroy({ params, request, response }) {
		const technologyReview = await TechnologyReview.findOrFail(params.id);

		const result = await technologyReview.delete();
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

		return response.status(200).send({ success: true });
	}
}

module.exports = TechnologyReviewController;
