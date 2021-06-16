/* eslint-disable import/prefer-default-export */
import { apiPost } from './api';

/**
 * Creates a new location
 *
 * @param {object} data The location data
 * @returns {object} The created location
 */
export const createLocation = async (data = {}) => {
	const response = await apiPost(`locations`, { ...data });

	if (response.status !== 201 && response.status !== 200) {
		return { error: true, messages: response.data?.error?.message || [] };
	}

	return response.data;
};
