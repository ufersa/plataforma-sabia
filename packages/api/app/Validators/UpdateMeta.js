const BaseValidator = use('App/Validators/BaseValidator');

class UpdateMeta extends BaseValidator {
	get rules() {
		return {
			meta_key: 'required|string',
			meta_value: 'required|string',
		};
	}
}

module.exports = UpdateMeta;
