const { orderStatuses, errorPayload, errors } = require('../../Utils');

const Config = use('Adonis/Src/Config');
const Mail = require('../../Utils/mail');

const TechnologyOrder = use('App/Models/TechnologyOrder');
class TechnologyOrderController {
	async sendEmailToBuyer(order, antl) {
		const buyer = await order.user().first();
		const technology = await order.technology().first();
		const { from } = Config.get('mail');
		const unitValueFormated = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(order.unit_value);
		const { quantity } = order;
		try {
			await Mail.send(
				'emails.technology-order-closed',
				{ buyer, technology, quantity, unitValueFormated },
				(message) => {
					message.subject(antl('message.order.technologyOrderClosed'));
					message.from(from);
					message.to(buyer.email);
				},
			);
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error(exception);
		}
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
		await this.sendEmailToBuyer(order, request.antl);
		return order.toJSON();
	}
}

module.exports = TechnologyOrderController;
