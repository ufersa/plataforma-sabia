/* eslint-disable import/prefer-default-export */
import { apiPost, apiDelete } from './api';

/**
 * Normalize handleBookmark request
 *
 * @typedef {object} HandleBookmarkRequest
 * @property {boolean} [params.active=true] Current bookmark state
 * @property {number} params.technologyId The technology id
 * @property {number} params.userId The user id
 *
 * @param {HandleBookmarkRequest} params Bookmark params
 * @returns {object} The newly bookmark.
 */
const parseHandleBookmarkRequest = ({ active = true, technologyId, userId }) => {
	let method;
	let endpoint;

	if (active) {
		method = apiDelete;
		endpoint = `user/${userId}/bookmarks`;
	} else {
		method = apiPost;
		endpoint = 'bookmarks';
	}

	return {
		method,
		endpoint,
		technologyIds: [technologyId],
	};
};

/**
 * Create or delete an user bookmark.
 *
 * @param {HandleBookmarkRequest} params Bookmark params
 * @returns {object} The newly bookmark
 */
export const handleBookmark = async (params) => {
	const { method, endpoint, technologyIds } = parseHandleBookmarkRequest(params);

	const response = await method(endpoint, {
		technologyIds,
	});

	return response.status === 200;
};
