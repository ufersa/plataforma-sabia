import { apiPost, apiPut, apiGet } from './api';
import {
	normalizeCosts,
	normalizeTaxonomies,
	normalizeTerms,
	normalizeAttachments,
	prepareCosts,
	prepareTerms,
} from '../utils/technology';
import { HEADER as apiHeaderEnum } from '../utils/enums/api.enum';

/**
 * Fetches technologies.
 *
 * @param {number} id Technology id
 * @returns {Array} The terms.
 */
export const getTechnologyTerms = async (id) => {
	const response = await apiGet(`technologies/${id}/terms?embed`);
	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * Creates a new technology with the provided data.
 *
 * @param {object} data Technology data.
 * @param {object} options Optional params.
 * @returns {object} The newly technology.
 */
export const createTechnology = async (data, options = {}) => {
	const terms = prepareTerms(data.terms || {});
	const response = await apiPost('technologies', {
		...data,
		terms,
	});

	if (response.status !== 200) {
		return false;
	}

	if (options.normalize && response.data.terms) {
		response.data.terms = normalizeTerms(response.data.terms);
	}

	return response.data;
};

/**
 * Updates an existing technology.
 *
 * @param {number} id The id of the technology to update
 * @param {object} data The Technology data.
 * @param {object} options Optional params.
 * @returns {object} The updated technology.
 */
export const updateTechnology = async (id, data, options = {}) => {
	if (!id) {
		return false;
	}

	const terms = data.terms ? prepareTerms(data.terms) : false;
	const response = await apiPut(`technologies/${id}`, { ...data, terms });

	if (response.status !== 200) {
		return false;
	}

	if (options.normalize && response.data.terms) {
		response.data.terms = normalizeTerms(response.data.terms);
	}

	return response.data;
};

/**
 * Updates technology curation status
 *
 * @param {number} id The id of the technology to update
 * @param {object} options The description and assessment params.
 * @returns {object} The updated technology.
 */
export const updateTechnologyCurationStatus = async (id, { description, assessment } = {}) => {
	if (!id || !assessment) return false;

	const response = await apiPost(`revisions/${id}`, { description, assessment });

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * Fetches technologies.
 *
 * @param {object} params Optional params.
 * @param {boolean} [params.embed] Response with embed.
 * @param {string|number} [params.term] Filter technologies by term id or slug.
 * @param {string|number} [params.taxonomy] Filter technologies by taxonomy id or slug.
 * @param {number} [params.perPage] Items per page.
 * @param {string} [params.orderby] Order items by a column.
 * @param {('ASC'|'DESC')} [params.order] Order.
 *
 * @returns {Array} The technologies.
 */
export const getTechnologies = async (params = {}) => {
	const response = await apiGet('technologies', params);

	if (response.status !== 200) {
		return [];
	}

	return response.data;
};

/**
 * Fetches technologies to curate
 *
 * @param {object} options Optional params
 * @param {boolean} [options.embed] Response with embed.
 * @returns {Array} The technologies.
 */
export const getTechnologiesToCurate = async (options = { embed: true }) => {
	const response = await apiGet('reviewer/technologies', { ...options });

	if (response.status !== 200) return [];

	const { data, headers } = response;

	const totalPages = Number(headers.get(apiHeaderEnum.TOTAL_PAGES) || 0);
	const totalItems = Number(headers.get(apiHeaderEnum.TOTAL_ITEMS) || 0);

	return { technologies: data, totalPages, totalItems };
};

/**
 * Fetches revisions for a given technology
 *
 * @param {number} id The technology id
 * @param {object} options Optional params
 * @param {boolean} [options.embed] Response with embed.
 * @returns {Array} The technology revisions data.
 */
export const getTechnologyRevisions = async (id, options = { embed: true }) => {
	const response = await apiGet(`revisions/${id}`, { ...options });

	if (response.status !== 200 || !id) return [];

	const { data, headers } = response;

	const totalPages = Number(headers.get(apiHeaderEnum.TOTAL_PAGES));
	const totalItems = Number(headers.get(apiHeaderEnum.TOTAL_ITEMS));

	return { technologies: data, totalPages, totalItems };
};

/**
 * Fetches a technology.
 *
 * @param {number|string} id The id or slug of the technology to retrieve.
 * @param {object} options Optional params.
 * @param {boolean} [options.embed=true] Response with embed.
 * @param {string|number} [options.term] Filter term by id or slug.
 * @param {string|number} [options.taxonomy] Filter taxonomy by id or slug.
 */
export const getTechnology = async (id, options = {}) => {
	const response = await apiGet(`technologies/${id}`, {
		embed: options.embed || true,
	});

	if (response.status !== 200) {
		return false;
	}

	if (options.normalizeTaxonomies && response?.data?.terms) {
		response.data.taxonomies = normalizeTaxonomies(response.data.terms);
	}

	if (options.normalize && response?.data?.terms) {
		response.data.terms = normalizeTerms(response.data.terms);
	}

	return response.data;
};

/**
 * Fetches technologies.
 *
 * @param {number} id The id of the technology to retrieve costs from
 * @param {object} options Optional params.
 * @param {boolean} options.normalize Whether to normalize data to match the shape expected by the technology form.
 * @returns {Array} Technology costs.
 */
export const getTechnologyCosts = async (id, options = {}) => {
	const response = await apiGet(`technologies/${id}/costs`);

	if (response.status !== 200) {
		return false;
	}

	if (!options.normalize) {
		return response.data;
	}

	const { costs } = response.data;

	return {
		...response.data,
		costs: normalizeCosts(costs),
	};
};

/**
 * Updates technology costs.
 *
 * @param {number} id The id of the technology to update
 * @param {object} data The technology coss data.
 * @param {object} options Optional params.
 * @param {boolean} options.normalize Whether to normalize data to match the shape expected by the technology form.
 * @returns {object} The updated technology costs
 */
export const updateTechnologyCosts = async (id, data, options = {}) => {
	if (!id) {
		return false;
	}

	const response = await apiPut(`technologies/${id}/costs`, prepareCosts(data));

	if (response.status !== 200) {
		return false;
	}

	if (!options.normalize) {
		return response.data;
	}

	const { costs } = response.data;

	return {
		...response.data,
		costs: normalizeCosts(costs),
	};
};

/**
 * Updates technology responsibles.
 *
 * @param {number} id The id of the technology to update
 * @param {object} data The technology responsibles data.
 * @returns {object} The updated technology responsibles
 */
export const updateTechnologyResponsibles = async (id, data) => {
	if (!id) {
		return false;
	}

	const response = await apiPost(`technologies/${id}/users`, data);

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * fetch technology attachments.
 *
 * @param {number} id The id of the tecnology to fetch the attachments
 * @param {object} options Optional params.
 * @returns {Array} The updated technology responsibles
 */
export const getAttachments = async (id, options = {}) => {
	if (!id) {
		return [];
	}

	const response = await apiGet('uploads', {
		object: 'technologies',
		object_id: id,
	});

	if (response.status !== 200) {
		return [];
	}

	if (options.normalize && response.data) {
		response.data = normalizeAttachments(response.data);
	}

	return response.data;
};

/**
 * Fetch technology reviews.
 *
 * @param {string|number} id Technology id.
 * @param {object} params Optional params.
 * @param {('created_at'|'rating')} [params.orderBy='created_at'] Order items by a column.
 * @param {('ASC'|'DESC')} [params.order='ASC'] Order.
 *
 * @returns {Array} The current technology reviews
 */
export const getReviews = async (id, params = { orderBy: 'created_at', order: 'DESC' }) => {
	if (!id) {
		return [];
	}

	const response = await apiGet(`technologies/${id}/reviews`, params);

	if (response.status !== 200) {
		return [];
	}

	return response.data;
};

/**
 * Creates a new technology review with the provided data.
 *
 * @param {object} data Technology data.
 * @param {number} data.technologyId Technology id.
 * @param {string} data.content Review content.
 * @param {number} data.rating Review rating.
 * @param {string[]} data.positive Review positive points.
 * @param {string[]} data.negative Review negative points.
 * @returns {object} The newly technology review.
 */
export const createTechnologyReview = async (data) => {
	const response = await apiPost('reviews', data);

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};
