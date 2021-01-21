const { initIndex } = require('../core');

/**
 * Prepare service object for Algolia
 *
 * @param {object} service The service object
 * @returns {object} The service data for Algolia
 */
const prepareService = (service) => {
	return typeof service?.toJSON === 'function' ? service.toJSON() : service;
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
