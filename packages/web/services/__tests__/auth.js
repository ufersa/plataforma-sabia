import fetchMock from 'fetch-mock-jest';
import { baseUrl } from '../api';
import { getCookie, setCookie } from '../../utils/helper';
import {
	login,
	requestPasswordReset,
	resetPassword,
	register,
	getMe,
	emailConfirmation,
	logout,
} from '../auth';

beforeEach(() => {
	fetchMock.mockClear();
	fetchMock.mockReset();
});

const user = {
	scope: 'web',
	email: 'fakeuser@gmail.com',
	password: 'fakepass',
};

const { email, password, scope } = user;

describe('login/logout', () => {
	const loginEndpoint = `${baseUrl}/auth/login`;
	const loginReturnedData = {
		token: 'my-fake-token',
	};

	test('login logs the user in', async () => {
		fetchMock.postOnce(loginEndpoint, loginReturnedData, 200);
		const result = await login(email, password);
		expect(result.token).toEqual(loginReturnedData.token);
		expect(getCookie('token')).toEqual(result.token);
		expect(fetchMock).toHaveFetched(loginEndpoint, {
			method: 'POST',
			body: { email, password },
		});
	});

	test('login does not log the user in if auth fails', async () => {
		setCookie('token', '');

		fetchMock.post(loginEndpoint, {}, 401);
		const result = await login(email, password);
		expect(result.token).toBeUndefined();

		const response = await login(email, password, { json: false });
		expect(response.status).not.toEqual(200);

		expect(getCookie('token')).toEqual('');
	});

	test('logout logs the user out', async () => {
		fetchMock.postOnce(loginEndpoint, loginReturnedData, 200);
		const result = await login(email, password);
		expect(getCookie('token')).toEqual(result.token);
		logout();
		expect(getCookie('token')).toEqual('');
	});
});

describe('getMe', () => {
	const getMeEndpoint = /user\/me(.*)/;
	const token = 'my-token';

	const bookmarksData = [
		{ id: 27, objectID: 'technology-27', pivot: [Object] },
		{ id: 25, objectID: 'technology-25', pivot: [Object] },
		{ id: 16, objectID: 'technology-16', pivot: [Object] },
	];

	const returnedUser = {
		id: 1,
		email: 'ropake@seenucug.ee',
		status: 'pending',
		first_name: 'LcsUZaq0dGx@io',
		last_name: 'peCrNrHY%wC9e',
		company: 'LxnlnitLTL&',
		role_id: 1,
		full_name: 'LcsUZaq0dGx@io peCrNrHY%wC9e',
		password: '',
	};

	it('returns the user successfully', async () => {
		fetchMock.get(getMeEndpoint, returnedUser);
		const response = await getMe(token);
		expect(response).toEqual(returnedUser);
		expect(fetchMock).toHaveFetched(getMeEndpoint, {
			method: 'GET',
		});
	});

	test.each([
		[
			'a filled array',
			bookmarksData,
			bookmarksData.map((bookmark) => ({
				solution: bookmark.objectID.split('-')[0],
				id: bookmark.id,
			})),
		],
		['an empty array', [], []],
		['not an array', 'hi', []],
	])(
		'returns the user and normalizes their bookmarks when these are %s',
		async (_, bookmarksArray, normalizedBookmarks) => {
			fetchMock.get(getMeEndpoint, { ...returnedUser, bookmarks: bookmarksArray });
			const response = await getMe(token, { bookmarks: true });

			expect(response).toEqual({ ...returnedUser, bookmarks: normalizedBookmarks });
			expect(fetchMock).toHaveFetched(getMeEndpoint, {
				method: 'GET',
				body: { bookmarks: true },
			});
		},
	);

	it('returns false if the request fails', async () => {
		fetchMock.get(getMeEndpoint, { status: 401 });
		const response = await getMe(token);
		expect(response).toBeFalsy();
		expect(fetchMock).toHaveFetched(getMeEndpoint, {
			method: 'GET',
		});
	});
});

describe('register', () => {
	const registerEndpoint = `${baseUrl}/auth/register`;
	const registerReturnedData = {
		first_name: 'Fake',
		last_name: 'User',
		email: 'fakeuser@gmail.com',
		id: 1,
		role_id: 1,
		full_name: 'Fake User',
		role: {
			id: 1,
			role: 'DEFAULT_USER',
			description: 'Usuário comum',
		},
		password: '',
	};

	it('registers the user successfully', async () => {
		fetchMock.postOnce(registerEndpoint, registerReturnedData, 200);
		const response = await register(email, password);
		expect(response).toEqual(registerReturnedData);
		expect(fetchMock).toHaveFetched(registerEndpoint, {
			method: 'POST',
			body: { ...user, disclaimers: Array.from(Array(2).keys()) },
		});
	});
});

describe('emailConfirmation', () => {
	const emailConfirmationEndpoint = /auth\/resend-confirmation-email(.*)/;
	const returnedData = {
		success: true,
	};

	it('confirms email succesfully', async () => {
		fetchMock.postOnce(emailConfirmationEndpoint, returnedData, 200);
		const response = await emailConfirmation(email);
		expect(response).toEqual(returnedData);
		expect(fetchMock).toHaveFetched(emailConfirmationEndpoint, {
			method: 'POST',
			body: { email, scope },
		});
	});
});

describe('resetPassword', () => {
	test('request password works', async () => {
		const endpoint = `${baseUrl}/auth/forgot-password?email=${encodeURIComponent(
			email,
		)}&scope=web`;

		fetchMock.get(endpoint, { success: true });
		const response = await requestPasswordReset(email);

		expect(response.success).toEqual(true);
		expect(fetchMock).toHaveFetched(endpoint, {
			method: 'GET',
		});
	});

	test('request password returns false if response is not succesfull', async () => {
		const wrongMail = 'wrong@mail';

		const endpoint = `${baseUrl}/auth/forgot-password?email=${encodeURIComponent(
			wrongMail,
		)}&scope=web`;

		fetchMock.get(endpoint, {}, 401);
		const response = await requestPasswordReset(wrongMail);

		expect(response.success).toBeFalsy();
		expect(fetchMock).toHaveFetched(endpoint, {
			method: 'GET',
		});
	});

	test('reset password works', async () => {
		const endpoint = `${baseUrl}/auth/reset-password`;
		const fakeToken = '123';

		fetchMock.post(endpoint, { success: true });
		const response = await resetPassword(fakeToken, password);

		expect(response.success).toEqual(true);
		expect(fetchMock).toHaveFetched(endpoint, {
			method: 'POST',
		});
	});

	test('reset password returns false if not password is provided', async () => {
		const endpoint = `${baseUrl}/auth/reset-password`;

		const fakeToken = '123';

		const response = await resetPassword(fakeToken, '');

		expect(response.success).toBeFalsy();
		expect(fetchMock).not.toHaveFetched(endpoint);
	});
});
