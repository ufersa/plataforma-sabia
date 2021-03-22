const { test, trait } = use('Test/Suite')('Contact');
const Bull = use('Rocketseat/Bull');
const Config = use('Config');

trait('Test/ApiClient');
trait('Auth/Client');

const plataformMail = Config.get('mail.platform.mail');

test('POST /contact sends an email.', async ({ client, assert }) => {
	await Bull.reset();

	const payload = {
		name: 'any name',
		email: 'any@mail.com',
		phone: 'any number',
		subject: 'any subject',
		message: 'any message',
	};

	const response = await client
		.post('/contact')
		.send(payload)
		.end();

	const bullCall = Bull.spy.calls[0];

	response.assertStatus(204);
	assert.equal('add', bullCall.funcName);
	assert.equal(payload.message, bullCall.args[1].message);
	assert.equal(plataformMail, bullCall.args[1].to);
	assert.isTrue(Bull.spy.called);
});
