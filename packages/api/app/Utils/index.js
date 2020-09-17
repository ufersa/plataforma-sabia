const errors = require('./errors');
const messages = require('./messages');
const localization = require('./localization');
const transaction = require('./transaction');
const roles_capabilities = require('./roles_capabilities');
const technology_distribution = require('./technology_distribution');

module.exports = {
	...errors,
	...messages,
	...localization,
	...transaction,
	...roles_capabilities,
	...technology_distribution,
};
