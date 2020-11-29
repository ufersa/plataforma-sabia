/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Technology = use('App/Models/Technology');
const TechnologyOrderChat = use('App/Models/TechnologyOrderChat');
const TechnologyOrderChatMessages = use('App/Models/TechnologyOrderChatMessage');
const Database = use('Database');
const uuid = require('uuid');

/**
 * Resourceful controller for interacting with technology order chat
 */
class TechnologyOrderChatController {
	async index({ request, auth }) {
		await auth.check();
		const user = await auth.getUser();
		const technologyOrder = await Technology.query()
			.where({
				id: request.params.order,
			})
			.first();

		const technology = await Technology.query()
			.where({
				id: request.params.technology,
			})
			.first();

		const technologyOwner = await technology.getOwner();

		const IsChatAlreadyCreated = await Database.raw(
			`select * from technology_order_chats where technologyOrderId = ? and JSON_CONTAINS(participants, '?', '$') and JSON_CONTAINS(participants, '?', '$')`,
			[technologyOrder.id, user.id, technologyOwner.id],
		);

		if (IsChatAlreadyCreated && IsChatAlreadyCreated[0] && IsChatAlreadyCreated[0].length) {
			const chat = IsChatAlreadyCreated[0][0];
			const lastMessages = await TechnologyOrderChatMessages.query()
				.where({
					chatId: chat.id,
				})
				.limit(10)
				.orderBy('id', 'desc')
				.fetch();

			return {
				...IsChatAlreadyCreated[0][0],
				messages: lastMessages,
			};
		}

		const newChat = await TechnologyOrderChat.create({
			status: 1,
			technologyOrderId: technologyOrder.id,
			participants: JSON.stringify([user.id, technologyOwner.id]),
		});

		return {
			...newChat.toJSON(),
			messages: [],
		};
	}

	async getMessages({ request, response, auth }) {
		const { offset = 0 } = request.only(['offset']);

		if (!uuid.validate(request.params.chatId)) {
			return response.status(400).send({ message: 'Bad requeset' });
		}

		await auth.check();

		const user = await auth.getUser();

		const AmIAllowedToSeeMessage = await Database.raw(
			`select * from technology_order_chats where id = ? and JSON_CONTAINS(participants, '?', '$')`,
			[request.params.chatId, user.id],
		);

		if (
			!(
				AmIAllowedToSeeMessage &&
				AmIAllowedToSeeMessage[0] &&
				AmIAllowedToSeeMessage[0].length
			)
		) {
			return response.status(404).send({ message: 'Not found' });
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

	async postMessage({ request, response, auth }) {
		const { content } = request.only(['content']);

		await auth.check();

		const user = await auth.getUser();

		const AmIAllowedToSeeMessage = await Database.raw(
			`select * from technology_order_chats where id = ? and JSON_CONTAINS(participants, '?', '$')`,
			[request.params.chatId, user.id],
		);

		if (
			!(
				AmIAllowedToSeeMessage &&
				AmIAllowedToSeeMessage[0] &&
				AmIAllowedToSeeMessage[0].length
			)
		) {
			return response.status(404).send({ message: 'Not found' });
		}

		const newMessage = await TechnologyOrderChatMessages.create({
			content: JSON.stringify(content),
			type: 1,
			fromUserId: user.id,
			chatId: request.params.chatId,
		});

		return newMessage;
	}
}

module.exports = TechnologyOrderChatController;
