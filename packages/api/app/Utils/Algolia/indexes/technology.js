const { initIndex } = require('../core');
const { normalizeKeywords } = require('../normalizes');
const { roles } = require('../../roles_capabilities');

const CLASSIFICATION_TAXONOMY_SLUG = 'CLASSIFICATION';
const DIMENSION_TAXONOMY_SLUG = 'DIMENSION';
const TARGET_AUDIENCE_TAXONOMY_SLUG = 'TARGET_AUDIENCE';

const TECHNOLOGY_TYPES = {
	equipment: 'Equipamento',
	material: 'Material',
	methodology: 'Metodologia',
	model: 'Modelo',
	process: 'Processo',
	service: 'Serviço',
	software: 'Software',
	other: 'Outro',
};

const defaultTermMale = 'Não definido';
const defaultTermFemale = 'Não definida';

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
		classification: termsObj[CLASSIFICATION_TAXONOMY_SLUG] || defaultTermFemale,
		dimension: termsObj[DIMENSION_TAXONOMY_SLUG] || defaultTermFemale,
		targetAudience: termsObj[TARGET_AUDIENCE_TAXONOMY_SLUG] || defaultTermMale,
	};
};

/**
 * Returns grouped sum of technology implementation cost and maintenance cost
 *
 * @param {object} technology The technology object
 * @returns {object} The technology costs
 */
const normalizeCosts = (technology) => {
	const technologyCost = technology.technologyCosts[0];
	const { costs } = technologyCost;

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

	return { implementationCost, maintenanceCost, forSale: technologyCost.is_seller };
};

/**
 * Prepare technology object for Algolia
 *
 * @param {object} technology The technology object
 * @param {boolean} shouldRedefine Redefines the index object. Useful when only updating single object attributes
 * @returns {object} The technology data for Algolia
 */
const prepareTechnology = (technology, shouldRedefine = true) => {
	const technologyData =
		typeof technology?.toJSON === 'function' ? technology.toJSON() : technology;

	const technologyForAlgolia = {
		...technologyData,
		...(!!shouldRedefine && {
			classification: defaultTermFemale,
			dimension: defaultTermFemale,
			targetAudience: defaultTermMale,
		}),
	};

	if (technologyData.terms && technologyData.terms.length) {
		const { classification, dimension, targetAudience } = normalizeTerms(technologyData);

		technologyForAlgolia.classification = classification;
		technologyForAlgolia.dimension = dimension;
		technologyForAlgolia.targetAudience = targetAudience;
	}

	if (technologyData.technologyCosts && technologyData.technologyCosts.length) {
		const { implementationCost, maintenanceCost, forSale } = normalizeCosts(technologyData);

		technologyForAlgolia.implementationCost = implementationCost;
		technologyForAlgolia.maintenanceCost = maintenanceCost;
		technologyForAlgolia.forSale = forSale;
	}

	if (technologyData.type) {
		technologyForAlgolia.type = TECHNOLOGY_TYPES[technologyData.type] || defaultTermMale;
	}

	const ownerUser = technologyData.users?.find((user) => user.pivot.role === roles.OWNER);
	if (ownerUser) {
		technologyForAlgolia.institution = ownerUser.institution?.initials || defaultTermFemale;
		technologyForAlgolia.institution_id = ownerUser.institution?.id;
	}

	if (technologyData?.keywords?.length) {
		technologyForAlgolia.keywords = normalizeKeywords(technologyData.keywords);
	}

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
 * @param {boolean} options.updateObject Updates object instead of replacing
 */
const saveIndex = async (data, options = {}) => {
	const { saveObjects, saveObject, partialUpdateObject } = initIndex('technology.indexName');

	if (options.saveMany) {
		const technologies = await data.map((technology) => prepareTechnology(technology));
		return saveObjects(technologies);
	}

	if (options.updateObject) {
		const technology = await prepareTechnology(data, false);
		return partialUpdateObject(technology);
	}

	const technology = await prepareTechnology(data);
	return saveObject(technology);
};

module.exports = {
	prepareTechnology,
	saveIndex,
};
