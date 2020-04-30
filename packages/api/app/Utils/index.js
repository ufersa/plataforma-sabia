const errors = require('./errors');
const messages = require('./messages');
const localization = require('./localization');

module.exports = {
	...errors,
	...messages,
	...localization,
};
