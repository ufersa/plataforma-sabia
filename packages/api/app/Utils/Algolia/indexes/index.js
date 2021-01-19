const technology = require('./technology');
const idea = require('./idea');
const service = require('./service');

const indexes = {
	technology,
	idea,
	service,
};

module.exports = (index, ...rest) => indexes[index](...rest);
