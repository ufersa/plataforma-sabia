/* eslint-disable import/prefer-default-export */
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
 * Creates a new service
 *
 * @param {object} serviceData Service needed data to create
 * @returns {object} Created service
 */
export const createService = async (serviceData) => {
	if (!serviceData) return false;

	const response = await apiPost('services', { ...serviceData });

	if (response.status !== 200) return false;

	return response.data;
};
