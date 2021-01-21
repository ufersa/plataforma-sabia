/* eslint-disable */
const { initIndex, saveIndex } = require('../../Utils/Algolia');

// eslint-disable-next-line no-multi-assign
const AlgoliaHook = (exports = module.exports = {});

// attribute no model para:
// - pegar o index

/**
 * @param {typeof import('@adonisjs/lucid/src/Lucid/Model')} modelInstance
 * @param {*} param1
 */
AlgoliaHook.save = async (
	modelInstance,
	{ config = {}, condition = true, loads = [], options = {} },
) => {
	if (!condition) {
		return false;
	}

	if (!modelInstance.toJSON().objectID) {
		throw new Error('You need to define the "objectID" as a computed field');
	}

	if (loads.length) {
		await modelInstance.loadMany([...loads]);
	}

	return saveIndex(config.index, modelInstance.toJSON(), ...options);
};
