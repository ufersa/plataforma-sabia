const errors = require('./errors');
const messages = require('./messages');
const localization = require('./localization');
const transaction = require('./transaction');
const roles = require('./roles');

module.exports = {
	...errors,
	...messages,
	...localization,
	...transaction,
	...roles,
};
