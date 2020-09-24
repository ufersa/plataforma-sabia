const BaseValidator = use('App/Validators/BaseValidator');

class Upload extends BaseValidator {
	get rules() {
		return {
			files: 'required',
			'files.*': 'file',
		};
	}
}

module.exports = Upload;
