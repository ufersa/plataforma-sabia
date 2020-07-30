const { test, trait } = use('Test/Suite')('Upload');
const Helpers = use('Helpers');
const fs = Helpers.promisify(require('fs'));

const Env = use('Env');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');

const User = use('App/Models/User');
const Upload = use('App/Models/Upload');
const Technology = use('App/Models/Technology');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

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
	status: 'DRAFT',
};

test('POST /uplods trying to upload non-permited extension.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.publicPath(`resources/test/test.data`))
		.end();

	response.assertJSONSubset([
		{
			fieldName: 'files[]',
			clientName: 'test.data',
			type: 'extname',
		},
	]);
});

test('POST /uplods creates/saves a new upload.', async ({ client, assert }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.publicPath(`resources/test/test-image.png`))
		.end();

	assert.isTrue(
		fs.existsSync(
			Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/${response.body[0].filename}`),
		),
	);

	const uploadCreated = await Upload.findOrFail(response.body[0].id);
	response.assertStatus(200);
	response.body[0].object = null;
	response.body[0].object_id = null;
	response.assertJSONSubset([uploadCreated.toJSON()]);
});

test('POST /uplods creates/saves multiple uploads.', async ({ client, assert }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.publicPath(`resources/test/test-image_2.png`))
		.attach('files[]', Helpers.publicPath(`resources/test/test-image_3.png`))
		.attach('files[]', Helpers.publicPath(`resources/test/test-image_4.png`))
		.end();

	for (const file of response.body) {
		assert.isTrue(
			fs.existsSync(Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/${file.filename}`)),
		);
	}

	const filesIds = response.body.map((file) => file.id);
	const uploadsCreated = await Upload.query()
		.whereIn('id', filesIds)
		.fetch();

	response.assertStatus(200);
	response.body = response.body.map((body) => {
		body.object = null;
		body.object_id = null;
		return body;
	});
	response.assertJSONSubset(uploadsCreated.toJSON());
});

test('POST /uplods creates/saves a new upload with object and object_id.', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(user);
	const technologyInst = await Technology.create(technology);

	const meta = {
		object: 'technologies',
		object_id: technologyInst.id,
	};

	await technologyInst.users().attach([loggeduser.id]);

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.field('meta', JSON.stringify(meta))
		.attach('files[]', Helpers.publicPath(`resources/test/test-image.png`))
		.end();

	assert.isTrue(
		fs.existsSync(
			Helpers.publicPath(
				`${Env.get('UPLOADS_PATH')}/${response.body[0].object}/${
					response.body[0].filename
				}`,
			),
		),
	);

	const uploadCreated = await Upload.findOrFail(response.body[0].id);
	response.assertStatus(200);
	response.assertJSONSubset([uploadCreated.toJSON()]);
});

test('POST /uplods user trying to upload for object and object_id without permission.', async ({
	client,
}) => {
	const loggeduser = await User.create(user);
	const technologyInst = await Technology.create(technology);

	const meta = {
		object: 'technologies',
		object_id: technologyInst.id,
	};

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.field('meta', JSON.stringify(meta))
		.attach('files[]', Helpers.publicPath(`resources/test/test-image.png`))
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});
