const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTechnologyStatus extends BaseValidator {
	get rules() {
		return {
			status:
				'required|string|in:draft,pending,in_review,requested_changes,changes_made,approved,rejected,published',
		};
	}
}

module.exports = UpdateTechnologyStatus;
