const BaseValidator = use('App/Validators/BaseValidator');

class StoreTaxonomy extends BaseValidator {
	get rules() {
		return {
			taxonomy: 'required|string|unique:taxonomies',
			description: 'required|string',
		};
	}
}

module.exports = StoreTaxonomy;
