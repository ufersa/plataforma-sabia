const { initIndex } = require('../core');
const { normalizeKeywords } = require('../normalizes');

const SERVICE_TYPES = {
	labor: 'Mão-de-obra',
	specialized_technical_work: 'Trabalho técnico especializado',
	consulting: 'Consultoria',
	analysis: 'Análise',
	examination: 'Exame',
	expertise: 'Perícia',
	other: 'Outro',
};

const defaultTermMale = 'Não definido';
const defaultTermFemale = 'Não definida';

/**
 * Prepare service object for Algolia
 *
 * @param {object} service The service object
 * @param {boolean} shouldRedefine Redefines the index object. Useful when only updating single object attributes
 * @returns {object} The service data for Algolia
 */
const prepareService = (service, shouldRedefine = true) => {
	const serviceData = typeof service?.toJSON === 'function' ? service.toJSON() : service;

	const serviceForAlgolia = {
		...serviceData,
		...(!!shouldRedefine && {
			type: defaultTermMale,
			institution: defaultTermFemale,
		}),
	};

	if (serviceData.user?.institution) {
		serviceForAlgolia.institution = serviceData.user.institution.initials;
		serviceForAlgolia.institution_id = serviceData.user.institution.id;
	}

	if (serviceData.type) {
		serviceForAlgolia.type = SERVICE_TYPES[serviceData.type];
	}

	if (serviceData?.keywords?.length) {
		serviceForAlgolia.keywords = normalizeKeywords(serviceData.keywords);
	}

	return serviceForAlgolia;
};

/**
 * Index service to Algolia.
 *
 * @param {object|object[]} data Service data
 * @param {object} options Options passed
 * @param {boolean} options.saveMany Save too many objects or just one
 * @param {boolean} options.updateObject Updates object instead of replacing
 */
const saveIndex = async (data, options = {}) => {
	const { saveObjects, saveObject, partialUpdateObject } = initIndex('service.indexName');

	if (options.saveMany) {
		const services = await data.map((idea) => prepareService(idea));
		return saveObjects(services);
	}

	if (options.updateObject) {
		const service = await prepareService(data, false);
		return partialUpdateObject(service);
	}

	const service = await prepareService(data);
	return saveObject(service);
};

module.exports = {
	prepareService,
	saveIndex,
};
