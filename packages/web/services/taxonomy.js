import { apiGet } from './api';

/**
 * Fetches taxonomies.
 *
 * @param {object} options Optional options.
 *
 * @returns {object[]}
 */
export const getTaxonomies = async (options = { embed: false, parent: false, normalize: true }) => {
	const endpoint = 'taxonomies';

	const response = await apiGet(endpoint, {
		embed: options.embed,
		parent: options.parent === false ? 0 : options.parent,
	});

	if (response.status !== 200) {
		return false;
	}

	const { data } = response;

	if (options.normalize !== true) {
		return data;
	}

	const taxonomies = {};
	data.forEach(({ taxonomy, ...fields }) => {
		taxonomies[taxonomy.toLowerCase()] = fields;
	});

	return taxonomies;
};

/**
 * Fetches terms of a given taxonomy.
 *
 * @param {string} taxonomy The taxonomy to returns the terms for
 * @param {object} options Optional options.
 *
 * @returns {object[]}
 */
export const getTaxonomyTerms = async (
	taxonomy,
	options = { embed: false, parent: false, normalize: true },
) => {
	const endpoint = `taxonomies/${taxonomy}/terms`;

	const response = await apiGet(endpoint, {
		embed: options.embed,
		parent: options.parent === false ? 0 : options.parent,
	});

	if (response.status !== 200) {
		return false;
	}

	const { data } = response;

	if (!options.normalize) {
		return data;
	}

	const terms = {};
	data.forEach(({ slug, ...fields }) => {
		terms[slug.toLowerCase()] = fields;
	});

	return terms;
};
