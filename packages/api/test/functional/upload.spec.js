const { test, trait } = use('Test/Suite')('Upload');
const Helpers = use('Helpers');
const fs = Helpers.promisify(require('fs'));

const Env = use('Env');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload, roles } = require('../../app/Utils');

const User = use('App/Models/User');
const Upload = use('App/Models/Upload');
const Technology = use('App/Models/Technology');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const admin = {
	email: 'sabiatestingadminemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.ADMIN,
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

const base64String =
	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI' +
	'//////////////////////////////////////////////////8BVVpaeGl464KC6//////////////////////////' +
	'////////////////////////////////////////////////CABEIADIAMgMBEQACEQEDEQH/xAAYAAEBAQEBAAAAAA' +
	'AAAAAAAAAAAwIBBP/aAAgBAQAAAAD151oRLDMnbCGZXuYnh6NEFvP6OuOn/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA' +
	'//aAAgBAhAAAADdzBPRIXiRq5kQ2hmqkB//xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/9oACAEDEAAAAMzdG81jIbYl' +
	'F0ZSdGzsWA//xAAjEAABAwQCAQUAAAAAAAAAAAABAAIRAxIhMSBxYQQTQVGx/9oACAEBAAE/AHOt8k6RLxmQmOu74uc' +
	'fd6WACGiJMntAwQeLmhwQ0pTKlpg6/OOsfSdMYRcvT1LhafjXB7JyNo43hFrS7ytaxCa4OEjhVquBLbOjKoNaZMZ1BU' +
	'CITrqVXAkFDXCMzw//xAAbEQEAAgMBAQAAAAAAAAAAAAABABECECAhMP/aAAgBAgEBPwAnkTktygR5NpysMtPKMvIIX' +
	'dvNy70e/H//xAAcEQEAAgMAAwAAAAAAAAAAAAABABECECASITD/2gAIAQMBAT8AWKwb5y9Yxbhyl7HkImsXkSJivVTx' +
	'B02Px//Z';
const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '');

test('GET /uploads regular user gets only its own uploads.', async ({ client }) => {
	const regularUser = await User.first();
	const otherUser = await User.create(user);

	const uploads = [
		{
			filename: 'filename01.png',
		},
		{
			filename: 'filename02.png',
		},
		{
			filename: 'filename03.png',
		},
	];

	await regularUser.uploads().createMany(uploads);
	await otherUser.uploads().createMany(uploads);

	const response = await client
		.get('uploads')
		.loginVia(regularUser, 'jwt')
		.end();
	response.assertStatus(200);
	const regularUserUploads = await regularUser.uploads().fetch();
	response.assertJSONSubset(regularUserUploads.toJSON());
});

test('GET /uploads admin user get all uploads.', async ({ client }) => {
	const regularUser = await User.first();
	const otherUser = await User.create(user);
	const adminUser = await User.create(admin);

	const uploads = [
		{
			filename: 'filename01.png',
		},
		{
			filename: 'filename02.png',
		},
		{
			filename: 'filename03.png',
		},
	];

	await regularUser.uploads().createMany(uploads);
	await otherUser.uploads().createMany(uploads);

	const response = await client
		.get('uploads')
		.loginVia(adminUser, 'jwt')
		.end();
	response.assertStatus(200);
	const regularUserUploads = await regularUser.uploads().fetch();
	const otherUserUploads = await otherUser.uploads().fetch();
	response.assertJSONSubset([...regularUserUploads.toJSON(), ...otherUserUploads.toJSON()]);
});

