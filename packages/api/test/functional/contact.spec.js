const { test, trait } = use('Test/Suite')('Contact');

const Bull = use('Rocketseat/Bull');

trait('Test/ApiClient');
trait('Auth/Client');

test('POST /contact sends an email.', async ({ client, assert }) => {
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
	assert.isTrue(Bull.spy.called);
});
