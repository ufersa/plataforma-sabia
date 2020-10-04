const { test } = use('Test/Suite')('CPF');
const cpf = require('../../app/Utils/cpf');

const throws = async (callback) => {
	try {
		await callback();
		return false;
	} catch (error) {
		return true;
	}
};

test('a valid cpf should not throw exception', async ({ assert }) => {
	const hasError = await throws(async () => cpf({ data: '14715498790' }, 'data'));
	assert.equal(hasError, false);
});

test('a invalid cpf should throw exception', async ({ assert }) => {
	const hasError = await throws(async () => cpf({ data: '12347690887' }, 'data'));
	assert.equal(hasError, true);
});

test('a char repeated cpf should throw an exception', async ({ assert }) => {
	const hasError = await throws(async () => cpf({ data: '11111111111' }, 'data'));

	assert.equal(hasError, true);
});

test('a string containing less than eleven digits should throw an error ', async ({ assert }) => {
	const hasError = await throws(async () => cpf({ data: '123' }, 'data'));

	assert.equal(hasError, true);
});

test('a string containing more than eleven digits should throw an error ', async ({ assert }) => {
	const hasError = await throws(async () => cpf({ data: '123456789012' }, 'data'));

	assert.equal(hasError, true);
});

test('an empty string should not throw an error', async ({ assert }) => {
	const hasError = await throws(async () => cpf({ data: '' }, 'data'));

	assert.equal(hasError, false);
});

test('a string containing chars that arent numbers should throw an error', async ({ assert }) => {
	const hasError = await throws(async () => cpf({ data: 'a7sd98as4as8d97asd456as4' }, 'data'));

	assert.equal(hasError, true);
});
