const { initIndex } = require('../core');

/**
 * Prepare technology object for Algolia
 *
 * @param {object} service The technology object
 * @returns {object} The technology data for Algolia
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
		const service = await data.map((idea) => prepareService(idea));
		return saveObjects(service);
	}

	const service = await prepareService(data);
	return saveObject(service);
};
