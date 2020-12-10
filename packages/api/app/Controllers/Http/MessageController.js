const Message = use('App/Models/Message');
const { messageStatuses } = require('../../Utils');

class MessageController {
	async index({ auth, request }) {
		const filters = request.all();
		const user = await auth.getUser();
		return Message.query()
			.where({ user_id: user.id })
			.withFilters(filters)
			.withParams(request);
	}

	async show({ auth, request }) {
		const user = await auth.getUser();
		const message = await Message.query()
			.where({ user_id: user.id })
			.withParams(request);
		message.status = messageStatuses.READ;
		await message.save();
		return message;
	}

	async markAsRead({ auth, request }) {
		const { messages } = request.all();
		const user = await auth.getUser();
		const messagesMarkedAsRead = await Message.query()
			.where({ user_id: user.id })
			.update({ status: messageStatuses.READ })
			.whereIn('id', messages);
		return messagesMarkedAsRead;
	}

	async markAsNew({ auth, request }) {
		const { messages } = request.all();
		const user = await auth.getUser();
		const messagesMarkedAsRead = await Message.query()
			.where({ user_id: user.id })
			.update({ status: messageStatuses.NEW })
			.whereIn('id', messages);
		return messagesMarkedAsRead;
	}
}

module.exports = MessageController;
