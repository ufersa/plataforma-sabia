const { test, trait } = use('Test/Suite')('Researcher');
const Factory = use('Factory');
const Taxonomy = use('App/Models/Taxonomy');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('GET all researchers', async ({ client, assert }) => {
	const institution = await Factory.model('App/Models/Institution').create();
	const users = await Factory.model('App/Models/User').createMany(5, {
		institution_id: institution.id,
		researcher: true,
	});

	await Promise.all(
		users.map(async (user) => {
			const publishedTechnology = await Factory.model('App/Models/Technology').create({
				status: 'published',
			});
			await user.technologies().attach(publishedTechnology.id);
		}),
	);

	const response = await client.get('/researchers').end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 5);
});

test('GET researchers by name', async ({ client, assert }) => {
	const institution = await Factory.model('App/Models/Institution').create();
	const users = await Factory.model('App/Models/User').createMany(5, {
		institution_id: institution.id,
		researcher: true,
	});

	await Promise.all(
		users.map(async (user) => {
			const publishedTechnology = await Factory.model('App/Models/Technology').create({
				status: 'published',
			});
			await user.technologies().attach(publishedTechnology.id);
		}),
	);

	const researcher = await users[0];
	researcher.first_name = 'sabia';
	researcher.last_name = 'researcher';
	await researcher.save();

	const response = await client.get('/researchers?name=sabia').end();

	response.assertStatus(200);
	assert.equal(response.body[0].full_name, researcher.toJSON().full_name);
});

test('GET researchers by institution', async ({ client, assert }) => {
	const institution = await Factory.model('App/Models/Institution').create({
		name: 'Sabia Institute',
	});
	const users = await Factory.model('App/Models/User').createMany(5, {
		institution_id: institution.id,
		researcher: true,
	});

	await Promise.all(
		users.map(async (user) => {
			const publishedTechnology = await Factory.model('App/Models/Technology').create({
				status: 'published',
			});
			await user.technologies().attach(publishedTechnology.id);
			await user.load('institution');
		}),
	);

	const response = await client.get('/researchers?institution=Sabia').end();

	response.assertStatus(200);
	assert.equal(response.body[0].institution, users[0].toJSON().institution.name);
});

test('GET researchers by keywords', async ({ client, assert }) => {
	const institution = await Factory.model('App/Models/Institution').create({
		name: 'Sabia institute',
	});
	const usersRelatedToWaterKeyword = await Factory.model('App/Models/User').createMany(2, {
		institution_id: institution.id,
		researcher: true,
	});
	const usersRelatedToEarthKeyword = await Factory.model('App/Models/User').createMany(2, {
		institution_id: institution.id,
		researcher: true,
	});
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const waterKeyword = await keywordTaxonomy.terms().create({
		term: 'water',
	});
	await Promise.all(
		usersRelatedToWaterKeyword.map(async (user) => {
			const publishedTechnology = await Factory.model('App/Models/Technology').create({
				status: 'published',
			});
			await publishedTechnology.terms().attach(waterKeyword.id);
			await user.technologies().attach(publishedTechnology.id);
		}),
	);

	const earthKeyword = await keywordTaxonomy.terms().create({
		term: 'earth',
	});

	await Promise.all(
		usersRelatedToEarthKeyword.map(async (user) => {
			const publishedTechnology = await Factory.model('App/Models/Technology').create({
				status: 'published',
			});
			await publishedTechnology.terms().attach(earthKeyword.id);
			await user.technologies().attach(publishedTechnology.id);
		}),
	);

	let response = await client.get('/researchers?keyword=water').end();

	response.assertStatus(200);
	assert.equal(response.body[0].keywords[0].term, 'water');

	response = await client.get('/researchers?keyword=earth').end();

	response.assertStatus(200);
	assert.equal(response.body[0].keywords[0].term, 'earth');
});

test('GET researchers by area', async ({ client, assert }) => {
	const institution = await Factory.model('App/Models/Institution').create({
		name: 'Sabia Institute',
	});
	const users = await Factory.model('App/Models/User').createMany(5, {
		institution_id: institution.id,
		researcher: true,
	});

	await Promise.all(
		users.map(async (user) => {
			const publishedTechnology = await Factory.model('App/Models/Technology').create({
				status: 'published',
			});
			await user.technologies().attach(publishedTechnology.id);
			await user.areas().attach([10603026]);
			await user.loadMany(['institution', 'areas']);
		}),
	);

	const response = await client.get('/researchers?area=10603026').end();

	response.assertStatus(200);
	assert.equal(
		response.body[0].areas[0].knowledge_area_id,
		users[0].toJSON().areas[0].knowledge_area_id,
	);
});
