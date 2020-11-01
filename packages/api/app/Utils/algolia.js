const Config = use('Adonis/Src/Config');
const algoliasearch = use('App/Services/AlgoliaSearch');

const algoliaConfig = Config.get('algolia');
const indexObject = algoliasearch.initIndex(algoliaConfig.indexName);

const { roles } = require('./roles_capabilities');

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
	const { costs } = technology.technologyCosts[0];

	const implementationCost = costs
		.filter((cost) => cost.cost_type === 'implementation_costs')
		.reduce((acc, curr) => acc + curr.value * curr.quantity, 0);

	const maintenanceCost = costs
		.filter((cost) => cost.cost_type === 'maintenance_costs')
		.reduce((acc, curr) => acc + curr.value * curr.quantity, 0);

	console.log(implementationCost, 'cost');

	return { implementationCost, maintenanceCost };
};

/**
 * Updates technology data in algolia
 *
 * @param {object} technologyData The technology object
 * @returns {void}
 */
const indexToAlgolia = (technologyData) => {
	const defaultTermMasc = 'Não definido';
	const defaultTermFem = 'Não definida';

	const technologyForAlgolia = {
		...technologyData.toJSON(),
		category: defaultTermFem,
		classification: defaultTermFem,
		dimension: defaultTermFem,
		targetAudience: defaultTermMasc,
	};

	if (technologyForAlgolia.terms && technologyForAlgolia.terms.length) {
		const {
			category,
			classification,
			dimension,
			targetAudience,
		} = normalizeAlgoliaTechnologyTerms(technologyForAlgolia);

		technologyForAlgolia.category = category;
		technologyForAlgolia.classification = classification;
		technologyForAlgolia.dimension = dimension;
		technologyForAlgolia.targetAudience = targetAudience;

		delete technologyForAlgolia.terms;
	}

	if (technologyForAlgolia.technologyCosts && technologyForAlgolia.technologyCosts.length) {
		const { implementationCost, maintenanceCost } = normalizeAlgoliaTechnologyCosts(
			technologyForAlgolia,
		);

		technologyForAlgolia.implementationCost = implementationCost;
		technologyForAlgolia.maintenanceCost = maintenanceCost;

		delete technologyForAlgolia.technologyCosts;
	}

	const ownerUser = technologyForAlgolia.users.find((user) => user.pivot.role === roles.OWNER);
	technologyForAlgolia.institution = ownerUser ? ownerUser.company : null;

	indexObject.saveObject({
		...technologyForAlgolia,
	});
};

module.exports = {
	normalizeAlgoliaTechnologyTerms,
	normalizeAlgoliaTechnologyCosts,
	indexToAlgolia,
};
