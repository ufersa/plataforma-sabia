/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Chat = use('App/Models/Chat');
const ChatMessages = use('App/Models/ChatMessage');
const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const uuid = require('uuid');
const { chatTypes, chatStatusesTypes, chatMessagesTypes } = require('../../Utils');
const { errors, errorPayload } = require('../../Utils');

/**
 * Resourceful controller for interacting with the chats in general
 */
class ChatController {
	async show({ request, response, auth }) {
		const { target_user, object_id, object_type } = request.only([
			'target_user',
			'object_type',
			'object_id',
		]);

		if (!Object.values(chatTypes).includes(object_type)) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.NOT_ALLOWED_OBJECT_TYPE,
						request.antl('error.chat.notAllowedObjectType'),
					),
				);
		}

		const user = await auth.getUser();

		const isChatAlreadyCreated = await Chat.query()
			.where({ object_id, object_type })
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [user.id])
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [parseInt(target_user, 10)])
			.first();

		if (isChatAlreadyCreated) {
			return isChatAlreadyCreated.toJSON();
		}

		const newChat = await Chat.create({
			status: chatStatusesTypes.ACTIVE,
			object_id,
			object_type,
			participants: JSON.stringify([user.id, parseInt(target_user, 10)]),
		});

		return newChat.toJSON();
	}

	async getMessages({ request, response, auth }) {
		const { offset = 0 } = request.only(['offset']);

		if (!uuid.validate(request.params.chatId)) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.BAD_FORMATTED_ID,
						request.antl('error.chat.badFormattedId'),
					),
				);
		}

		const user = await auth.getUser();

		const AmIAllowedToSeeMessage = await Chat.query()
			.where({ id: request.params.chatId })
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [user.id])
			.first();

		if (!AmIAllowedToSeeMessage) {
			throw new UnauthorizedException();
		}

		const messages = await ChatMessages.query()
			.where({
				chatId: request.params.chatId,
			})
			.offset(offset)
			.limit(10)
			.orderBy('id', 'desc')
			.fetch();

		return messages;
	}

	async postMessage({ request, auth }) {
		const { content } = request.only(['content']);

		const user = await auth.getUser();

		const AmIAllowedToSeeMessage = await Chat.query()
			.where({ id: request.params.chatId })
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [user.id])
			.first();

		if (!AmIAllowedToSeeMessage) {
			throw new UnauthorizedException();
		}

		const newMessage = await ChatMessages.create({
			content: JSON.stringify(content),
			type: chatMessagesTypes.TEXT,
			fromUserId: user.id,
			chatId: request.params.chatId,
		});

		return newMessage;
	}
}

module.exports = ChatController;
