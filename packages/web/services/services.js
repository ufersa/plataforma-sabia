/* eslint-disable import/prefer-default-export */
import { apiGet } from './api';

/**
 * GETs all services
 *
 * @param {object} options Optional params sent in the request
 * @returns {Array} The services ata
 */
export const getServices = async (options = {}) => {
	const response = await apiGet('services', { embed: true, ...options });

	if (response.status !== 200) {
		return [];
	}

	return response.data;
};
