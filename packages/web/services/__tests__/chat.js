import fetchMock from 'fetch-mock-jest';
import { getChatInstance, getChatMessages, sendChatMessage } from '../chat';

const getChatInstanceData = {
	id: '6e880446-5a92-436b-8834-9a9c36772a26',
	object_id: 1,
	object_type: 'technology-order',
	status: 'active',
	participants: [11, 20],
	created_at: '2021-01-07 10:27:05',
	updated_at: '2021-01-07 10:27:05',
};

const getChatMessagesData = [
	{
		id: 31,
		chat_id: '5698ea95-6991-4edc-99d3-8023017116d6',
		type: 'text',
		from_user_id: 11,
		content: { text: 'Teste' },
		created_at: '2021-01-08 11:11:59',
		updated_at: '2021-01-08 11:11:59',
	},
];

const sendChatMessageData = {
	content: '{"text":"Olá"}',
	type: 'text',
	from_user_id: 11,
	chat_id: '5698ea95-6991-4edc-99d3-8023017116d6',
	created_at: '2021-01-08 17:10:38',
	updated_at: '2021-01-08 17:10:38',
	id: 70,
};

describe('getChatInstance', () => {
	const getChatInstanceEndpoint = /chat/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.get(getChatInstanceEndpoint, {
			status: 200,
			body: {
				...getChatInstanceData,
			},
		});
	});

	test('it gets the chat instance successfully', async () => {
		const chatInstance = await getChatInstance({
			object_type: 'order',
			object_id: 1,
			target_user: 1,
		});

		expect(chatInstance).toEqual({
			...getChatInstanceData,
		});

		expect(fetchMock).toHaveFetched(getChatInstanceEndpoint, {
			method: 'GET',
		});
	});

	test('it returns false if no object_type is provided', async () => {
		const chatInstance = await getChatInstance({ object_id: 1, target_user: 1 });
		expect(chatInstance).toBeFalsy();
	});

	test('it returns false if no object_id is provided', async () => {
		const chatInstance = await getChatInstance({
			object_type: 'order',
			target_user: 1,
		});
		expect(chatInstance).toBeFalsy();
	});

	test('it returns false if no target_user is provided', async () => {
		const chatInstance = await getChatInstance({
			object_type: 'order',
			object_id: 1,
		});
		expect(chatInstance).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.get(getChatInstanceEndpoint, { status: 400 });
		const chatInstance = await getChatInstance({
			object_type: 'order',
			object_id: 1,
			target_user: 1,
		});

		expect(chatInstance).toBeFalsy();
		expect(fetchMock).toHaveFetched(getChatInstanceEndpoint, {
			method: 'GET',
			status: 400,
		});
	});
});

describe('getChatMessages', () => {
	const getChatMessagesEndpoint = /chat\/(.*)\/messages/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.get(getChatMessagesEndpoint, {
			status: 200,
			body: {
				...getChatMessagesData,
			},
		});
	});

	test('it gets the chat messages successfully', async () => {
		const chatMessages = await getChatMessages(1);

		expect(chatMessages).toEqual({
			...getChatMessagesData,
		});

		expect(fetchMock).toHaveFetched(getChatMessagesEndpoint, {
			method: 'GET',
		});
	});

	test('it returns false if no chat id is provided', async () => {
		const chatMessages = await getChatMessages();
		expect(chatMessages).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.get(getChatMessagesEndpoint, { status: 400 });
		const chatMessages = await getChatMessages(1);

		expect(chatMessages).toBeFalsy();
		expect(fetchMock).toHaveFetched(getChatMessagesEndpoint, {
			method: 'GET',
			status: 400,
		});
	});
});

describe('sendChatMessage', () => {
	const sendChatMessageEndpoint = /chat\/(.*)\/messages/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.post(sendChatMessageEndpoint, {
			status: 200,
			body: {
				...sendChatMessageData,
			},
		});
	});

	test('it sends a message successfully', async () => {
		const chatMessage = await sendChatMessage(1, 'Texto');

		expect(chatMessage).toEqual({
			...sendChatMessageData,
		});

		expect(fetchMock).toHaveFetched(sendChatMessageEndpoint, {
			method: 'POST',
			body: {
				content: {
					text: 'Texto',
				},
			},
		});
	});

	test('it returns false if no chat id is provided', async () => {
		const chatMessage = await sendChatMessage();
		expect(chatMessage).toBeFalsy();
	});

	test('it returns false if no text provided', async () => {
		const chatMessage = await sendChatMessage(1);
		expect(chatMessage).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.post(sendChatMessageEndpoint, { status: 400 });
		const chatMessages = await sendChatMessage(1, 'Texto');

		expect(chatMessages).toBeFalsy();
		expect(fetchMock).toHaveFetched(sendChatMessageEndpoint, {
			method: 'POST',
			status: 400,
		});
	});
});
