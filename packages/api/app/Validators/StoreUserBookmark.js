const BaseValidator = use('App/Validators/BaseValidator');

class StoreUserBookmark extends BaseValidator {
	get rules() {
		return {
			technologyIds: 'required_without_all:serviceIds|array',
			'technologyIds.*': 'number|exists:technologies,id',
			serviceIds: 'required_without_all:technologyIds|array',
			'serviceIds.*': 'number|exists:services,id',
		};
	}
}

module.exports = StoreUserBookmark;
