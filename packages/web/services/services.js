import { apiGet, apiPost } from './api';

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

/**
 * Creates a service order
 *
 * @param {Array} servicesToCreate Array of services to create order
 * @returns {object} The services that was bought
 */
export const createServiceOrder = async (servicesToCreate) => {
	const response = await apiPost('services/orders', { services: servicesToCreate });

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};
