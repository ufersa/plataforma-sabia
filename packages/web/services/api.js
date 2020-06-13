import 'isomorphic-fetch';
import { getCookie } from '../utils/helper';

export const baseUrl = process.env.API_URL || 'http://localhost:3000';

/**
 * fetch method
 *
 * @typedef {('GET'|'POST'|'PUT'|'DELETE')} HTTPMethod
 */

/**
 * Makes an requeset to the specified endpoint.
 *
 * @param {string} endpoint The API endpoint to make the request to.
 * @param {HTTPMethod} method The HTTP method.
 * @param {object} options The data object to send along with the request
 * @param {boolean} asJson Whether or not return as JSON. Defaults to true.
 * @returns {Promise<object>}
 */
export const apiFetch = (endpoint, method = 'GET', options = {}) => {
	const fetchOptions = { ...options };
	const token = fetchOptions.token || getCookie('token');
	const Authorization = token ? `Bearer ${token}` : '';

	delete fetchOptions.token;
	delete fetchOptions.json;

	return fetch(`${baseUrl}/${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization,
		},
		referrerPolicy: 'no-referrer',
		cache: 'no-cache',
		...fetchOptions,
	}).then((response) => (options.json === false ? response : response.json()));
};

/**
 * Performs a GET Request to the specified endpoint.
 *
 * @param {string} endpoint The API endpoint to make the request to.
 * @param {object} data Optional data object to append to the fetch request as query params.
 * @param {object} options The data object to send along with the request
 * @param {boolean} asJson Whether or not return as JSON. Defaults to true.
 * @returns {Promise<object>}
 */
export const apiGet = (endpoint, data = {}, options = {}) => {
	let getEndpoint = endpoint;
	const queryParams = [];

	Object.keys(data).forEach((key) => {
		queryParams.push(`${key}=${encodeURIComponent(data[key])}`);
	});

	if (queryParams.length > 0) {
		getEndpoint = `${getEndpoint}?${queryParams.join('&')}`;
	}

	return apiFetch(getEndpoint, 'GET', options);
};

/**
 * Performs a POST request to the specified endpoint.
 *
 * @param {string} endpoint The API endpoint to make the request to.
 * @param {object} data Optional data object to append to the fetch request as query params.
 * @param {object} options The data object to send along with the request
 * @param asJson
 * @returns {Promise<object>}
 */
export const apiPost = (endpoint, data = {}, options = {}) => {
	return apiFetch(endpoint, 'POST', {
		body: JSON.stringify(data),
		...options,
	});
};

/**
 * Performs a PUT request to the specified endpoint.
 *
 * @param {string} endpoint The API endpoint to make the request to.
 * @param {object} data Optional data object to append to the fetch request as query params.
 * @param {object} options The data object to send along with the request
 * @returns {Promise<object>}
 */
export const apiPut = (endpoint, data = {}, options = {}) => {
	return apiFetch(endpoint, 'PUT', {
		body: JSON.stringify(data),
		...options,
	});
};

/**
 * Performs a DELETE request to the specified endpoint.
 *
 * @param {string} endpoint The API endpoint to make the request to.
 * @param {object} options The data object to send along with the request
 * @returns {Promise<object>}
 */
export const apitDelete = (endpoint, options = {}) => {
	return apiFetch(endpoint, 'DELETE', options);
};
