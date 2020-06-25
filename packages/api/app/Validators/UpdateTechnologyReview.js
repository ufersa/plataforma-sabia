const BaseValidator = use('App/Validators/BaseValidator');

class StoreTechnologyReview extends BaseValidator {
	get rules() {
		return {
			content: 'string',
			rating: 'number|range:0,6',
			positive: 'array',
			negative: 'array',
		};
	}
}

module.exports = StoreTechnologyReview;
