import { apiGet } from './api';

/**
 * GETs all blog posts
 *
 * @param {object} options Optional params sent in the request
 * @returns {Array} The blog post data
 */
/* eslint-disable import/prefer-default-export */
export const getBlogPosts = async (options = {}) => {
	const response = await apiGet('blog/posts', { embed: true, ...options });

	if (response.status !== 200) {
		return [];
	}

	return response.data;
};
