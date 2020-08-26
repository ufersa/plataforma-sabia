const BaseValidator = use('App/Validators/BaseValidator');

class TechnologyTerm extends BaseValidator {
	get rules() {
		return {
			terms: 'required|array',
		};
	}
}

module.exports = TechnologyTerm;
