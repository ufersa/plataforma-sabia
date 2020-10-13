const BaseValidator = use('App/Validators/BaseValidator');
const { reviewerStatuses } = require('../Utils');

class updateReviewerStatus extends BaseValidator {
	get rules() {
		return {
			status: `required|string|in:${Object.entries(reviewerStatuses)
				.map((status) => status[1])
				.join()}`,
		};
	}
}

module.exports = updateReviewerStatus;
