const core = require('./core');
const indexTechnologyToAlgolia = require('./indexes/technology');

module.exports = {
	...core,
	indexTechnologyToAlgolia,
};
