import { apiGet, apiPost } from './api';
import { HEADER as apiHeaderEnum } from '../utils/enums/api.enum';

/**
 * Fetches institutions.
 *
 * @param {{}} options Optional params
 * @returns {Array} The institutions.
 */
export const getInstitutions = async (options = {}) => {
	const response = await apiGet('institutions', { ...options });

	const { data, headers } = response;

	const totalPages = Number(headers.get(apiHeaderEnum.TOTAL_PAGES) || 0);
	const totalItems = Number(headers.get(apiHeaderEnum.TOTAL_ITEMS) || 0);

	return { data, totalPages, totalItems };
};

/**
 * Fetches an institution.
 *
 * @param {number|string} id The id or initials of the institution to retrieve.
 */
export const getInstitution = async (id) => {
	const response = await apiGet(`institutions/${id}`);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

/**
 * Creates a new institutions with the provided data.
 *
 * @param {object} payload Institution data.
 * @returns {object} The newly institution.
 */
export const createInstitutions = async (payload) => {
	const response = await apiPost('institutions', payload);

	const { data, status } = response;
	return { data, status };
};
