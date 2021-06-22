import { apiDelete, apiPost } from './api';

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

/**
 * Deletes a location
 *
 * @param {string|number} id The location id
 * @returns {object} Success or not
 */
export const deleteLocation = async (id) => {
	if (!id) {
		throw new Error('Missing parameter `id` at updateTechnologyLocations.');
	}

	const response = await apiDelete(`locations/${id}`);

	if (response.status !== 200) {
		return { error: true, messages: response.data?.error?.message || [] };
	}

	return response.data;
};
