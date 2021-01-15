const BaseValidator = use('App/Validators/BaseValidator');

class StoreServiceOrderReview extends BaseValidator {
	get rules() {
		return {
			content: 'required|string',
			rating: 'required|number|range:0,6',
			positive: 'required|array',
			negative: 'required|array',
		};
	}
}

module.exports = StoreServiceOrderReview;
