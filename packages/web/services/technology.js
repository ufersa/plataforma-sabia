import { apiPost, apiPut, apiGet } from './api';

/**
 * Prepares terms coming from the technology form for submission
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
		} else if (term) {
			terms.push(term.value);
		}
	});

	return terms;
};

/**
 * Normalizes the term for the technology form.
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
 * Normalizes the taxonomies for the technology details.
 *
 * @param {Array} terms The raw terms coming from the api.
 *
 * @returns {object} normalized taxonomies.
 */
export const normalizeTaxonomies = (terms) => {
	if (!terms?.length) {
		return null;
	}

	let normalizedTaxonomies = {};

	normalizedTaxonomies = terms?.map((term) => ({
		key: term?.taxonomy?.taxonomy,
		value: term?.term,
	}));

	normalizedTaxonomies = Object.values(
		normalizedTaxonomies.reduce((acc, { key, value }) => {
			acc[key] = acc[key] || { key, value: [] };
			acc[key].value.push(value);
			return acc;
		}, {}),
	).reduce((arr, { key, value }) => ({ ...arr, [key.toLowerCase()]: [...value].join(', ') }), {});

	return normalizedTaxonomies;
};

/**
 * Creates a new technology with the provided data.
 *
 * @param {object} data Technology data.
 * @param {object} options Optional params.
 * @returns {object} The newly technology.
 */
export const createTechnology = async (data, options = {}) => {
	const terms = prepareTerms(data.terms || {});
	const response = await apiPost('technologies', {
		...data,
		terms,
	});

	if (response.status !== 200) {
		return false;
	}

	if (options.normalize && response.data.terms) {
		response.data.terms = normalizeTerms(response.data.terms);
	}

	return response.data;
};

/**
 * Updates an existing technology.
 *
 * @param {number} id The id of the technology to update
 * @param {object} data The Technology data.
 * @param {object} options Optional params.
 * @returns {object} The updated technology.
 */
export const updateTechnology = async (id, data, options = {}) => {
	if (!id) {
		return false;
	}

	const terms = data.terms ? prepareTerms(data.terms) : false;
	const response = await apiPut(`technologies/${id}`, { ...data, terms });

	if (response.status !== 200) {
		return false;
	}

	if (options.normalize && response.data.terms) {
		response.data.terms = normalizeTerms(response.data.terms);
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
 * @param {number|string} id The id or slug of the technology to retrieve.
 * @param {object} options Optional params.
 * @param {boolean} [options.embed=true] Response with embed.
 * @param {string|number} [options.term] Filter term by id or slug.
 * @param {string|number} [options.taxonomy] Filter taxonomy by id or slug.
 */
export const getTechnology = async (id, options = {}) => {
	const response = await apiGet(`technologies/${id}`, {
		embed: options.embed || true,
	});

	if (response.status !== 200) {
		return false;
	}

	if (options.normalizeTaxonomies && response?.data?.terms) {
		response.data.taxonomies = normalizeTaxonomies(response.data.terms);
	}

	if (options.normalize && response?.data?.terms) {
		response.data.terms = normalizeTerms(response.data.terms);
	}

	return response.data;
};

/**
 * Normalize costs coming from the api.
 *
 * @param {object} costs The raw costs comming from the api.
 *
 * @returns {object} Normalized costs.
 */
export const normalizeCosts = (costs) => {
	const normalizedCosts = {};

	costs.forEach((cost) => {
		const { cost_type, ...rest } = cost;

		if (!normalizedCosts[cost_type]) {
			normalizedCosts[cost_type] = [];
		}

		normalizedCosts[cost_type].push(rest);
	});

	return normalizedCosts;
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

	return {
		...response.data,
		costs: normalizeCosts(costs),
	};
};

/**
 * Prepares costs data for submission.
 *
 * @param {object} costsData The unormalized costs coming from the technology form.
 *
 * @returns {object}
 */
export const prepareCosts = (costsData) => {
	const keys = Object.keys(costsData);

	if (keys.length === 0) {
		return {};
	}

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
		const groupData =
			normalizedCosts?.costs && normalizedCosts.costs[group]
				? normalizedCosts.costs[group]
				: false;

		if (groupData) {
			groupData.forEach((individualCost) => {
				individualCost.type = individualCost.type.value;
				if (individualCost.id) {
					individualCost.id = parseInt(individualCost.id, 10);
				} else {
					delete individualCost.id;
				}
				individualCosts.push({
					cost_type: group,
					...individualCost,
				});
			});

			delete normalizedCosts.costs[group];
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
 * @param {object} options Optional params.
 * @param {boolean} options.normalize Whether to normalize data to match the shape expected by the technology form.
 * @returns {object} The updated technology costs
 */
export const updateTechnologyCosts = async (id, data, options = {}) => {
	if (!id) {
		return false;
	}

	const response = await apiPut(`technologies/${id}/costs`, prepareCosts(data));

	if (response.status !== 200) {
		return false;
	}

	if (!options.normalize) {
		return response.data;
	}

	const { costs } = response.data;

	return {
		...response.data,
		costs: normalizeCosts(costs),
	};
};

/**
 * Updates technology responsibles.
 *
 * @param {number} id The id of the tecnology to update
 * @param {object} data The technology responsibles data.
 * @returns {object} The updated technology responsibles
 */
export const updateTechnologyResponsibles = async (id, data) => {
	if (!id) {
		return false;
	}

	const response = await apiPost(`technologies/${id}/users`, data);

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};
