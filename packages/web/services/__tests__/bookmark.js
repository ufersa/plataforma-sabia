import fetchMock from 'fetch-mock-jest';
import { handleBookmark } from '../bookmark';
import { baseUrl } from '../api';

const fakeTechnology = {
	id: 1,
	title: 'hi',
};

const fakeUser = {
	id: 1,
	token: '123',
};

describe('bookmarks', () => {
	beforeAll(() => {
		fetchMock.mockClear();
		fetchMock.mockReset();
	});

	test.each([
		[true, 'delete', `user/${fakeUser.id}/bookmarks`],
		[false, 'post', 'bookmarks'],
	])(
		'switch user bookmark status when currently status is %s',
		async (active, method, endpoint) => {
			const url = `${baseUrl}/${endpoint}`;

			fetchMock[method](url, { status: 200 });

			await handleBookmark({
				active,
				technologyId: fakeTechnology.id,
				userId: fakeUser.id,
				userToken: fakeUser.token,
			});

			expect(fetchMock).toHaveFetched(url, {
				method,
				userToken: fakeUser.token,
				technologyIds: [fakeTechnology.id],
			});
		},
	);
});
