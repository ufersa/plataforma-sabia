const { orderStatuses, errorPayload, errors } = require('../../Utils');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');

const TechnologyOrder = use('App/Models/TechnologyOrder');
class TechnologyOrderController {
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
		const { cancellation_reason } = request.only(['cancellation_reason']);
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
		const cancelledBy = loggedUser.id === order.user_id ? 'buyer' : 'seller';
		const mailData = {
			email: cancelledBy === 'buyer' ? owner.email : buyer.email,
			subject: request.antl('message.order.technologyOrderCancelled'),
			template: 'emails.technology-order-cancelled',
			full_name:
				cancelledBy === 'buyer' ? owner.getFullName(owner) : buyer.getFullName(buyer),
			title: technology.title,
			cancelledBy,
			cancellation_reason,
		};
		Bull.add(Job.key, mailData, { attempts: 3 });
		return order.toJSON();
	}
}

module.exports = TechnologyOrderController;
