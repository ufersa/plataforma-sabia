const Taxonomy = use('App/Models/Taxonomy');
const Term = use('App/Models/Term');
const Reviewer = use('App/Models/Reviewer');
const Technology = use('App/Models/Technology');
const Mail = use('Mail');
const Config = use('Adonis/Src/Config');
const { antl } = require('./localization');

const sendEmailTechnologyReviewer = async (user, title) => {
	const { from } = Config.get('mail');
	try {
		await Mail.send('emails.technology-reviewer', { user, title }, (message) => {
			message.subject(antl('message.reviewer.technologyReview'));
			message.from(from);
			message.to(user.email);
		});
	} catch (exception) {
		// eslint-disable-next-line no-console
		console.error(exception);
	}
};

const distributeTechnologyToReviewer = async (technology) => {
	const taxonomy = await Taxonomy.getTaxonomy('CATEGORY');
	// Gets technlogy categories
	const technologyCategories = await Term.query()
		.whereHas('technologies', (builder) => {
			builder.where('id', technology.id);
		})
		.where('taxonomy_id', taxonomy.id)
		.fetch();

	const technologyCategoriesIds = technologyCategories.rows.map(
		(technologyCategory) => technologyCategory.id,
	);
	// Gets all able reviewers for technology category order by "weight"
	const ableReviewers = await Reviewer.query()
		.whereHas('categories', (builder) => {
			builder.whereIn('term_id', technologyCategoriesIds);
		})
		.withCount('technologies', (builder) => {
			builder.where('status', 'in_review');
		})
		.where({ status: 'approved' })
		.orderBy('technologies_count', 'asc')
		.fetch();

	if (ableReviewers && ableReviewers.rows.length) {
		const ableReviewer = ableReviewers.rows[0];
		const userReviewer = await ableReviewer.user().first();
		await sendEmailTechnologyReviewer(userReviewer, technology.title);
		await ableReviewer.technologies().attach([technology.id]);
		technology.status = 'in_review';
		await technology.save();
	}
};

const distributeTechnologiesToReviewers = async () => {
	const pendingTechnologies = await Technology.query()
		.where({ status: 'pending' })
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
