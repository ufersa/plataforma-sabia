/* eslint-disable import/prefer-default-export */
import { apiPost } from './api';

/**
 * Creates a technology order
 *
 * @param {string|number} id The technology ID
 * @returns {object} Order response
 */
export const buyTechnology = async (id, { quantity, use, funding, comment } = {}) => {
	if (!id || !quantity || !use || !funding) return false;

	const response = await apiPost(`technologies/${id}/orders`, {
		quantity,
		use,
		funding,
		comment,
	});

	if (response.status !== 200) return false;

	return response.data;
};
