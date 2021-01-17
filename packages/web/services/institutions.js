import { apiGet, apiPost } from './api';

/**
 * Fetches institutions.
 *
 * @returns {Array} The institutions.
 */
export const getInstitutions = async () => {
	const response = await apiGet('institutions');

	const { data } = response;
	return data;
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
