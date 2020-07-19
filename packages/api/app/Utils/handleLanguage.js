module.exports.handleLanguage = (request) => {
	const languages = ['pt', 'en'];
	const defaultLang = 'pt';
	if (request && languages.includes(request.headers().lang)) {
		return request.headers().lang;
	}
	return defaultLang;
};
