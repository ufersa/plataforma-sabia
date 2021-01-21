const { initIndex } = require('../core');

/**
 * Prepare researcher object for Algolia
 *
 * @param {object} researcher The researcher object
 * @returns {object} The researcher data for Algolia
 */
const prepareResearcher = (researcher) => {
	return typeof researcher?.toJSON === 'function' ? researcher.toJSON() : researcher;
};

/**
 * Index researcher to Algolia.
 *
 * @param {object|object[]} data Researcher data
 * @param {object} options Options passed
 * @param {boolean} options.saveMany Save too many objects or just one
 */
module.exports = async (data, options = {}) => {
	const { saveObjects, saveObject } = initIndex('researcher');

	if (options.saveMany) {
		const researchers = await data.map((idea) => prepareResearcher(idea));
		return saveObjects(researchers);
	}

	const researcher = await prepareResearcher(data);
	return saveObject(researcher);
};
