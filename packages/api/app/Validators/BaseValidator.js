const Antl = use('Antl');
class BaseValidator {
	get validateAll() {
		return true;
	}

	get messages() {
		return Antl.forLocale(this.ctx.locale).list('validation');
	}
}

module.exports = BaseValidator;
