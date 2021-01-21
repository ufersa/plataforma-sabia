const announcement = require('./announcement');
const idea = require('./idea');
const researcher = require('./researcher');
const service = require('./service');
const technology = require('./technology');

const indexes = {
	announcement,
	idea,
	researcher,
	service,
	technology,
};

module.exports = (index, ...rest) => indexes[index](...rest);
