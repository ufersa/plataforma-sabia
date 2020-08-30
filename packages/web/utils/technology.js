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
			const ids = term.map((t) => {
				if (typeof t === 'string') {
					return t;
				}
				return t.value;
			});
			terms.push(...ids);
		} else if (term) {
			terms.push(term.value);
		}
	});

	return terms;
};

/**
 * Normalize attachments coming from the api.
 *
 * @param {object} attachments The raw attachments comming from the api.
 * @returns {{images: [], documents: []}} Normalized attachments.
 */
export const normalizeAttachments = (attachments) => ({
	images: attachments.filter((file) => file.url.indexOf('.pdf') === -1),
	documents: attachments.filter((file) => file.url.indexOf('.pdf') !== -1),
});
