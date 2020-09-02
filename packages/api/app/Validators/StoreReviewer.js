const BaseValidator = use('App/Validators/BaseValidator');

class StoreReviewer extends BaseValidator {
	get rules() {
		return {
			user_id: 'required|number|exists:users,id',
			categories: 'required|array',
		};
	}
}

module.exports = StoreReviewer;
