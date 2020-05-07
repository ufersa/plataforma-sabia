import { fetchUtils } from 'react-admin';

const apiUrl = process.env.REACT_APP_API_URL;

const httpClient = (url, options = {}) => {
	const token = localStorage.getItem('token');
	const headers = new Headers({
		'Content-Type': 'application/json',
		Authorization: token,
	});

	let upOptions = options;
	if (!options) {
		upOptions = { headers };
	} else {
		upOptions.headers = headers;
	}

	return fetchUtils.fetchJson(url, upOptions);
};

export default {
	getList: (resource) => {
		const url = `${apiUrl}/${resource}`;

		return httpClient(url).then(({ headers, json }) => ({
			headers,
			data: json,
			total: json.length,
		}));
	},

	getOne: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
			data: json,
		})),

	update: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json })),

	create: (resource, params) =>
		httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		})),

	delete: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json })),
};
