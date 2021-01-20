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
 * @param {object} data Service data
 */
module.exports = async (data) => {
	const { saveObject } = initIndex('service');
	const service = await prepareService(data);
	return saveObject(service);
};
