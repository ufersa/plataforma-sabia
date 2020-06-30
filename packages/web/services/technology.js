import { apiPost, apiPut, apiGet } from './api';

/**
 * Normalizes terms coming from the technology form
 *
 * @param {*} termsObject The array of terms.
 *
 * @returns {Array}
 */
export const normalizeTerms = (termsObject) => {
	const terms = [];

	const termKeys = Object.keys(termsObject);
	termKeys.forEach((termKey) => {
		const term = termsObject[termKey];

		if (Array.isArray(term)) {
			const ids = term.map((t) => t.value);
			terms.push(...ids);
		} else {
			terms.push(term.value);
		}
	});

	return terms;
};

/**
 * Creates a new technology with the provided data.
 *
 * @param {object} data Technology data.
 *
 * @returns {object} The newly technology.
 */
export const createTechnology = async (data) => {
	const terms = normalizeTerms(data.terms || {});
	const response = await apiPost('technologies', {
		...data,
		terms,
	});

	if (response.status !== 200) {
		return false;
	}

	return response.data;
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
	if (!id) {
		return false;
	}

	const terms = data.terms ? normalizeTerms(data.terms) : false;
	const response = await apiPut(`technologies/${id}`, { ...data, terms });

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * Fetches technologies.
 *
 * @param {object} params Optional params.
 *
 * @returns {Array} The technologies.
 */
export const getTechnologies = async (params = {}) => {
	const response = await apiGet('technologies', {
		...params,
	});

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * Fetches a technology.
 *
 * @param {number} id The id of the technology to retrieve
 * @param {object} options Optional params.
 */
export const getTechnology = async (id, options = {}) => {
	const response = await apiGet(`technologies/${id}`, {
		embed: options.embed || true,
	});

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};
