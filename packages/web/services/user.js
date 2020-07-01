/* eslint-disable import/prefer-default-export */
import { apiGet, apiPut } from './api';

/**
 * Updates the password of a logged in user.
 *
 * @param {object} data The currentPassword and the newPassword.
 *
 * @returns {object} The success message or an error object.
 */
export const updateUserPassword = async ({ currentPassword, newPassword }) => {
	const response = await apiPut(`user/change-password`, { currentPassword, newPassword });

	return response.data;
};

/**
 * Updates an existing user.
 *
 * @param {number} id The id of the user to update
 * @param {object} data The user data.
 *
 * @returns {object} The updated user.
 */
export const updateUser = async (id, data) => {
	if (!id) {
		return false;
	}

	const response = await apiPut(`users/${id}`, data);

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * Fetches technologies of a given user.
 *
 * @param {number} userId The user id.
 * @param {string} token The token of the authenticated user
 * @param {object} options Optional params.
 */
export const getUserTechnologies = async (userId, token, options = { embed: true }) => {
	const response = await apiGet(`users/${userId}`, { embed: options.embed }, { token });

	if (response.status !== 200) {
		return false;
	}

	const { data } = response;

	return data.technologies;
};
