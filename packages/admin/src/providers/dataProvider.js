import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

export const apiUrl = window.env.REACT_APP_API_URL;

export const httpClient = (url, options = {}) => {
	const token = localStorage.getItem('token');
	const locale = localStorage.getItem('locale');
	const headers = new Headers({
		'Accept-Language': locale,
		Authorization: token,
		...options?.headers,
	});

	return fetchUtils.fetchJson(url, { ...options, headers });
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
				data: json.map((item) => ({
					...item,
					id: item?.id || item?.knowledge_area_id,
				})),
				total: parseInt(headers.get('X-Sabia-Total'), 10),
			};
		});
	},

	getOne: (resource, params) => {
		return httpClient(`${apiUrl}/${resource}/${params.id}?${stringify(params.query)}`).then(
			({ json }) => {
				return {
					data: {
						...json,
						id: json?.id || json?.knowledge_area_id,
					},
				};
			},
		);
	},
	getMany: (resource, params) => {
		const query = params.ids;
		const url = `${apiUrl}/${resource}?perPage=999&ids=${query}`;
		return httpClient(url).then(({ json }) => {
			return { data: json };
		});
	},

	update: (resource, params) => {
		const { data } = params;
		const feature = data.feature ? `/${data.feature}` : '';
		return httpClient(`${apiUrl}/${resource}/${params.id}${feature}`, {
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
	upload: (resource, params) => {
		const { data } = params;
		const { meta = false, files } = data;

		const formData = new FormData();

		files.forEach((file, index) => {
			return formData.append(`files[${index}]`, file);
		});

		if (meta) {
			formData.append('meta', JSON.stringify(meta));
		}

		return httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: formData,
		}).then(({ json }) => ({
			data: { ...json, id: json[0].object_id },
		}));
	},
};
