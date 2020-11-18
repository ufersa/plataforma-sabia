const { orderStatuses } = require('../../Utils');

const TechnologyOrder = use('App/Models/TechnologyOrder');
class TechnologyOrderController {
	/**
	 * Close TechnologyOrder.
	 * PUT orders/:id/close
	 */
	async closeOrder({ params, request }) {
		const data = request.only(['unit_value', 'quantity']);
		const order = await TechnologyOrder.findOrFail(params.id);
		order.status = orderStatuses.CLOSED;
		order.merge(data);
		await order.save();
		return order.toJSON();
	}
}

module.exports = TechnologyOrderController;
