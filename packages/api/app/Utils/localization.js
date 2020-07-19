const Antl = use('Antl');
const { handleLanguage } = require('./handleLanguage');
/**
 * Returns the localized string
 *
 * @param {string} messageId The Antl message id.
 * @param {Array} data Optional. Data to be passed to Antl.
 * @param {Request} request The HTTP request
 * @returns {string}
 */
module.exports.antl = (messageId, data = {}, request = {}) => {
	try {
		request.headers();
	} catch {
		try {
			data.headers();
			// eslint-disable-next-line no-param-reassign
			request = data;
		} catch (exception) {
			// eslint-disable-next-line no-param-reassign
			request = false;
		}
	}
	const lang = handleLanguage(request);
	return Antl.forLocale(lang).formatMessage(messageId, data);
};
