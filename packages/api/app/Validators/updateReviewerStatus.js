const BaseValidator = use('App/Validators/BaseValidator');

class updateReviewerStatus extends BaseValidator {
	get rules() {
		return {
			status: 'required|string|in:pending,approved',
		};
	}
}

module.exports = updateReviewerStatus;
