const { initIndex } = require('../core');
const { normalizeKeywords } = require('../normalizes');

/**
 * Prepare idea object for Algolia
 *
 * @param {object} idea The idea object
 * @returns {object} The idea data for Algolia
 */
const prepareIdea = (idea) => {
	const ideaData = typeof idea?.toJSON === 'function' ? idea.toJSON() : idea;

	const ideaForAlgolia = {
		...ideaData,
	};

	if (ideaData?.keywords?.length) {
		ideaForAlgolia.keywords = normalizeKeywords(ideaData.keywords);
	}

	if (ideaData?.user) {
		ideaForAlgolia.user = {
			id: ideaData.user.id,
			full_name: ideaData.user.full_name,
		};
		delete ideaForAlgolia.user_id;
	}

	return ideaForAlgolia;
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
