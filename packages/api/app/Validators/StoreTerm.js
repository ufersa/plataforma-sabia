const BaseValidator = use('App/Validators/BaseValidator');

class StoreTerm extends BaseValidator {
	get rules() {
		return {
			term: 'required|string',
			taxonomyId: 'required|integer',
		};
	}
}

module.exports = StoreTerm;
