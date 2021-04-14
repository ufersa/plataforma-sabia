const { initIndex } = require('./core');
const saveIndex = require('./indexes');

const save = async (index, data) => {
	await saveIndex(index, data);
};

const remove = async (index, objectID) => {
	await initIndex(index).deleteObject(objectID);
};

module.exports = { save, remove };
