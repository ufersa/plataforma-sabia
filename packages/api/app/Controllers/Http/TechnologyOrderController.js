const Config = use('Adonis/Src/Config');
const Technology = use('App/Models/Technology');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const { orderStatuses } = require('../../Utils');
const Mail = require('../../Utils/mail');

class TechnologyOrderController {
	async technologyOrder({ params, request }) {
		const technology = await Technology.findOrFail(params.id);
		return TechnologyOrder.query()
			.where('technology_id', technology.id)
			.withFilters(request)
			.withParams(request, { filterById: false });
	}

	async index({ request }) {
		return TechnologyOrder.query()
			.withFilters(request)
			.withParams(request, { filterById: true });
	}

	async show({ request }) {
		return TechnologyOrder.query()
			.withFilters(request)
			.withParams(request);
	}

	async updateStatus({ params, request }) {
		const order = await TechnologyOrder.findOrFail(params.id);
		const data = request.only(['status']);
		order.merge(data);
		await order.save();
		return order;
	}

	async sendEmailToResearcher(technology, antl) {
		const researcher = await technology.getOwner();
		const { from } = Config.get('mail');
		try {
			await Mail.send('emails.technology-order', { researcher, technology }, (message) => {
				message.subject(antl('message.researcher.technologyOrder'));
				message.from(from);
				message.to(researcher.email);
			});
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error(exception);
		}
	}

	async store({ auth, params, request }) {
		const technology = await Technology.findOrFail(params.id);
		const data = request.only(['quantity', 'use', 'funding', 'comment']);
		data.status = orderStatuses.OPEN;
		const user = await auth.getUser();
		const technologyOrder = await TechnologyOrder.create(data);
		await Promise.all([
			technologyOrder.technology().associate(technology),
			technologyOrder.user().associate(user),
		]);
		await this.sendEmailToResearcher(technology, request.antl);
		return technologyOrder;
	}
}

module.exports = TechnologyOrderController;
