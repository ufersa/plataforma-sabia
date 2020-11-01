const CATEGORY_TAXONOMY_SLUG = 'CATEGORY';
const CLASSIFICATION_TAXONOMY_SLUG = 'CLASSIFICATION';
const DIMENSION_TAXONOMY_SLUG = 'DIMENSION';
const TARGET_AUDIENCE_TAXONOMY_SLUG = 'TARGET_AUDIENCE';

/**
 * Returns all technology terms related to algolia index
 *
 * @param {object} technology The technology object
 * @returns {object} The technology terms to be indexed by algolia
 */
const normalizeAlgoliaTechnologyTerms = (technology) => {
	const defaultTermMasc = 'Não definido';
	const defaultTermFem = 'Não definida';

	if (!technology.terms.length)
		return {
			category: defaultTermFem,
			classification: defaultTermFem,
			dimension: defaultTermFem,
			targetAudience: defaultTermMasc,
		};

	const termsObj = technology.terms.reduce((acc, obj) => {
		acc[obj.taxonomy.taxonomy] = obj.term;
		return acc;
	}, {});

	return {
		category: termsObj[CATEGORY_TAXONOMY_SLUG] || defaultTermFem,
		classification: termsObj[CLASSIFICATION_TAXONOMY_SLUG] || defaultTermFem,
		dimension: termsObj[DIMENSION_TAXONOMY_SLUG] || defaultTermFem,
		targetAudience: termsObj[TARGET_AUDIENCE_TAXONOMY_SLUG] || defaultTermMasc,
	};
};

/**
 * Returns grouped sum of technology implementation cost and maintenance cost
 *
 * @param {object} technology The technology object
 * @returns {object} The technology costs
 */
const normalizeAlgoliaTechnologyCosts = (technology) => {
	if (
		!technology.technologyCosts ||
		!technology.technologyCosts.length ||
		!technology.technologyCosts[0].costs.length
	)
		return {};

	const { costs } = technology.technologyCosts[0];

	const implementationCost = costs
		.filter((cost) => cost.cost_type === 'implementation_costs')
		.reduce((acc, curr) => acc + curr.value * curr.quantity, 0);

	const maintenanceCost = costs
		.filter((cost) => cost.cost_type === 'maintenance_costs')
		.reduce((acc, curr) => acc + curr.value * curr.quantity, 0);

	return { implementationCost, maintenanceCost };
};

module.exports = {
	normalizeAlgoliaTechnologyTerms,
	normalizeAlgoliaTechnologyCosts,
};
