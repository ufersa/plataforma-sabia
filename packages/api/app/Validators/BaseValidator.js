const Antl = use('Antl');
const { handleLanguage } = require('../Utils');

class BaseValidator {
	get validateAll() {
		return true;
	}

	get messages() {
		const lang = handleLanguage(this.ctx.request);
		return Antl.forLocale(lang).list('validation');
	}
}

module.exports = BaseValidator;
