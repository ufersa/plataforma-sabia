const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTerm extends BaseValidator {
	get rules() {
		return {
			term: 'string',
			meta: 'array',
			'meta.*.meta_key': 'required_if:meta|string',
			'meta.*.meta_value': 'required_if:meta|string',
		};
	}
}

module.exports = UpdateTerm;
