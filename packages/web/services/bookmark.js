import { apiPost, apiGet } from './api';

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
 * Prepares terms coming from the bookmark form for submission
 *
 * @param {*} termsObject The array of terms.
 *
 * @returns {Array}
 */
export const prepareTerms = (termsObject) => {
	const terms = [];

	const termKeys = Object.keys(termsObject);
	termKeys.forEach((termKey) => {
		const term = termsObject[termKey];

		if (Array.isArray(term)) {
			const ids = term.map((t) => t.value);
			terms.push(...ids);
		} else {
			terms.push(term.value);
		}
	});

	return terms;
};

/**
 * Normalizes the term for the technolgoy form.
 *
 * @param {object} terms The raw terms coming from the api.
 *
 * @returns {object} normalized terms.
 */
export const normalizeTerms = (terms) => {
	const normalizedTerms = {};
	const normalizedTermsObject = {};

	// unique taxonomies
	let taxonomies = terms.map(({ taxonomy }) => taxonomy);
	taxonomies = Array.from(new Set(terms.map(({ taxonomy }) => taxonomy.id))).map((id) =>
		taxonomies.find((taxonomy) => taxonomy.id === id),
	);

	taxonomies.forEach((taxonomy) => {
		normalizedTerms[taxonomy.taxonomy.toLowerCase()] = [];
		normalizedTermsObject[taxonomy.taxonomy.toLowerCase()] = [];
	});

	terms.forEach((term) => {
		const taxonomy = term.taxonomy.taxonomy.toLowerCase();
		normalizedTerms[taxonomy].push(term.id);
		normalizedTermsObject[taxonomy].push(term);
	});

	if (normalizedTerms.category) {
		normalizedTerms.subcategory = normalizedTermsObject.category
			.filter((category) => category.parent_id > 0)
			.map((category) => category.id);

		normalizedTerms.category = normalizedTermsObject.category
			.filter((category) => !category.parent_id)
			.map((category) => category.id);
	}

	return normalizedTerms;
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
