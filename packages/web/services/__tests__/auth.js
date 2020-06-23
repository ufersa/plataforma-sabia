import fetchMock from 'fetch-mock-jest';
import { baseUrl } from '../api';
import { getCookie, setCookie } from '../../utils/helper';
import { login, requestPasswordReset, resetPassword } from '../auth';

afterEach(() => {
	fetchMock.mockClear();
	fetchMock.mockReset();
});

describe('auth', () => {
	const loginEndpoint = `${baseUrl}/auth/login`;
	const loginReturnedData = {
		token: 'my-fake-token',
	};
	const email = 'fakeuser@gmail.com';
	const password = 'fakepass';

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

	test('request password returns true', async () => {
		const endpoint = `${baseUrl}/auth/forgot-password?email=${encodeURIComponent(
			email,
		)}&scope=web`;

		fetchMock.get(endpoint, { success: true });
		const response = await requestPasswordReset(email);

		expect(response).toEqual(true);
		expect(fetchMock).toHaveFetched(endpoint, {
			method: 'GET',
		});
	});

	test('request password returns false', async () => {
		const wrongMail = 'wrong@mail';

		const endpoint = `${baseUrl}/auth/forgot-password?email=${encodeURIComponent(
			wrongMail,
		)}&scope=web`;

		fetchMock.get(endpoint, { status: 400 });
		const response = await requestPasswordReset(wrongMail);

		expect(response).toBeFalsy();
		expect(fetchMock).toHaveFetched(endpoint, {
			method: 'GET',
		});
	});

	test('reset password returns true', async () => {
		const endpoint = `${baseUrl}/auth/reset-password`;
		const fakeToken = '123';

		fetchMock.post(endpoint, { success: true });
		const response = await resetPassword(fakeToken, email);

		expect(response).toEqual(true);
		expect(fetchMock).toHaveFetched(endpoint, {
			method: 'POST',
		});
	});

	test('reset password returns false', async () => {
		const endpoint = `${baseUrl}/auth/reset-password`;

		const wrongMail = 'wrong@mail';
		const fakeToken = '123';

		fetchMock.post(endpoint, { status: 400 });
		const response = await resetPassword(fakeToken, wrongMail);

		expect(response).toBeFalsy();
		expect(fetchMock).toHaveFetched(endpoint, {
			method: 'POST',
		});
	});
});
