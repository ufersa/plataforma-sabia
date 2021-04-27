import 'isomorphic-fetch';
import { i18n } from 'next-i18next';
import { getCookie } from '../utils/helper';
import config from '../config';

export const baseUrl = config.API_URL;

let globalToken = null;

/**
 * Define a global token for requests.
 * This is being used to store a global token provided by the server side.
 *
 * @param {string} token The token to be defined.
 * @returns {void}
 */
export const setGlobalToken = (token) => {
	globalToken = token;
};

/**
 * fetch method
 *
 * @typedef {('GET'|'POST'|'PUT'|'DELETE')} HTTPMethod
 */

/**
 * Makes an request to the specified endpoint.
 *
 * @param {string} endpoint The API endpoint to make the request to.
 * @param {HTTPMethod} method The HTTP method.
 * @param {object} options The data object to send along with the request
 * @returns {Promise<object>}
 */
export const apiFetch = async (endpoint, method = 'GET', options = {}) => {
	const currentLanguage = i18n.language;
	const token = options.token || getCookie('token') || globalToken;
	const Authorization = token ? `Bearer ${token}` : '';
	const headers = {
		'Accept-Language': currentLanguage,
		Authorization,
		...(!options.isAttachmentUpload && {
			'Content-Type': 'application/json',
		}),
	};
	delete options.isAttachmentUpload;
	const fetchOptions = { ...options };

	delete fetchOptions.token;

	const response = await fetch(`${baseUrl}/${endpoint}`, {
		method,
		headers,
		referrerPolicy: 'no-referrer',
		cache: 'no-cache',
		...fetchOptions,
	});

	const contentType = response.headers.get('content-type');
	if (contentType && contentType.indexOf('application/json') !== -1) {
		response.data = await response.json();
	}

	return response;
};

/**
 * Performs a GET Request to the specified endpoint.
 *
 * @param {string} endpoint The API endpoint to make the request to.
 * @param {object} data Optional data object to append to the fetch request as query params.
 * @param {object} options The data object to send along with the request
 * @returns {Promise<object>}
 */
export const apiGet = (endpoint, data = {}, options = {}) => {
	let getEndpoint = endpoint;
	const queryParams = [];

	Object.keys(data).forEach((key) => {
		if (typeof data[key] !== 'undefined' && typeof data[key] !== 'boolean') {
			queryParams.push(`${key}=${encodeURIComponent(data[key])}`);
		} else if (data[key]) {
			queryParams.push(key);
		}
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
 * @returns {Promise<object>}
 */
export const apiPost = (endpoint, data = {}, options = {}) => {
	return apiFetch(endpoint, 'POST', {
		body: options.isAttachmentUpload ? data : JSON.stringify(data),
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
 * @param {object} data Optional data object to append to the fetch request as query params.
 * @param {object} options The data object to send along with the request
 * @returns {Promise<object>}
 */
export const apiDelete = (endpoint, data = {}, options = {}) => {
	return apiFetch(endpoint, 'DELETE', {
		body: JSON.stringify(data),
		...options,
	});
};
