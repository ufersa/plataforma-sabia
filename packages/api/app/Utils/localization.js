const Antl = use('Antl');

/**
 * Returns the localized string
 *
 * @param {string} messageId The Antl message id.
 * @param {Array} data Optional. Data to be passed to Antl.
 * @param {string} locale Locale code. Optional.
 * @returns {string}
 */
module.exports.antl = (messageId, data = {}, locale = '') => {
	if (locale) {
		return Antl.forLocale(locale).formatMessage(messageId, data);
	}

	return Antl.formatMessage(messageId, data);
};
