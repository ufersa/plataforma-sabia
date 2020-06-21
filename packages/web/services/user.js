/* eslint-disable import/prefer-default-export */
import jwt_decode from 'jwt-decode';
import { apiGet } from './api';

/**
 * Fetches technologies of a given user.
 *
 * @param {string} token The token of the authenticated user
 * @param {object} options Optional params.
 */
export const getUserTechnologies = async (token, options = { embed: true }) => {
	let payload;

	try {
		payload = jwt_decode(token);
	} catch (e) {
		return false;
	}

	if (!payload?.uid) {
		return false;
	}

	const response = await apiGet(`users/${payload.uid}`, { embed: options.embed }, { token });

	if (response.status !== 200) {
		return false;
	}

	const { data } = response;

	return data.technologies;
};
