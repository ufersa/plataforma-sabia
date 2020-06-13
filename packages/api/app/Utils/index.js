const errors = require('./errors');
const messages = require('./messages');
const localization = require('./localization');
const transaction = require('./transaction');
const roles_capabilities = require('./roles_capabilities');

module.exports = {
	...errors,
	...messages,
	...localization,
	...transaction,
	...roles_capabilities,
};
