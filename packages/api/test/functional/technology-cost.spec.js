const { test, trait } = use('Test/Suite')('Technology Cost');
const Technology = use('App/Models/Technology');
const TechnologyCost = use('App/Models/TechnologyCost');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 1,
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
};

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const technologyCost = {
	funding_required: true,
	funding_type: 'private',
	funding_value: 200000000,
	funding_status: 'approved',
	notes: 'some additional information',
	is_seller: true,
	price: 1000000000,
	costs: [
		{
			cost_type: 'development_costs',
			description: 'Exemplo 1 de custo de desenvolvimento',
			type: 'material',
			quantity: 1,
			value: 10000,
			measure_unit: 'm',
		},
		{
			cost_type: 'implementation_costs',
			description: 'Exemplo 1 de custo de implantação',
			type: 'service',
			quantity: 1,
			value: 10000,
			measure_unit: 'kg',
		},
		{
			cost_type: 'maintenance_costs',
			description: 'Exemplo 1 de custo de manutenção',
			type: 'material',
			quantity: 2,
			value: 5000,
			measure_unit: 'kg',
		},
	],
};

test('GET technology_cost by technology id', async ({ client }) => {
	const firstTechnology = await Technology.first();
	const technologyCostInst = await firstTechnology.technologyCosts().first();

	const response = await client.get(`technologies/${firstTechnology.id}/costs`).end();

	await technologyCostInst.load('costs');

	response.assertStatus(200);
	technologyCostInst.funding_required = 1;
	response.assertJSONSubset(technologyCostInst.toJSON());
});

test('PUT /technologies/:id/costs creates/saves a new technology cost.', async ({ client }) => {
	const loggeduser = await createUser(user);

	const newTechnology = await Technology.create(technology);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}/costs`)
		.loginVia(loggeduser, 'jwt')
		.send(technologyCost)
		.end();

	const technologyCostCreated = await TechnologyCost.find(response.body.id);
	await technologyCostCreated.load('costs');
	technologyCostCreated.funding_required = true;
	technologyCostCreated.is_seller = true;

	response.assertStatus(200);
	response.assertJSONSubset(technologyCostCreated.toJSON());
});

test('PUT /technologies/:id/costs update technology cost details.', async ({ client }) => {
	const loggeduser = await createUser(user);

	const lastTechnology = await Technology.last();
	await lastTechnology.users().attach([loggeduser.id]);

	const updatedTechnologyCost = {
		funding_required: true,
		funding_type: 'public',
		funding_value: 10000000,
		funding_status: 'pending',
		notes: 'updated notes information',
		is_seller: false,
	};

	const response = await client
		.put(`/technologies/${lastTechnology.id}/costs`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnologyCost)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnologyCost);
});

test('PUT /technologies/:id/costs update costs details.', async ({ client }) => {
	const loggeduser = await createUser(user);

	const lastTechnology = await Technology.last();
	const technologyCostInst = await lastTechnology.technologyCosts().first();

	await lastTechnology.users().attach([loggeduser.id]);

	await technologyCostInst.load('costs');

	const updatedTechnologyCost = technologyCostInst.toJSON();

	const updatedCost = {
		cost_type: 'development_costs',
		description: 'Custo de desenvolvimento adicional',
		type: 'material',
		quantity: 1,
		value: 10000,
	};

	updatedTechnologyCost.costs[0] = { ...updatedTechnologyCost.costs[0], ...updatedCost };

	const response = await client
		.put(`/technologies/${lastTechnology.id}/costs`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnologyCost)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		costs: [updatedCost],
	});
});

test('PUT /technologies/:id/costs update costs details with new cost.', async ({ client }) => {
	const lastTechnology = await Technology.last();
	const technologyCostInst = await lastTechnology.technologyCosts().first();

	const loggeduser = await createUser(user);
	await lastTechnology.users().attach([loggeduser.id]);

	await technologyCostInst.load('costs');

	const updatedTechnologyCost = technologyCostInst.toJSON();

	const newCost = {
		cost_type: 'development_costs',
		description: 'Custo de desenvolvimento adicional',
		type: 'material',
		quantity: 1,
		value: 10000,
	};

	updatedTechnologyCost.costs.push(newCost);

	const response = await client
		.put(`/technologies/${lastTechnology.id}/costs`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnologyCost)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		costs: [newCost],
	});
});

test('PUT /technologies/:id/costs deletes costs with empty cost array.', async ({ client }) => {
	const lastTechnology = await Technology.last();
	const technologyCostInst = await lastTechnology.technologyCosts().first();

	const loggeduser = await createUser(user);
	await lastTechnology.users().attach([loggeduser.id]);

	await technologyCostInst.load('costs');

	const updatedTechnologyCost = technologyCostInst.toJSON();

	updatedTechnologyCost.costs = [];

	const response = await client
		.put(`/technologies/${lastTechnology.id}/costs`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnologyCost)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		costs: [],
	});
});
