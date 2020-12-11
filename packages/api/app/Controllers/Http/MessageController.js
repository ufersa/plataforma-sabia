const Message = use('App/Models/Message');
const User = use('App/Models/User');
const { messageStatuses } = require('../../Utils');
const { errors, errorPayload } = require('../../Utils');

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

	async getCountNewMessages({ auth }) {
		const user = await auth.getUser();
		const totalNewMessages = await Message.query()
			.where({ user_id: user.id, status: messageStatuses.NEW })
			.count('* as total_new_messages');

		return totalNewMessages[0];
	}

	async store({ request, response }) {
		const { to, subject, content, type } = request.all();
		const user = await User.findBy('email', to);
		const newMessage = await Message.create({
			subject,
			content,
			type,
		});

		await newMessage.user().associate(user);

		return response.status(201).send({ newMessage });
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

	async destroyMany({ auth, request, response }) {
		const { ids } = request.params;
		const user = await auth.getUser();
		const result = await Message.query()
			.where({ user_id: user.id })
			.whereIn('id', ids)
			.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}
}

module.exports = MessageController;
