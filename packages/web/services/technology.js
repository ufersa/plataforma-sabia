import { apiPost, apiPut, apiGet } from './api';

/**
 * Normalizes terms coming from the technology form
 *
 * @param {*} termsObject The array of terms.
 *
 * @returns {Array}
 */
export const normalizeTerms = (termsObject) => {
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
 * @param {object} terms
 *
 * @returns {object} normalized terms.
 */
const normalizeForForm = (terms) => {
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

	normalizedTerms.subcategory = normalizedTermsObject.category
		.filter((category) => category.parent_id > 0)
		.map((category) => category.id);

	normalizedTerms.category = normalizedTermsObject.category
		.filter((category) => !category.parent_id)
		.map((category) => category.id);

	return normalizedTerms;
};

/**
 * Creates a new technology with the provided data.
 *
 * @param {object} data Technology data.
 *
 * @returns {object} The newly technology.
 */
export const createTechnology = async (data) => {
	const terms = normalizeTerms(data.terms || {});
	const response = await apiPost('technologies', {
		...data,
		terms,
	});

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * Updates an existing technology.
 *
 * @param {number} id The id of the tecnology to update
 * @param {object} data The Technology data.
 * @param {object} options Optional params.
 * @returns {object} The updated technology.
 */
export const updateTechnology = async (id, data, options = {}) => {
	if (!id) {
		return false;
	}

	const terms = data.terms ? normalizeTerms(data.terms) : false;
	const response = await apiPut(`technologies/${id}`, { ...data, terms });

	if (response.status !== 200) {
		return false;
	}

	if (options.normalize && response.data.terms) {
		response.data.terms = normalizeForForm(response.data.terms);
	}

	return response.data;
};

/**
 * Fetches technologies.
 *
 * @param {object} params Optional params.
 * @param {boolean} [params.embed] Response with embed.
 * @param {string|number} [params.term] Filter technologies by term id or slug.
 * @param {string|number} [params.taxonomy] Filter technologies by taxonomy id or slug.
 * @param {number} [params.perPage] Items per page.
 * @param {string} [params.orderby] Order items by a column.
 * @param {('ASC'|'DESC')} [params.order] Order.
 *
 * @returns {Array} The technologies.
 */
export const getTechnologies = async (params = {}) => {
	const response = await apiGet('technologies', params);

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};

/**
 * Fetches a technology.
 *
 * @param {number} id The id of the technology to retrieve
 * @param {object} options Optional params.
 */
export const getTechnology = async (id, options = {}) => {
	const response = await apiGet(`technologies/${id}`, {
		embed: options.embed || true,
	});

	if (response.status !== 200) {
		return false;
	}

	if (options.normalize && response.data.terms) {
		response.data.terms = normalizeForForm(response.data.terms);
	}

	return response.data;
};

/**
 * Fetches technologies.
 *
 * @param {number} id The id of the technology to retrieve costs from
 * @param {object} options Optional params.
 * @param {boolean} options.normalize Whether to normalize data to match the shape expected by the technology form.
 * @returns {Array} Technology costs.
 */
export const getTechnologyCosts = async (id, options = {}) => {
	const response = await apiGet(`technologies/${id}/costs`);

	if (response.status !== 200) {
		return false;
	}

	if (!options.normalize) {
		return response.data;
	}

	const { costs } = response.data;
	const normalizedCosts = {};

	costs.forEach((cost) => {
		const { cost_type, ...rest } = cost;

		if (!normalizedCosts[cost_type]) {
			normalizedCosts[cost_type] = [];
		}

		normalizedCosts[cost_type].push(rest);
	});

	return {
		...response.data,
		costs: normalizedCosts,
	};
};

/**
 * Normalizes costs data.
 *
 * @param {object} costsData The unormalized costs coming from the technology form.
 *
 * @returns {object}
 */
const normalizeCostsData = (costsData) => {
	const keys = Object.keys(costsData);

	const normalizedCosts = {};

	keys.forEach((key) => {
		const rawData = costsData[key];
		let normalizedData = rawData;

		if (normalizedData?.value) {
			normalizedData = normalizedData.value;
		}

		normalizedCosts[key] = normalizedData;
	});

	const groups = ['development_costs', 'implementation_costs', 'maintenance_costs'];

	const individualCosts = [];

	groups.forEach((group) => {
		const groupData = normalizedCosts[group];

		if (groupData) {
			groupData.forEach((individualCost) => {
				individualCost.type = individualCost.type.value;
				individualCosts.push({
					cost_type: group,
					...individualCost,
				});
			});

			delete normalizedCosts[group];
		}
	});

	normalizedCosts.costs = individualCosts;

	return normalizedCosts;
};

/**
 * Updates technology costs.
 *
 * @param {number} id The id of the tecnology to update
 * @param {object} data The technology coss data.
 *
 * @returns {object} The updated technology costs
 */
export const updateTechnologyCosts = async (id, data) => {
	if (!id) {
		return false;
	}

	const response = await apiPut(`technologies/${id}/costs`, { ...normalizeCostsData(data) });

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};
