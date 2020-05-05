const BaseValidator = use('App/Validators/BaseValidator');

class StoreTaxonomy extends BaseValidator {
	get rules() {
		return {
			taxonomy: 'required|unique:taxonomies',
			description: 'required',
		};
	}
}

module.exports = StoreTaxonomy;
