const BaseValidator = use('App/Validators/BaseValidator');

class UpdateInstitutionResponsible extends BaseValidator {
	get rules() {
		return {
			responsible: 'required|number|exists:users,id',
		};
	}
}

module.exports = UpdateInstitutionResponsible;
