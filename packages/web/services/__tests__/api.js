import fetchMock from 'fetch-mock-jest';
import { apiFetch, apiGet, baseUrl, apiPost, apiPut, apiDelete } from '../api';
import { setCookie } from '../../utils/helper';

describe('apiFetch', () => {
	const testEndpoint = `${baseUrl}/test`;
	const testReturnData = {
		testData: 1,
		testData2: 2,
	};
	fetchMock.get(testEndpoint, testReturnData);
	fetchMock.post(testEndpoint, testReturnData);
	fetchMock.put(testEndpoint, testReturnData);
	fetchMock.delete(testEndpoint, testReturnData);

	it('should be able to make all HTTP requests', async () => {
		let response = await apiFetch('test', 'GET');
		expect(response.data).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		response = await apiFetch('test', 'POST');
		expect(response.data).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, 'POST');

		response = await apiFetch('test', 'PUT');
		expect(response.data).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, 'PUT');

		response = await apiFetch('test', 'DELETE');
		expect(response.data).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, 'DELETE');
	});

	it('should send authorization header if token is present', async () => {
		setCookie('token', 'my-token');
		await apiFetch('test', 'GET');

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'GET',
			headers: {
				Authorization: `Bearer my-token`,
			},
		});

		setCookie('token', '');
		await apiFetch('test', 'GET');

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'GET',
			headers: {
				Authorization: '',
			},
		});
	});
});

describe('apiGet', () => {
	it('should append query params', async () => {
		const testEndpoint = `${baseUrl}/testget?param1=value1&param2=value2`;

		fetchMock.get(testEndpoint, {});
		await apiGet('testget', {
			param1: 'value1',
			param2: 'value2',
		});

		expect(fetchMock).toHaveFetched(testEndpoint, 'GET');
	});
});

describe('apiPost and apiPut', () => {
	it('should send body data', async () => {
		const testEndpoint = `${baseUrl}/testpost`;
		const postData = {
			param1: 'value1',
			param2: 'value2',
		};
		fetchMock.post(testEndpoint, {});
		fetchMock.put(testEndpoint, {});
		await apiPost('testpost', postData);

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'POST',
			body: postData,
		});

		await apiPost('testpost');

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'POST',
			body: undefined,
		});

		await apiPut('testpost', postData);

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'POST',
			body: postData,
		});

		await apiPost('testpost');

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'POST',
			body: undefined,
		});
	});
});

describe('apiDelete', () => {
	it('should send a DELETE request', async () => {
		const testEndpoint = `${baseUrl}/testdelete`;
		fetchMock.delete(testEndpoint, {});

		await apiDelete('testdelete');

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'DELETE',
		});
	});
});
