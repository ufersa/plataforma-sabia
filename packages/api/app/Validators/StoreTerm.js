const BaseValidator = use('App/Validators/BaseValidator');

class StoreTerm extends BaseValidator {
	get rules() {
		return {
			term: 'required|string',
			taxonomy: 'required',
			parent_id: 'number',
			metas: 'array',
			'metas.*.meta_key': 'required_if:meta|string',
			'metas.*.meta_value': 'required_if:meta|string',
		};
	}
}

module.exports = StoreTerm;
