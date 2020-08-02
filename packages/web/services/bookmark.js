import { apiPost, apiGet, apitDelete } from './api';

/**
 * Fetches bookmarks.
 *
 * @param {object} params Optional params.
 * @param {boolean} [params.embed] Response with embed.
 * @param {string|number} [params.term] Filter bookmarks by term id or slug.
 * @param {string|number} [params.taxonomy] Filter bookmarks by taxonomy id or slug.
 * @param {number} [params.perPage] Items per page.
 * @param {string} [params.orderby] Order items by a column.
 * @param userId
 * @param {('ASC'|'DESC')} [params.order] Order.
 * @returns {Array} The bookmarks.
 */
export const getBookmarks = async (userId, params = {}) => {
	return apiGet(`/user/${userId}/bookmarks`, params)
		.then((response) => response.data)
		.catch(() => false);
};

/**
 * Creates a new bookmark with the provided data.
 *
 * @param {number} technologyId Optional params.
 * @param {string} userToken The JWT token
 * @returns {object} The newly bookmark.
 */
export const createBookmark = async (technologyId, userToken) => {
	return apiPost('bookmarks', {
		userToken,
		technologyId,
	})
		.then((response) => response.data)
		.catch(() => false);
};

/**
 * Create or delete an user bookmark.
 *
 * @param {object} params Data params
 * @param {boolean} params.active Current bookmark state
 * @param {number} params.technologyId Optional params.
 * @param {string} params.userToken The JWT token
 * @param {number} params.userId The JWT token
 *
 * @returns {object} The newly bookmark.
 */
export const handleBookmark = async ({ active = true, technologyId, userToken, userId }) => {
	let method;
	let endpoint;

	if (active) {
		method = apitDelete;
		endpoint = `user/${userId}/bookmarks`;
	} else {
		method = apiPost;
		endpoint = `bookmarks`;
	}

	return method(endpoint, {
		userToken,
		technologyIds: [technologyId],
	})
		.then((response) => response.data)
		.catch(() => false);
};
