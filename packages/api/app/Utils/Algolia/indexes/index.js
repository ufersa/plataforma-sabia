const announcement = require('./announcement');
const idea = require('./idea');
const service = require('./service');
const technology = require('./technology');

const indexes = {
	announcement,
	idea,
	service,
	technology,
};

module.exports = (index, ...rest) => indexes[index](...rest);
