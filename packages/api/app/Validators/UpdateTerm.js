const BaseValidator = use('App/Validators/BaseValidator');

class UpdateTerm extends BaseValidator {
	get rules() {
		return {
			term: 'string',
			parent_id: 'number',
			metas: 'array',
			'metas.*.meta_key': 'required_if:metas|string',
			'metas.*.meta_value': 'required_if:metas|string',
		};
	}
}

module.exports = UpdateTerm;
