const { test } = use('Test/Suite')('CNPJ');
const { cnpj } = require('../../app/Utils/CustomValidators');

const throws = async (callback) => {
	try {
		await callback();
		return false;
	} catch (error) {
		return true;
	}
};

test('a valid cnpj should not throw exception', async ({ assert }) => {
	const hasError = await throws(async () => cnpj({ data: '24.529.265/0001-40' }, 'data'));
	assert.equal(hasError, false);
});

test('a invalid cnpj should throw exception', async ({ assert }) => {
	const hasError = await throws(async () => cnpj({ data: '24529265000141' }, 'data'));
	assert.equal(hasError, true);
});

test('a char repeated cnpj should throw an exception', async ({ assert }) => {
	const hasError = await throws(async () => cnpj({ data: '11111111111111' }, 'data'));
	assert.equal(hasError, true);
});

test('a string containing less than eleven digits should throw an error ', async ({ assert }) => {
	const hasError = await throws(async () => cnpj({ data: '123' }, 'data'));
	assert.equal(hasError, true);
});

test('a string containing more than eleven digits should throw an error ', async ({ assert }) => {
	const hasError = await throws(async () => cnpj({ data: '123456789012345' }, 'data'));
	assert.equal(hasError, true);
});

test('an empty string should not throw an error', async ({ assert }) => {
	const hasError = await throws(async () => cnpj({ data: '' }, 'data'));
	assert.equal(hasError, false);
});

test('a string containing chars that arent numbers should throw an error', async ({ assert }) => {
	const hasError = await throws(async () => cnpj({ data: 'a1b2c3d4e5f6g7' }, 'data'));
	assert.equal(hasError, true);
});
