const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTerm extends BaseValidator {
	get rules() {
		return {
			term: 'string',
			metas: 'array',
			'metas.*.meta_key': 'required_if:meta|string',
			'metas.*.meta_value': 'required_if:meta|string',
		};
	}
}

module.exports = UpdateTerm;
