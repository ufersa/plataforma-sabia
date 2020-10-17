const BaseValidator = use('App/Validators/BaseValidator');
const { reviewerStatuses } = require('../Utils');

class updateReviewerStatus extends BaseValidator {
	get rules() {
		return {
			status: `required|string|in:${Object.values(reviewerStatuses).join()}`,
		};
	}
}

module.exports = updateReviewerStatus;
