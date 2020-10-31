const Reviewer = use('App/Models/Reviewer');
const Revision = use('App/Models/Revision');
const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Term = use('App/Models/Term');
const Technology = use('App/Models/Technology');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/TechnologyDistribution');
const Mail = use('Mail');
const Config = use('Adonis/Src/Config');

const {
	getTransaction,
	roles,
	errorPayload,
	errors,
	antl,
	technologyStatuses,
	reviewerStatuses,
} = require('../../Utils');

class ReviewerController {
	async sendEmailTechnologyRevision(technology, revision) {
		const user = await technology.getOwner();
		const { from } = Config.get('mail');
		try {
			if (process.env.APP_ENV !== 'testing') {
				await Mail.send(
					'emails.technology-revision',
					{ user, technology, revision },
					(message) => {
						message.subject(antl('message.reviewer.technologyRevision'));
						message.from(from);
						message.to(user.email);
					},
				);
			}
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error(exception);
		}
	}

	async sendEmailApprovedReviewer(userReviewer) {
		const { from } = Config.get('mail');
		try {
			if (process.env.APP_ENV !== 'testing') {
				await Mail.send('emails.approved-reviewer', { userReviewer }, (message) => {
					message.subject(antl('message.reviewer.approvedReviewer'));
					message.from(from);
					message.to(userReviewer.email);
				});
			}
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error(exception);
		}
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

	async index({ request }) {
		return Reviewer.query()
			.with('categories')
			.withFilters(request)
			.withParams(request);
	}

	async show({ request }) {
		return Reviewer.query()
			.with('categories')
			.withParams(request);
	}

	async store({ auth, request }) {
		const { categories } = request.all();
		const user = await auth.getUser();

		let reviewer;
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();
			reviewer = await Reviewer.create({}, trx);
			await reviewer.user().associate(user, trx);
			await this.syncronizeCategories(trx, categories, reviewer);

			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}
		await reviewer.loadMany(['user', 'categories']);
		return reviewer;
	}

	async update({ auth, request }) {
		const { categories } = request.all();
		const user = await auth.getUser();

		let reviewer;
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();
			reviewer = await Reviewer.getReviewer(user);
			if (categories) {
				await this.syncronizeCategories(trx, categories, reviewer, true);
			}
			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}
		await reviewer.loadMany(['user', 'categories']);
		Bull.add(Job.key, null);
		return reviewer;
	}

	async updateReviewerStatus({ params, request }) {
		const reviewer = await Reviewer.findOrFail(params.id);
		const { status } = request.only(['status']);
		reviewer.merge({ status });
		await reviewer.save();
		if (status === reviewerStatuses.APPROVED) {
			const userReviewer = await User.findOrFail(reviewer.user_id);
			const reviewerRole = await Role.getRole(roles.REVIEWER);
			await userReviewer.role().dissociate();
			await userReviewer.role().associate(reviewerRole);
			await this.sendEmailApprovedReviewer(userReviewer);
			Bull.add(Job.key, null);
		}

		return reviewer;
	}

	async makeRevision({ auth, request, response }) {
		const { technology } = request.params;
		const technologyInst = await Technology.getTechnology(technology);
		if (
			![
				technologyStatuses.IN_REVIEW,
				technologyStatuses.REQUESTED_CHANGES,
				technologyStatuses.CHANGES_MADE,
			].includes(technologyInst.status)
		) {
			return response.status(400).send(
				errorPayload(
					errors.STATUS_NO_ALLOWED_FOR_REVIEW,
					request.antl('error.reviewer.statusNoAllowedForReview', {
						status: technologyInst.status,
					}),
				),
			);
		}

		const user = await auth.getUser();
		const reviewer = await Reviewer.getReviewer(user);
		const data = request.only(['description', 'assessment']);

		let trx;
		let revision;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			revision = await reviewer.revisions().create(
				{
					description: data.description ? data.description : null,
					assessment: data.assessment,
				},
				trx,
			);
			await revision.technology().associate(technologyInst, trx);
			await revision.reviewer().associate(reviewer, trx);
			technologyInst.status = revision.assessment;
			await technologyInst.save(trx);
			await revision.loadMany(['technology', 'reviewer.user']);
			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}
		await this.sendEmailTechnologyRevision(technologyInst, revision);
		return revision;
	}

	async getReviewerTechnologies({ auth, request }) {
		const user = await auth.getUser();
		const reviewer = await Reviewer.getReviewer(user);
		return Technology.query()
			.whereHas('reviewers', (builder) => {
				builder.where('id', reviewer.id);
			})
			.withFilters(request)
			.withParams(request);
	}

	async getReviewer({ auth }) {
		const user = await auth.getUser();
		const reviewer = await Reviewer.getReviewer(user);
		await reviewer.loadMany(['user', 'categories']);
		return reviewer;
	}

	async getRevisions({ auth, request }) {
		const user = await auth.getUser();
		const technologyInst = await Technology.getTechnology(request.params.technology);
		const reviewer = await Reviewer.getReviewer(user);

		return Revision.query()
			.getTechnology(technologyInst.id)
			.getReviewer(reviewer.id)
			.withFilters(request)
			.withParams(request);
	}
}

module.exports = ReviewerController;
