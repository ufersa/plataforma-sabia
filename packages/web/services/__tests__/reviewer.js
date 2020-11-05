import fetchMock from 'fetch-mock-jest';
import { updateCategoriesReviewer } from '../reviewer';
import { baseUrl } from '../api';

const fakeCategories = [1, 2];

describe('reviewer', () => {
	beforeAll(() => {
		fetchMock.mockClear();
		fetchMock.mockReset();
	});

	test.each([[false, 'put', 'reviewers']])(
		'updated user categories when currently status is %s',
		async (active, method, endpoint) => {
			const url = `${baseUrl}/${endpoint}`;

			fetchMock[method](url, { status: 200 });

			await updateCategoriesReviewer({
				categories: fakeCategories,
			});

			expect(fetchMock).toHaveFetched(url, {
				method,
				categories: fakeCategories,
			});
		},
	);
});
