const Technology = use('App/Models/Technology');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const ServiceOrder = use('App/Models/ServiceOrder');
const Permission = use('App/Models/Permission');
const { orderStatuses, errorPayload, errors, getTransaction, permissions } = require('../../Utils');

const {
	LIST_TECHNOLOGIES_ORDERS: { permission: listTechnologiesOrdersPermission },
	LIST_SERVICES_ORDERS: { permission: listServicesOrdersPermission },
} = permissions;

const Bull = use('Rocketseat/Bull');
const SendMailJob = use('App/Jobs/SendMail');

class OrderController {
	async showTechnologyOrders({ params, request, auth }) {
		const technologyInst = await Technology.findOrFail(params.id);
		const loggedUser = await auth.getUser();
		const technologyOrderQuery = TechnologyOrder.query()
			.where('technology_id', technologyInst.id)
			.with('technology', (technology) =>
				technology.select('id').with('users', (users) => users.select('id')),
			)
			.with('technology.users')
			.with('technology.thumbnail');

		const canListTechnologiesOrders = await Permission.checkPermission(
			loggedUser,
			[listTechnologiesOrdersPermission],
			{ id: 0 },
		);

		if (!canListTechnologiesOrders) {
			technologyOrderQuery.whereHas('technology', (builder) => {
				builder.whereHas('users', (userQuery) => {
					userQuery.where('id', loggedUser.id);
					userQuery.where('role', 'OWNER');
				});
			});
		}

		return technologyOrderQuery.withFilters(request).withParams(request, { filterById: false });
	}

	/** Lists orders in buyer and seller view */
	/** If fromCurrentUser == true => buyer view, otherwise seller */
	async index({ request, auth }) {
		const { fromCurrentUser = false } = request.all();

		const technologyOrderQuery = TechnologyOrder.query()
			.with('technology', (technology) =>
				technology.select('id').with('users', (users) => users.select('id')),
			)
			.with('technology.users')
			.with('technology.thumbnail');

		const serviceOrderQuery = ServiceOrder.query()
			.with('user')
			.with('service.user');

		const loggedUser = await auth.getUser();
		if (fromCurrentUser === 'true' || fromCurrentUser === '') {
			technologyOrderQuery.where({ user_id: loggedUser.id });
			serviceOrderQuery.where({ user_id: loggedUser.id });
		} else {
			// Verify if user has permission to view all technology orders
			const canListTechnologiesOrders = await Permission.checkPermission(
				loggedUser,
				[listTechnologiesOrdersPermission],
				{ id: 0 },
			);

			if (!canListTechnologiesOrders) {
				technologyOrderQuery.whereHas('technology', (builder) => {
					builder.whereHas('users', (userQuery) => {
						userQuery.where('id', loggedUser.id);
						userQuery.where('role', 'OWNER');
					});
				});
			}

			// Verify if user has permission to view all service orders
			const canListServicesOrders = await Permission.checkPermission(
				loggedUser,
				[listServicesOrdersPermission],
				{ id: 0 },
			);

			if (!canListServicesOrders) {
				serviceOrderQuery.whereHas('service', (builder) => {
					builder.where({ user_id: loggedUser.id });
				});
			}
		}

		const technologyOrders = await technologyOrderQuery
			.withFilters(request)
			.withParams(request, { filterById: true });
		const serviceOrders = await serviceOrderQuery.withParams(request);

		return [...technologyOrders.toJSON(), ...serviceOrders.toJSON()];
	}

	async show({ request, auth, params }) {
		const loggedUser = await auth.getUser();
		const technologyOrderQuery = TechnologyOrder.query()
			.where({ id: params.id })
			.with('technology', (technology) =>
				technology.select('id').with('users', (users) => users.select('id')),
			)
			.with('technology.users')
			.with('technology.thumbnail');

		const canListTechnologiesOrders = await Permission.checkPermission(
			loggedUser,
			[listTechnologiesOrdersPermission],
			{ id: 0 },
		);

		if (!canListTechnologiesOrders) {
			technologyOrderQuery
				.where({ user_id: loggedUser.id })
				.orWhereHas('technology', (builder) => {
					builder.whereHas('users', (userQuery) => {
						userQuery.where('id', loggedUser.id);
						userQuery.where('role', 'OWNER');
					});
				});
		}

		return technologyOrderQuery.withFilters(request).withParams(request);
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
		Bull.add(SendMailJob.key, mailData, { attempts: 3 });
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
		Bull.add(SendMailJob.key, mailData, { attempts: 3 });
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
		Bull.add(SendMailJob.key, mailData, { attempts: 3 });
		return order.toJSON();
	}
}

module.exports = OrderController;
