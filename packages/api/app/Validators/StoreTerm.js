const BaseValidator = use('App/Validators/BaseValidator');

class StoreTerm extends BaseValidator {
	get rules() {
		return {
			term: 'required|string',
			taxonomySlug: 'required_without_all:taxonomyId|string',
			taxonomyId: 'required_without_all:taxonomySlug|number',
		};
	}
}

module.exports = StoreTerm;
