const Antl = use('Antl');

/**
 * Returns the localized string
 *
 * @param {string} messageId The Antl message id.
 * @param {Array} data Optional. Data to be passed to Antl.
 * @returns {string}
 */
module.exports.antl = (messageId, data = {}) => {
	return Antl.formatMessage(messageId, data);
};
