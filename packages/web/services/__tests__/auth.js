import fetchMock from 'fetch-mock-jest';
import { baseUrl } from '../api';
import { getCookie, setCookie } from '../../utils/helper';
import { login, register, getMe, emailConfirmation, logout } from '../auth';

beforeEach(() => {
	fetchMock.mockClear();
	fetchMock.mockReset();
});

const user = {
	full_name: 'Fake User',
	email: 'fakeuser@gmail.com',
	password: 'fakepass',
	scope: 'web',
};

const { email, password, full_name, scope } = user;

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

	it('returns false if the the request fails', async () => {
		fetchMock.get(getMeEndpoint, { throws: new Error() });
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
		const response = await register(full_name, email, password);
		expect(response).toEqual(registerReturnedData);
		expect(fetchMock).toHaveFetched(registerEndpoint, {
			method: 'POST',
			body: { ...user },
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
