const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTaxonomy extends BaseValidator {
	get rules() {
		return {
			taxonomy: 'unique:taxonomies',
		};
	}
}

module.exports = UpdateTaxonomy;
