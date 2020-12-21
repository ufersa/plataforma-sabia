import fetchMock from 'fetch-mock-jest';
import { buyTechnology } from '../technologyOrders';

const technologyOrderData = {
	comment: 'Teste',
	created_at: '2020-11-11 10:04:52',
	funding: 'has_funding',
	id: 6,
	quantity: 1,
	status: 'open',
	technology_id: 23,
	updated_at: '2020-11-11 10:04:52',
	use: 'private',
	user_id: 15,
};

describe('buyTechnology', () => {
	const buyTechnologyEndpoint = /technologies\/(.*)\/orders/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.post(buyTechnologyEndpoint, {
			status: 200,
			body: {
				...technologyOrderData,
			},
		});
	});

	test('it creates a technology order successfuly', async () => {
		const order = await buyTechnology(23, {
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
			comment: 'Teste',
		});

		expect(order).toEqual({
			...technologyOrderData,
		});

		expect(fetchMock).toHaveFetched(buyTechnologyEndpoint, {
			method: 'POST',
			body: {
				quantity: 1,
				use: 'private',
				funding: 'has_funding',
				comment: 'Teste',
			},
		});
	});

	test('it returns false if no id is provided', async () => {
		const order = await buyTechnology();

		expect(order).toBeFalsy();
	});

	test('it returns false if no quantity, use and funding is provided', async () => {
		const order = await buyTechnology(1, { quantity: null, use: null, funding: null });

		expect(order).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.post(buyTechnologyEndpoint, { status: 400 });
		const order = await buyTechnology(1, {
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		});

		expect(order).toBeFalsy();
		expect(fetchMock).toHaveFetched(buyTechnologyEndpoint, {
			method: 'POST',
			status: 400,
		});
	});
});
