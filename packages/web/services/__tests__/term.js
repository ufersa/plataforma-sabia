import fetchMock from 'fetch-mock-jest';
import { createTerm } from '../term';

describe('createTerm', () => {
	const termEndpoint = `path:/terms`;

	const termData = {
		term: 'Term Value',
		value: '10',
	};

	const bodyResponse = { id: 1, ...termData };

	beforeEach(() => {
		fetchMock.mockReset();
	});

	test('it creates a term successfully', async () => {
		fetchMock.post(termEndpoint, {
			status: 200,
			body: bodyResponse,
		});
		const term = await createTerm(termData.term, 'KEYWORDS');

		expect(term).toEqual(bodyResponse);

		expect(fetchMock).toHaveFetched(termEndpoint, {
			method: 'POST',
		});
	});

	test('it returns false if request fails', async () => {
		fetchMock.post(termEndpoint, { status: 400 });
		const response = await createTerm(termData.term, 'CATEGORY');

		expect(response).toBeFalsy();
		expect(fetchMock).toHaveFetched(termEndpoint, {
			method: 'POST',
		});
	});
});
