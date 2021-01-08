const BaseValidator = use('App/Validators/BaseValidator');
const { announcementStatuses } = require('../Utils');

class UpdateAnnouncementStatus extends BaseValidator {
	get rules() {
		return {
			status: `required|string|in:${Object.values(announcementStatuses).join()}`,
		};
	}
}

module.exports = UpdateAnnouncementStatus;
