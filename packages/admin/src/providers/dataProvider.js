import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

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
	getList: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			page,
			perPage,
			order,
			orderBy: field,
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => ({
			headers,
			data: json,
			total: parseInt(headers.get('Total'), 10),
		}));
	},

	getOne: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
			data: json,
		})),

	getMany: (resource, params) => {
		const query = {
			id: JSON.stringify({ id: params.ids }),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;
		return httpClient(url).then(({ json }) => ({ data: json }));
	},

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
