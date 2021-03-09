const Reviewer = use('App/Models/Reviewer');
const Revision = use('App/Models/Revision');
const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Technology = use('App/Models/Technology');

const Bull = use('Rocketseat/Bull');
const TechnologyDistributionJob = use('App/Jobs/TechnologyDistribution');
const SendMailJob = use('App/Jobs/SendMail');

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
		const mailData = {
			email: user.email,
			subject: antl('message.reviewer.technologyRevision'),
			template: 'emails.technology-revision',
			user,
			technology,
			revision,
		};
		Bull.add(SendMailJob.key, mailData, { attempts: 3 });
	}

	async sendEmailApprovedReviewer(userReviewer) {
		const mailData = {
			email: userReviewer.email,
			subject: antl('message.reviewer.approvedReviewer'),
			template: 'emails.approved-reviewer',
			userReviewer,
		};
		Bull.add(SendMailJob.key, mailData, { attempts: 3 });
	}

	async index({ request }) {
		return Reviewer.query()
			.with('user')
			.withFilters(request)
			.withParams(request);
	}

	async show({ request }) {
		return Reviewer.query()
			.with('user')
			.withParams(request);
	}

	async store({ auth }) {
		const user = await auth.getUser();

		let reviewer;
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();
			reviewer = await Reviewer.create({}, trx);
			await reviewer.user().associate(user, trx);

			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}
		await reviewer.loadMany(['user']);
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
			this.sendEmailApprovedReviewer(userReviewer);
			Bull.add(TechnologyDistributionJob.key, null);
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
		await reviewer.load('user');
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
