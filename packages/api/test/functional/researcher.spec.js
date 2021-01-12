const { test, trait } = use('Test/Suite')('Researcher');
const Factory = use('Factory');
const Taxonomy = use('App/Models/Taxonomy');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('GET all researchers', async ({ client, assert }) => {
	const users = await Factory.model('App/Models/User').createMany(5);

	await Promise.all(
		users.map(async (user) => {
			const institution = await Factory.model('App/Models/Institution').create();
			await user.institution().associate(institution);
			const publishedTechnology = await Factory.model('App/Models/Technology').create();
			publishedTechnology.status = 'published';
			user.technologies().attach(publishedTechnology.id);
			user.researcher = true;
			await user.save();
		}),
	);

	const response = await client.get('/researchers').end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 5);
});

test('GET researchers by name', async ({ client, assert }) => {
	const users = await Factory.model('App/Models/User').createMany(5);

	await Promise.all(
		users.map(async (user) => {
			const institution = await Factory.model('App/Models/Institution').create();
			await user.institution().associate(institution);
			const publishedTechnology = await Factory.model('App/Models/Technology').create();
			publishedTechnology.status = 'published';
			user.technologies().attach(publishedTechnology.id);
			user.researcher = true;
			await user.save();
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
	const users = await Factory.model('App/Models/User').createMany(5);

	await Promise.all(
		users.map(async (user) => {
			const institution = await Factory.model('App/Models/Institution').create();
			institution.name = 'Sabia Institute';
			await institution.save();
			await user.institution().associate(institution);
			const publishedTechnology = await Factory.model('App/Models/Technology').create();
			publishedTechnology.status = 'published';
			user.technologies().attach(publishedTechnology.id);
			user.researcher = true;
			await user.save();
			await user.load('institution');
		}),
	);

	const response = await client.get('/researchers?institution=Sabia').end();

	response.assertStatus(200);
	assert.equal(response.body[0].institution, users[0].toJSON().institution.name);
});

test('GET researchers by keywords', async ({ client, assert }) => {
	const usersRelatedToWaterKeyword = await Factory.model('App/Models/User').createMany(2);
	const usersRelatedToEarthKeyword = await Factory.model('App/Models/User').createMany(2);
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const waterKeyword = await keywordTaxonomy.terms().create({
		term: 'water',
	});
	await Promise.all(
		usersRelatedToWaterKeyword.map(async (user) => {
			const institution = await Factory.model('App/Models/Institution').create();
			institution.name = 'Sabia Institute';
			await institution.save();
			await user.institution().associate(institution);
			const publishedTechnology = await Factory.model('App/Models/Technology').create();
			publishedTechnology.status = 'published';
			publishedTechnology.terms().attach(waterKeyword.id);
			user.technologies().attach(publishedTechnology.id);
			user.researcher = true;
			await user.save();
			await user.load('institution');
		}),
	);

	const earthKeyword = await keywordTaxonomy.terms().create({
		term: 'earth',
	});

	await Promise.all(
		usersRelatedToEarthKeyword.map(async (user) => {
			const institution = await Factory.model('App/Models/Institution').create();
			institution.name = 'Sabia Institute';
			await institution.save();
			await user.institution().associate(institution);
			const publishedTechnology = await Factory.model('App/Models/Technology').create();
			publishedTechnology.status = 'published';
			publishedTechnology.terms().attach(earthKeyword.id);
			user.technologies().attach(publishedTechnology.id);
			user.researcher = true;
			await user.save();
			await user.load('institution');
		}),
	);

	const response = await client.get('/researchers?keyword=water').end();

	response.assertStatus(200);
	assert.equal(response.body[0].keywords[0].term, 'water');
});

test('GET researchers by area', async ({ client, assert }) => {
	const users = await Factory.model('App/Models/User').createMany(5);

	await Promise.all(
		users.map(async (user) => {
			const institution = await Factory.model('App/Models/Institution').create();
			institution.name = 'Sabia Institute';
			await institution.save();
			await user.institution().associate(institution);
			const publishedTechnology = await Factory.model('App/Models/Technology').create();
			publishedTechnology.status = 'published';
			user.technologies().attach(publishedTechnology.id);
			user.areas().attach([10603026]);
			user.researcher = true;
			await user.save();
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
