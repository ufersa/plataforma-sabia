import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = window.env.REACT_APP_API_URL;

const httpClient = (url, options = {}) => {
	const token = localStorage.getItem('token');
	const locale = localStorage.getItem('locale');
	const headers = new Headers({
		'Content-Type': 'application/json',
		'Accept-Language': locale,
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
			embed: params.embed ? '' : undefined,
			...params.filter,
		};

		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => {
			return {
				headers,
				data: json,
				total: parseInt(headers.get('X-Sabia-Total'), 10),
			};
		});
	},

	getOne: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
			return { data: json };
		}),

	getMany: (resource, params) => {
		const query = params.ids;
		const url = `${apiUrl}/${resource}?perPage=999&ids=${query}`;
		return httpClient(url).then(({ json }) => {
			return { data: json };
		});
	},

	update: (resource, params) => {
		const { data } = params;
		return httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		}).then(({ json }) => ({ data: json }));
	},

	create: (resource, params) => {
		const { data } = params;
		return httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(data),
		}).then(({ json }) => ({
			data: { ...data, id: json.id },
		}));
	},

	delete: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json })),

	deleteMany: (resource, params) => {
		const query = params.ids;
		return httpClient(`${apiUrl}/${resource}?ids=${query}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json }));
	},
};
