const announcement = require('./announcement');
const idea = require('./idea');
const { saveIndex: service } = require('./service');
const { saveIndex: technology } = require('./technology');

const indexes = {
	announcement,
	idea,
	service,
	technology,
};

module.exports = (index, ...rest) => indexes[index](...rest);
