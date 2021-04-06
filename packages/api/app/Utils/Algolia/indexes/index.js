const announcement = require('./announcement');
const idea = require('./idea');
const { saveIndex: institution } = require('./institution');
const { saveIndex: service } = require('./service');
const { saveIndex: technology } = require('./technology');

const indexes = {
	announcement,
	idea,
	institution,
	service,
	technology,
};

module.exports = (index, ...rest) => indexes[index](...rest);
