import { apiPost, apiPut, apiGet } from './api';

/**
 * Creates a new technology with the provided data.
 *
 * @param {object} data Technology data.
 *
 * @returns {object} The newly technology.
 */
export const createTechnology = async (data) => {
	try {
		const terms = [];
		if (data.terms) {
			const termKeys = Object.keys(data.terms);
			termKeys.forEach((termKey) => {
				const term = data.terms[termKey];

				if (Array.isArray(term)) {
					const ids = term.map((t) => t.value);
					terms.push(...ids);
				} else {
					terms.push(term.value);
				}
			});
		}

		const response = await apiPost('technologies', {
			...data,
			terms,
		});

		if (response.status !== 200) {
			return false;
		}

		return response.data;
	} catch (exception) {
		return false;
	}
};

/**
 * Updates an existing technology.
 *
 * @param {number} id The id of the tecnology to update
 * @param {object} data The Technology data.
 *
 * @returns {object} The updated technology.
 */
export const updateTechnology = async (id, data) => {
	try {
		const response = await apiPut(`technologies/${id}`, data);
		if (response.status !== 200) {
			return false;
		}

		return response.data;
	} catch (exception) {
		return false;
	}
};

/**
 * Fetches a technology.
 *
 * @param {number} id The id of the technology to retrieve
 * @param {object} options Optinal params.
 */
export const getTechnology = async (id, options = {}) => {
	try {
		const response = await apiGet(`technologies/${id}`, {
			embed: options.embed || true,
		});

		if (response.status !== 200) {
			return false;
		}

		return response.data;
	} catch (exception) {
		return false;
	}
};
