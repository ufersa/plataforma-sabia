const { initIndex } = require('../core');
const { roles } = require('../../roles_capabilities');

const CLASSIFICATION_TAXONOMY_SLUG = 'CLASSIFICATION';
const DIMENSION_TAXONOMY_SLUG = 'DIMENSION';
const TARGET_AUDIENCE_TAXONOMY_SLUG = 'TARGET_AUDIENCE';

const TECHNOLOGY_TYPE = {
	equipment: 'Equipamento',
	material: 'Material',
	methodology: 'Metodologia',
	model: 'Modelo',
	process: 'Processo',
	service: 'Serviço',
	software: 'Software',
	other: 'Outro',
};

const defaultTermMasc = 'Não definido';
const defaultTermFem = 'Não definida';

/**
 * Returns all technology terms related to algolia index
 *
 * @param {object} technology The technology object
 * @returns {object} The technology terms to be indexed by algolia
 */
const normalizeTerms = (technology) => {
	const termsObj = technology.terms.reduce((acc, obj) => {
		acc[obj.taxonomy.taxonomy] = obj.term;
		return acc;
	}, {});

	return {
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
const normalizeCosts = (technology) => {
	const { costs } = technology.technologyCosts[0];

	const implementationCost = costs.reduce((acc, curr) => {
		if (curr.cost_type === 'implementation_costs') {
			return acc + curr.quantity * curr.value;
		}

		return acc;
	}, 0);

	const maintenanceCost = costs.reduce((acc, curr) => {
		if (curr.cost_type === 'maintenance_costs') {
			return acc + curr.quantity * curr.value;
		}

		return acc;
	}, 0);

	return { implementationCost, maintenanceCost };
};

/**
 * Prepare technology object for Algolia
 *
 * @param {object} technology The technology object
 * @returns {object} The technology data for Algolia
 */
const prepareTechnology = (technology) => {
	const technologyData =
		typeof technology?.toJSON === 'function' ? technology.toJSON() : technology;

	const technologyForAlgolia = {
		...technologyData,
		classification: defaultTermFem,
		dimension: defaultTermFem,
		targetAudience: defaultTermMasc,
	};

	if (technologyForAlgolia.terms && technologyForAlgolia.terms.length) {
		const { classification, dimension, targetAudience } = normalizeTerms(technologyForAlgolia);

		technologyForAlgolia.classification = classification;
		technologyForAlgolia.dimension = dimension;
		technologyForAlgolia.targetAudience = targetAudience;
	}

	if (technologyForAlgolia.technologyCosts && technologyForAlgolia.technologyCosts.length) {
		const { implementationCost, maintenanceCost } = normalizeCosts(technologyForAlgolia);

		technologyForAlgolia.implementationCost = implementationCost;
		technologyForAlgolia.maintenanceCost = maintenanceCost;
	}

	if (technologyForAlgolia.type) {
		technologyForAlgolia.type = TECHNOLOGY_TYPE[technologyForAlgolia.type];
	}

	const ownerUser = technologyForAlgolia.users.find((user) => user.pivot.role === roles.OWNER);
	technologyForAlgolia.institution = ownerUser ? ownerUser.company : null;

	delete technologyForAlgolia.terms;
	delete technologyForAlgolia.technologyCosts;

	return technologyForAlgolia;
};

/**
 * Index technology to Algolia.
 *
 * @param {object|object[]} data Technology data
 * @param {object} options Options passed
 * @param {boolean} options.saveMany Save too many objects or just one
 */
module.exports = async (data, options = {}) => {
	const { saveObjects, saveObject } = initIndex('technology');

	if (options.saveMany) {
		const technologies = await data.map((technology) => prepareTechnology(technology));
		return saveObjects(technologies);
	}

	const technology = await prepareTechnology(data);
	return saveObject(technology);
};
