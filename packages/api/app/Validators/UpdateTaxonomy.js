const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTaxonomy extends BaseValidator {
	get rules() {
		return {
			taxonomy: 'string|unique:taxonomies',
		};
	}
}

module.exports = UpdateTaxonomy;
