const { initIndex } = require('../core');

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
 * @returns {object} The service data for Algolia
 */
const prepareService = (service) => {
	const serviceData = typeof service?.toJSON === 'function' ? service.toJSON() : service;

	const serviceForAlgolia = {
		...serviceData,
	};

	serviceForAlgolia.institution =
		serviceForAlgolia.user?.institution?.initials || defaultTermFemale;

	serviceForAlgolia.type = SERVICE_TYPES[serviceForAlgolia.type] || defaultTermMale;

	return serviceForAlgolia;
};

/**
 * Index service to Algolia.
 *
 * @param {object|object[]} data Service data
 * @param {object} options Options passed
 * @param {boolean} options.saveMany Save too many objects or just one
 */
module.exports = async (data, options = {}) => {
	const { saveObjects, saveObject } = initIndex('service');

	if (options.saveMany) {
		const services = await data.map((idea) => prepareService(idea));
		return saveObjects(services);
	}

	const service = await prepareService(data);
	return saveObject(service);
};
