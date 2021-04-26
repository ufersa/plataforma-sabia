const errors = require('./errors');
const messages = require('./messages');
const localization = require('./localization');
const transaction = require('./transaction');
const roles_capabilities = require('./roles_capabilities');
const technology_distribution = require('./technology_distribution');
const analytics = require('./analytics');
const statuses = require('./statuses');
const cache = require('./cache');
const Algolia = require('./Algolia');
const Slack = require('./Slack');
const random = require('./random');

module.exports = {
	...errors,
	...messages,
	...localization,
	...transaction,
	...roles_capabilities,
	...technology_distribution,
	...statuses,
	...analytics,
	...random,
	cache,
	Algolia,
	Slack,
};
