const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTechnologyReviewer extends BaseValidator {
	get rules() {
		return {
			reviewer: 'required|number|exists:reviewers,id',
		};
	}
}

module.exports = UpdateTechnologyReviewer;
