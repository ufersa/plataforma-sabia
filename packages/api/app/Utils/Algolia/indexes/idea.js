const { initIndex } = require('../core');

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
 * @param {object|object[]} data Idea data
 * @param {object} options Options passed
 * @param {boolean} options.saveMany Save too many objects or just one
 */
module.exports = async (data, options = {}) => {
	const { saveObjects, saveObject } = initIndex('idea');

	if (options.saveMany) {
		const ideas = await data.map((idea) => prepareIdea(idea));
		return saveObjects(ideas);
	}

	const idea = await prepareIdea(data);
	return saveObject(idea);
};
