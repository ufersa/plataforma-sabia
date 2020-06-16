import { apiPost, apiPut } from './api';

/**
 * Creates a new technology with the provided data.
 *
 * @param {object} data Technology data.
 *
 * @returns {object} The newly technology.
 */
export const createTechnology = async (data) => {
	try {
		const response = await apiPost('technologies', data);

		if (response.status !== 200) {
			return false;
		}

		return response.data;
	} catch (exception) {
		return false;
	}
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
	try {
		console.log('updatingTechonlogy');
		const response = await apiPut(`technologies/${id}`, data);
		console.log(response);
		if (response.status !== 200) {
			return false;
		}

		return response.data;
	} catch (exception) {
		console.log(exception);
		return false;
	}
};
