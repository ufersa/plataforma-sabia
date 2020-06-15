import fetchMock from 'fetch-mock-jest';
import { baseUrl } from '../api';
import { getCookie, setCookie } from '../../utils/helper';
import { login } from '../auth';

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
});
