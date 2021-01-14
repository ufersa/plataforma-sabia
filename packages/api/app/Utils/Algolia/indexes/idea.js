const { saveObject } = require('../core');

/**
 * Prepare technology object for Algolia
 *
 * @param {object} idea The technology object
 * @returns {object} The technology data for Algolia
 */
const prepareIdea = (idea) => {
	return typeof idea?.toJSON === 'function' ? idea.toJSON() : idea;
};

/**
 * Index idea to Algolia.
 *
 * @param {object} data Idea data
 */
module.exports = async (data) => {
	const idea = await prepareIdea(data);

	return saveObject(idea);
};
