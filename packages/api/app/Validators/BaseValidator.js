const Antl = use('Antl');

class BaseValidator {
	get validateAll() {
		return true;
	}

	get messages() {
		return Antl.list('validation');
	}
}

module.exports = BaseValidator;
