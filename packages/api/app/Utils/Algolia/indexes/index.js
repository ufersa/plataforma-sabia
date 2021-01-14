const technology = require('./technology');
const idea = require('./idea');

const indexes = {
	technology,
	idea,
};

module.exports = (index, ...rest) => indexes[index](...rest);
