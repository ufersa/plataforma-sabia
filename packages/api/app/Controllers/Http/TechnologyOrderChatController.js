/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Technology = use('App/Models/Technology');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const TechnologyOrderChat = use('App/Models/TechnologyOrderChat');
const TechnologyOrderChatMessages = use('App/Models/TechnologyOrderChatMessage');
const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const uuid = require('uuid');
const { chatStatusesTypes, chatMessagesTypes } = require('../../Utils');

/**
 * Resourceful controller for interacting with technology order chat
 */
class TechnologyOrderChatController {
	async index({ request, response, auth }) {
		const { order, technology: technologyId } = request.params;

		const user = await auth.getUser();

		const technologyOrder = await TechnologyOrder.query()
			.where({ id: order })
			.first();

		if (!technologyOrder) {
			return response.status(400).send({
				message: `We could not fetch any techonlogyOrder with the ids ${order} requeset`,
			});
		}

		const technology = await Technology.query()
			.where({ id: technologyId })
			.first();

		const technologyOwner = await technology.getOwner();

		const isChatAlreadyCreated = await TechnologyOrderChat.query()
			.where({ technologyOrderId: technologyOrder.id })
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [user.id])
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [technologyOwner.id])
			.first();

		if (isChatAlreadyCreated) {
			return isChatAlreadyCreated.toJSON();
		}

		const newChat = await TechnologyOrderChat.create({
			status: chatStatusesTypes.ACTIVE,
			technologyOrderId: technologyOrder.id,
			participants: JSON.stringify([user.id, technologyOwner.id]),
		});

		return newChat.toJSON();
	}

	async getMessages({ request, response, auth }) {
		const { offset = 0 } = request.only(['offset']);

		if (!uuid.validate(request.params.chatId)) {
			return response.status(400).send({ message: 'Bad requeset' });
		}

		const user = await auth.getUser();

		const AmIAllowedToSeeMessage = await TechnologyOrderChat.query()
			.where({ id: request.params.chatId })
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [user.id])
			.first();

		if (!AmIAllowedToSeeMessage) {
			throw new UnauthorizedException();
		}

		const messages = await TechnologyOrderChatMessages.query()
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

		const AmIAllowedToSeeMessage = await TechnologyOrderChat.query()
			.where({ id: request.params.chatId })
			.whereRaw('JSON_CONTAINS(participants, "?", "$")', [user.id])
			.first();

		if (!AmIAllowedToSeeMessage) {
			throw new UnauthorizedException();
		}

		const newMessage = await TechnologyOrderChatMessages.create({
			content: JSON.stringify(content),
			type: chatMessagesTypes.TEXT,
			fromUserId: user.id,
			chatId: request.params.chatId,
		});

		return newMessage;
	}
}

module.exports = TechnologyOrderChatController;
