import fetchMock from 'fetch-mock-jest';
import { apiFetch, apiGet, baseUrl, apiPost, apiPut, apitDelete } from '../api';
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
		let result = await apiFetch('test', 'GET');
		expect(result).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		result = await apiFetch('test', 'POST');
		expect(result).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, 'POST');

		result = await apiFetch('test', 'PUT');
		expect(result).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, 'PUT');

		result = await apiFetch('test', 'DELETE');
		expect(result).toEqual(testReturnData);
		expect(fetchMock).toHaveFetched(testEndpoint, 'DELETE');

		// if not returning as json, it should be equal to the raw response
		result = await apiFetch('test', 'GET', { json: false });
		expect(result).not.toEqual(testReturnData);
		const jsonResult = await result.json();
		expect(jsonResult).toEqual(testReturnData);

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
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

		await apitDelete('testdelete');

		expect(fetchMock).toHaveFetched(testEndpoint, {
			method: 'DELETE',
		});
	});
});
