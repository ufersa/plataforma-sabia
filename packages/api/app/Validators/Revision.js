const BaseValidator = use('App/Validators/BaseValidator');

class Revision extends BaseValidator {
	get rules() {
		return {
			description:
				'required_when:assessment,requested_changes|required_when:assessment,rejected',
			assessment: 'required|string|in:approved,requested_changes,rejected',
		};
	}
}

module.exports = Revision;
