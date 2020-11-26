const Technology = use('App/Models/Technology');
const TechnologyQuestion = use('App/Models/TechnologyQuestion');
const User = use('App/Models/User');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');

const { questionStatuses, roles } = require('../../Utils');

class TechnologyQuestionController {
	async index({ request, auth }) {
		const technologyQuestion = TechnologyQuestion.query();
		const user = await auth.getUser();
		const userRole = await user.getRole();
		if (userRole !== roles.ADMIN) {
			const technologies = await Technology.query()
				.whereHas('users', (builder) => {
					builder.where({ id: user.id, role: 'OWNER' });
				})
				.fetch();
			const technologiesIds = technologies.rows.map((technology) => technology.id);
			technologyQuestion.whereIn('technology_id', technologiesIds);
		}
		return technologyQuestion.withFilters(request).withParams(request);
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

	async answer({ params, request }) {
		const technologyQuestion = await TechnologyQuestion.findOrFail(params.id);
		const { answer } = request.all();
		technologyQuestion.merge({ answer, status: questionStatuses.ANSWERED });
		await technologyQuestion.save();
		const user = await User.findOrFail(technologyQuestion.user_id);
		const technology = await Technology.findOrFail(technologyQuestion.technology_id);
		const mailData = {
			email: user.email,
			subject: request.antl('message.question.technologyQuestionAnswered'),
			template: 'emails.technology-question-answered',
			user,
			technology,
			technologyQuestion,
		};
		Bull.add(Job.key, mailData, { attempts: 3 });
		return technologyQuestion;
	}
}

module.exports = TechnologyQuestionController;
