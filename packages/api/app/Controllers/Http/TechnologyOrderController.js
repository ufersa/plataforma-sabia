const Technology = use('App/Models/Technology');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const { orderStatuses, errorPayload, errors, getTransaction } = require('../../Utils');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');

class TechnologyOrderController {
	async showTechnologyOrders({ params, request }) {
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

	sendEmailToResearcher(researcher, technology, antl) {
		const mailData = {
			email: researcher.email,
			subject: antl('message.researcher.technologyOrder'),
			template: 'emails.technology-order',
			researcher,
			technology,
		};
		Bull.add(Job.key, mailData, { attempts: 3 });
	}

	async store({ auth, params, request }) {
		const technology = await Technology.findOrFail(params.id);
		let technologyOrder;
		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			const data = request.only(['quantity', 'use', 'funding', 'comment']);
			technologyOrder = await TechnologyOrder.create(
				{ ...data, status: orderStatuses.OPEN },
				trx,
			);

			const user = await auth.getUser();
			await Promise.all([
				technologyOrder.technology().associate(technology, trx),
				technologyOrder.user().associate(user, trx),
			]);
			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}
		const researcher = await technology.getOwner();
		this.sendEmailToResearcher(researcher, technology, request.antl);
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

	/**
	 * Cancel TechnologyOrder.
	 * PUT orders/:id/cancel
	 */
	async cancelOrder({ params, request, response, auth }) {
		const { cancellation_reason } = request.all();
		const order = await TechnologyOrder.findOrFail(params.id);
		if (order.status !== orderStatuses.OPEN) {
			return response.status(400).send(
				errorPayload(
					errors.STATUS_NO_ALLOWED_FOR_OPERATION,
					request.antl('error.operation.statusNoAllowedForOperation', {
						op: 'CANCEL ORDER',
						status: order.status,
					}),
				),
			);
		}
		order.status = orderStatuses.CANCELED;
		order.merge({ cancellation_reason });
		await order.save();
		const buyer = await order.user().first();
		const technology = await order.technology().first();
		const owner = await technology.getOwner();
		const loggedUser = await auth.getUser();
		const isCancelledByBuyer = loggedUser.id === order.user_id;
		const mailData = {
			email: isCancelledByBuyer ? owner.email : buyer.email,
			subject: request.antl('message.order.technologyOrderCancelled'),
			template: 'emails.technology-order-cancelled',
			full_name: isCancelledByBuyer ? owner.getFullName(owner) : buyer.getFullName(buyer),
			title: technology.title,
			cancelledBy: isCancelledByBuyer ? 'buyer' : 'seller',
			cancellation_reason,
		};
		Bull.add(Job.key, mailData, { attempts: 3 });
		return order.toJSON();
	}
}

module.exports = TechnologyOrderController;
