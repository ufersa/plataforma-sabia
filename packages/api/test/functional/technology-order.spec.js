const { trait, test } = use('Test/Suite')('Technology Order');
const Technology = use('App/Models/Technology');
const User = use('App/Models/User');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const {
	antl,
	errors,
	errorPayload,
	fundingStatuses,
	technologyUseStatuses,
	orderStatuses,
} = require('../../app/Utils');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 1,
	intellectual_property: 1,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Test primary purpose',
	secondary_purpose: 'Test secondary purpose',
	application_mode: 'Test application mode',
	application_examples: 'Test application example',
	installation_time: 365,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
	status: 'published',
	videos:
		'[{\"link\":\"https://www.youtube.com/watch?v=8h7p88oySWY\",\"videoId\":\"8h7p88oySWY\",\"provider\":\"Youtube\",\"thumbnail\":\"http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg\"}]', // eslint-disable-line
};

const order = {
	quantity: 2,
	use: technologyUseStatuses.PRIVATE,
	funding: fundingStatuses.NO_NEED_FUNDING,
	comment: 'test',
	status: orderStatuses.OPEN,
};

const closedOrder = {
	quantity: 1,
	use: technologyUseStatuses.PRIVATE,
	funding: fundingStatuses.NO_NEED_FUNDING,
	comment: 'test',
	status: orderStatuses.CLOSED,
};

const buyer = {
	email: 'sabiatestingbuyer@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	company: 'Company',
	zipcode: '9999999',
	cpf: '52100865005',
	birth_date: '1900-01-01',
	phone_number: '(99)23456789',
	lattes_id: '1234567890',
	address: 'Testing address, 99',
	address2: 'Complement 99',
	district: '99',
	city: 'Test City',
	state: 'TT',
	country: 'Fictional Country',
};

const seller = {
	email: 'sabiatestingseller@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	company: 'Company',
	zipcode: '9999999',
	cpf: '52100865005',
	birth_date: '1900-01-01',
	phone_number: '(99)23456789',
	lattes_id: '1234567890',
	address: 'Testing address, 99',
	address2: 'Complement 99',
	district: '99',
	city: 'Test City',
	state: 'TT',
	country: 'Fictional Country',
};

test('PUT /orders/:id/close returns an error when an unauthorized buyer attempts to close an order.', async ({ client }) => {
	const technologyPurchased = await Technology.create(technology);

	const buyerUser = await User.create(buyer);
	const sellerUser = await User.create(seller);

	await technologyPurchesed.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(order);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchesed),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/close`)
		.loginVia(buyerUser, 'jwt')
		.send({ quantity: 3, unit_value: 100000 })
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /orders/:id/close returns an error when a buyer tries to close an order for a technology with a non opened status.', async ({
	client,
}) => {
	const technologyPurchesed = await Technology.create(technology);

	const buyerUser = await User.create(buyer);
	const sellerUser = await User.create(seller);

	await technologyPurchesed.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(closedOrder);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchesed),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/close`)
		.loginVia(sellerUser, 'jwt')
		.send({ quantity: 3, unit_value: 100000 })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.STATUS_NO_ALLOWED_FOR_OPERATION,
			antl('error.operation.statusNoAllowedForOperation', {
				op: 'CLOSE ORDER',
				status: technologyOrder.status,
			}),
		),
	);
});

test('PUT /orders/:id/close makes a seller closes an order successfully.', async ({ client, assert }) => {
	const technologyPurchesed = await Technology.create(technology);

	const buyerUser = await User.create(buyer);
	const sellerUser = await User.create(seller);

	await technologyPurchesed.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(order);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchesed),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/close`)
		.loginVia(sellerUser, 'jwt')
		.send({ quantity: 3, unit_value: 100000 })
		.end();

	response.assertStatus(200);
	assert.equal(orderClosed.status, orderStatuses.CLOSED);
	assert.equal(response.body.technology_id, technologyPurchased.id);
});
