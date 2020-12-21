const BaseValidator = use('App/Validators/BaseValidator');

class StoreIdea extends BaseValidator {
	get rules() {
		return {
			title: 'string|required',
			description: 'string|required',
			keywords: 'array|required',
		};
	}
}

module.exports = StoreIdea;
