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

	async show({ request }) {
		return TechnologyQuestion.query()
			.whereNot({ status: questionStatuses.DISABLED })
			.withFilters(request)
			.withParams(request);
	}

	async getCountUnansweredQuestions({ auth }) {
		const user = await auth.getUser();

		const technologies = await Technology.query()
			.whereHas('users', (builder) => {
				builder.where({ id: user.id, role: 'OWNER' });
			})
			.fetch();
		const technologiesIds = technologies.rows.map((technology) => technology.id);

		const totalUnanswered = await TechnologyQuestion.query()
			.whereIn('technology_id', technologiesIds)
			.where({ status: questionStatuses.UNANSWERED })
			.count('* as total_unanswered');

		return totalUnanswered[0];
	}

	async store({ auth, request }) {
		const { question, technology } = request.all();
		const technologyInst = await Technology.getTechnology(technology);

		const user = await auth.getUser();
		const technologyQuestion = await TechnologyQuestion.create({
			question,
			status: questionStatuses.UNANSWERED,
		});
		await Promise.all([
			technologyQuestion.technology().associate(technologyInst),
			technologyQuestion.user().associate(user),
		]);
		const owner = await technologyInst.getOwner();
		const mailData = {
			email: owner.email,
			subject: request.antl('message.question.newTechnologyQuestion'),
			template: 'emails.technology-question',
			owner,
			technologyInst,
			question,
		};
		Bull.add(Job.key, mailData, { attempts: 3 });
		return technologyQuestion;
	}

	async update({ params, request }) {
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

	async destroy({ params }) {
		const technologyQuestion = await TechnologyQuestion.findOrFail(params.id);
		technologyQuestion.merge({ status: questionStatuses.DISABLED });
		await technologyQuestion.save();
		return technologyQuestion;
	}
}

module.exports = TechnologyQuestionController;
