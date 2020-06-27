const BaseValidator = use('App/Validators/BaseValidator');

class StoreUserBookmark extends BaseValidator {
	get rules() {
		return {
			technologyIds: 'required|array',
			'technologyIds.*': 'number|exists:technologies,id',
		};
	}
}

module.exports = StoreUserBookmark;
