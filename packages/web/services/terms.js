/* eslint-disable import/prefer-default-export */
import { apiPost } from './api';

/**
 * Create terms
 *
 * @param terms
 * @returns {Promise<{}>} A promise that resolves with the response
 */
export async function create(terms) {
	const response = await apiPost('terms', terms);

	return response.data;
}