test('POST /uploads trying to upload non-allowed file extension.', async ({ client }) => {
	const loggeduser = await User.create(user);

	fs.writeFileSync(Helpers.tmpPath(`resources/test/test.data`), 'Hello World!');

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/test.data`))
		.end();
	response.assertJSONSubset({
		error: {
			error_code: 'VALIDATION_ERROR',
			message: [
				{
					message:
						'Invalid file extension data. Only jpg, jpeg, jfif, pjpeg, pjp, png, webp, pdf are allowed',
					field: 'files.0',
					validation: 'fileExt',
				},
				{
					message:
						'Invalid file extension data. Only jpg, jpeg, jfif, pjpeg, pjp, png, webp, pdf are allowed',
					field: 'files.0',
					validation: 'fileSize',
				},
				{
					message:
						'Invalid file extension data. Only jpg, jpeg, jfif, pjpeg, pjp, png, webp, pdf are allowed',
					field: 'files.0',
					validation: 'fileTypes',
				},
			],
		},
	});
});

test('POST /uploads creates/saves a new upload.', async ({ client, assert }) => {
	const loggeduser = await User.create(user);

	await fs.writeFile(Helpers.tmpPath(`resources/test/test-image.jpg`), base64Data, 'base64');

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image.jpg`))
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

test('POST /uploads creates/saves multiple uploads.', async ({ client, assert }) => {
	const loggeduser = await User.create(user);

	await fs.writeFile(Helpers.tmpPath(`resources/test/test-image_2.jpg`), base64Data, 'base64');
	await fs.writeFile(Helpers.tmpPath(`resources/test/test-image_3.jpg`), base64Data, 'base64');
	await fs.writeFile(Helpers.tmpPath(`resources/test/test-image_4.jpg`), base64Data, 'base64');

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image_2.jpg`))
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image_3.jpg`))
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image_4.jpg`))
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

test('POST /uploads creates/saves a new upload with object and object_id.', async ({
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

	await fs.writeFile(
		Helpers.tmpPath(`resources/test/test-image_with_object.jpg`),
		base64Data,
		'base64',
	);

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.field('meta', JSON.stringify(meta))
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image_with_object.jpg`))
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

test('POST /uploads creates unique filenames.', async ({ client, assert }) => {
	const loggeduser = await User.create(user);

	await fs.writeFile(
		Helpers.tmpPath(`resources/test/test-image-unique.jpg`),
		base64Data,
		'base64',
	);

	const file = {
		clientName: 'test-image-unique.jpg',
		extname: 'jpg',
	};
	let uniqueFilename = await Upload.getUniqueFileName(file);

	const response = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/${file.clientName}`))
		.end();

	assert.isTrue(
		fs.existsSync(Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/${uniqueFilename}`)),
	);

	assert.equal(response.body[0].filename, uniqueFilename);

	uniqueFilename = await Upload.getUniqueFileName(file);

	const response2 = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/${file.clientName}`))
		.end();

	assert.isTrue(
		fs.existsSync(Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/${uniqueFilename}`)),
	);

	assert.equal(response2.body[0].filename, uniqueFilename);
});

test('POST /uploads user trying to upload for object and object_id without permission.', async ({
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
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image.jpg`))
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /uploads/:id deletes upload.', async ({ client, assert }) => {
	const loggeduser = await User.create(user);

	await fs.writeFile(
		Helpers.tmpPath(`resources/test/test-image-for-delete.jpg`),
		base64Data,
		'base64',
	);

	const responseUpload = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image-for-delete.jpg`))
		.end();

	assert.isTrue(
		fs.existsSync(Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/test-image-for-delete.jpg`)),
	);

	const response = await client
		.delete(`uploads/${responseUpload.body[0].id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	assert.isFalse(
		fs.existsSync(Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/test-image-for-delete.jpg`)),
	);

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /uploads/:id user trying to delete other user upload.', async ({ client, assert }) => {
	const loggeduser = await User.create(user);
	const otherUser = await User.first();

	await fs.writeFile(
		Helpers.tmpPath(`resources/test/test-image-for-delete.jpg`),
		base64Data,
		'base64',
	);

	const responseUpload = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/test-image-for-delete.jpg`))
		.end();

	assert.isTrue(
		fs.existsSync(Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/test-image-for-delete.jpg`)),
	);

	const response = await client
		.delete(`uploads/${responseUpload.body[0].id}`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});
