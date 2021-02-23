const { test, trait } = use('Test/Suite')('Technology Cost');
const Factory = use('Factory');
const TechnologyCost = use('App/Models/TechnologyCost');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const technologyCostData = {
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
	const { user: owner } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	const technologyCost = await Factory.model('App/Models/TechnologyCost').create({
		technology_id: technology.id,
	});
	await Factory.model('App/Models/Cost').createMany(3, {
		technology_cost_id: technologyCost.id,
	});

	const response = await client.get(`technologies/${technology.id}/costs`).end();

	await technologyCost.load('costs');
	technologyCost.funding_required = Number(technologyCost.funding_required);
	technologyCost.is_seller = Number(technologyCost.is_seller);

	response.assertStatus(200);
	response.assertJSONSubset(technologyCost.toJSON());
});

test('PUT /technologies/:id/costs creates/saves a new technology cost.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach([loggedUser.id]);

	const response = await client
		.put(`/technologies/${technology.id}/costs`)
		.loginVia(loggedUser, 'jwt')
		.send(technologyCostData)
		.end();

	const technologyCostCreated = await TechnologyCost.find(response.body.id);
	await technologyCostCreated.load('costs');
	technologyCostCreated.funding_required = true;
	technologyCostCreated.is_seller = true;

	response.assertStatus(200);
	response.assertJSONSubset(technologyCostCreated.toJSON());
});

test('PUT /technologies/:id/costs update technology cost details.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach([loggedUser.id]);

	const updatedTechnologyCost = await Factory.model('App/Models/TechnologyCost').make();

	const response = await client
		.put(`/technologies/${technology.id}/costs`)
		.loginVia(loggedUser, 'jwt')
		.send(updatedTechnologyCost.toJSON())
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...updatedTechnologyCost.toJSON() });
});

test('PUT /technologies/:id/costs update costs details.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	const technologyCost = await Factory.model('App/Models/TechnologyCost').create({
		technology_id: technology.id,
	});
	await Factory.model('App/Models/Cost').createMany(3, {
		technology_cost_id: technologyCost.id,
	});

	await technology.users().attach([loggedUser.id]);

	await technologyCost.load('costs');

	const updatedTechnologyCost = technologyCost.toJSON();

	const updatedCost = await Factory.model('App/Models/Cost').make();

	updatedTechnologyCost.costs[0] = { ...updatedTechnologyCost.costs[0], ...updatedCost.toJSON() };

	const response = await client
		.put(`/technologies/${technology.id}/costs`)
		.loginVia(loggedUser, 'jwt')
		.send(updatedTechnologyCost)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		costs: [updatedCost.toJSON()],
	});
});

test('PUT /technologies/:id/costs update costs details with new cost.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	const technologyCost = await Factory.model('App/Models/TechnologyCost').create({
		technology_id: technology.id,
	});
	await Factory.model('App/Models/Cost').createMany(3, {
		technology_cost_id: technologyCost.id,
	});

	await technology.users().attach([loggedUser.id]);

	await technologyCost.load('costs');

	const updatedTechnologyCost = technologyCost.toJSON();

	const newCost = await Factory.model('App/Models/Cost').make();

	updatedTechnologyCost.costs.push(newCost.toJSON());

	const response = await client
		.put(`/technologies/${technology.id}/costs`)
		.loginVia(loggedUser, 'jwt')
		.send(updatedTechnologyCost)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		costs: [newCost.toJSON()],
	});
});

test('PUT /technologies/:id/costs deletes costs with empty cost array.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	const technologyCost = await Factory.model('App/Models/TechnologyCost').create({
		technology_id: technology.id,
	});
	await Factory.model('App/Models/Cost').createMany(3, {
		technology_cost_id: technologyCost.id,
	});

	await technology.users().attach([loggedUser.id]);

	await technologyCost.load('costs');

	const updatedTechnologyCost = technologyCost.toJSON();

	updatedTechnologyCost.costs = [];

	const response = await client
		.put(`/technologies/${technology.id}/costs`)
		.loginVia(loggedUser, 'jwt')
		.send(updatedTechnologyCost)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		costs: [],
	});
});
