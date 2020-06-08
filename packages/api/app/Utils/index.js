const errors = require('./errors');
const messages = require('./messages');
const localization = require('./localization');
const transaction = require('./transaction');

module.exports = {
	...errors,
	...messages,
	...localization,
	...transaction,
};
