const core = require('./core');
const saveIndex = require('./indexes');
const handleObject = require('./handleObject');

module.exports = {
	...core,
	saveIndex,
	handleObject,
};
