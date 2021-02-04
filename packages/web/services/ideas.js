/* eslint-disable import/prefer-default-export */
import { apiPost } from './api';

/**
 * Creates an idea.
 *
 * @param {string} title The title of the idea
 * @param {string} description The description of the idea
 * @param {Array} keywords The keywords of the idea
 * @returns {object} The newly created idea
 */
export const createIdea = async (title, description, keywords = []) => {
	const { data, status } = await apiPost(`ideas`, { title, description, keywords });

	return status !== 200 ? { data: data?.error, success: false } : { data, success: true };
};
