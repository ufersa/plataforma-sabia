const BaseValidator = use('App/Validators/BaseValidator');

class StoreReviewer extends BaseValidator {
	get rules() {
		return {
			categories: 'required|array',
		};
	}
}

module.exports = StoreReviewer;
