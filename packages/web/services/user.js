/* eslint-disable import/prefer-default-export */
import { apiGet } from './api';

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
