const Config = use('Adonis/Src/Config');
const Technology = use('App/Models/Technology');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const { orderStatuses, errorPayload, errors } = require('../../Utils');
const Mail = require('../../Utils/mail');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');

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
			.with('technology', (technology) =>
				technology.select('id').with('users', (users) => users.select('id')),
			)
			.withFilters(request)
			.withParams(request, { filterById: true });
	}

	async show({ request }) {
		return TechnologyOrder.query()
			.with('technology', (technology) =>
				technology.select('id').with('users', (users) => users.select('id')),
			)
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

	/**
	 * Close TechnologyOrder.
	 * PUT orders/:id/close
	 */
	async closeOrder({ params, request, response }) {
		const data = request.only(['unit_value', 'quantity']);
		const order = await TechnologyOrder.findOrFail(params.id);
		if (order.status !== orderStatuses.OPEN) {
			return response.status(400).send(
				errorPayload(
					errors.STATUS_NO_ALLOWED_FOR_OPERATION,
					request.antl('error.operation.statusNoAllowedForOperation', {
						op: 'CLOSE ORDER',
						status: order.status,
					}),
				),
			);
		}
		order.status = orderStatuses.CLOSED;
		order.merge(data);
		await order.save();
		const buyer = await order.user().first();
		const technology = await order.technology().first();
		const unitValueFormated = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(order.unit_value);
		const { quantity } = order;
		const mailData = {
			email: buyer.email,
			subject: request.antl('message.order.technologyOrderClosed'),
			template: 'emails.technology-order-closed',
			buyer,
			technology,
			quantity,
			unitValueFormated,
		};
		Bull.add(Job.key, mailData, { attempts: 3 });
		return order.toJSON();
	}
}

module.exports = TechnologyOrderController;
