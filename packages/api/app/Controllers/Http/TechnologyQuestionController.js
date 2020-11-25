const Technology = use('App/Models/Technology');
const TechnologyQuestion = use('App/Models/TechnologyQuestion');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');

const { questionStatuses } = require('../../Utils');

class TechnologyQuestionController {
	async index({ request, auth }) {
		const user = await auth.getUser();
		return TechnologyQuestion.query()
			.where({ user_id: user.id })
			.withFilters(request)
			.withParams(request);
	}

	async showTechnologyQuestions({ params, request }) {
		return TechnologyQuestion.query()
			.where({ technology_id: params.id })
			.whereNot({ status: questionStatuses.DISABLED })
			.withParams(request, { filterById: false });
	}

	async store({ auth, params, request }) {
		const technology = await Technology.findOrFail(params.id);
		const { question } = request.all();
		const user = await auth.getUser();
		const technologyQuestion = await TechnologyQuestion.create({
			question,
			status: questionStatuses.UNANSWERED,
		});
		await Promise.all([
			technologyQuestion.technology().associate(technology),
			technologyQuestion.user().associate(user),
		]);
		const owner = await technology.getOwner();
		const mailData = {
			email: owner.email,
			subject: request.antl('message.question.newTechnologyQuestion'),
			template: 'emails.technology-question',
			owner,
			technology,
			question,
		};
		Bull.add(Job.key, mailData, { attempts: 3 });
		return technologyQuestion;
	}
}

module.exports = TechnologyQuestionController;
