const Reviewer = use('App/Models/Reviewer');
const Technology = use('App/Models/Technology');
const SendMailJob = use('App/Jobs/SendMail');
const Bull = use('Rocketseat/Bull');

const { antl } = require('./localization');
const { technologyStatuses, reviewerStatuses } = require('./statuses');

const validateTechnology = async (technology) => {
	const trl = await technology.getTRL();
	return trl >= 7;
};

const sendEmailTechnologyReviewer = async (user, title) => {
	const mailData = {
		email: user.email,
		subject: antl('message.reviewer.technologyReview'),
		template: 'emails.technology-reviewer',
		user,
		title,
	};
	return Bull.add(SendMailJob.key, mailData, { attempts: 3 });
};

const distributeTechnologyToReviewer = async (technology) => {
	const isAbleToReview = await validateTechnology(technology);

	if (!isAbleToReview) {
		return;
	}

	await technology.load('knowledgeArea');
	const technologyKnowledgeArea = technology.toJSON().knowledgeArea;

	if (!technologyKnowledgeArea) {
		return;
	}

	const technologyRelatedUsers = await technology
		.users()
		.select('id')
		.fetch();

	const technologyRelatedUsersIds = technologyRelatedUsers.rows.map((user) => user.id);

	// Gets all able reviewers for technology category order by "weight"
	const ableReviewers = await Reviewer.query()
		.whereHas('user', (builder) => {
			builder.whereHas('areas', (query) => {
				switch (technologyKnowledgeArea.level) {
					case 1:
						query.where('great_area_id', technologyKnowledgeArea.knowledge_area_id);
						break;
					case 2:
						query.where('area_id', technologyKnowledgeArea.knowledge_area_id);
						break;
					case 3:
						query.where('sub_area_id', technologyKnowledgeArea.knowledge_area_id);
						break;
					case 4:
						query.where('speciality_id', technologyKnowledgeArea.knowledge_area_id);
						break;
					default:
						// eslint-disable-next-line no-console
						console.error('Error: unknown level');
						break;
				}
			});
		})
		.withCount('technologies', (builder) => {
			builder.where('status', technologyStatuses.IN_REVIEW);
		})
		.where({ status: reviewerStatuses.APPROVED })
		.whereNotIn('user_id', technologyRelatedUsersIds)
		.orderBy('technologies_count')
		.fetch();

	if (ableReviewers && ableReviewers.rows.length) {
		const ableReviewer = ableReviewers.rows[0];
		const userReviewer = await ableReviewer.user().first();
		await ableReviewer.technologies().attach([technology.id]);
		technology.status = technologyStatuses.IN_REVIEW;
		await technology.save();
		// eslint-disable-next-line consistent-return
		return sendEmailTechnologyReviewer(userReviewer, technology.title);
	}
};

const distributeTechnologiesToReviewers = async () => {
	const pendingTechnologies = await Technology.query()
		.where({ status: technologyStatuses.PENDING })
		.fetch();

	await pendingTechnologies.rows.reduce(async (promise, pendingTechnology) => {
		// This line will wait for the last async function to finish.
		// The first iteration uses an already resolved Promise
		// so, it will immediately continue.
		await promise;
		await distributeTechnologyToReviewer(pendingTechnology);
	}, Promise.resolve());
};

module.exports = {
	distributeTechnologyToReviewer,
	distributeTechnologiesToReviewers,
};
