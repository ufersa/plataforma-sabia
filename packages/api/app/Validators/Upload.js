const BaseValidator = use('App/Validators/BaseValidator');
const Config = use('Adonis/Src/Config');
const { allowedFormats, maxFileSize, fileTypes } = Config.get('upload');
class Upload extends BaseValidator {
	get rules() {
		return {
			files: 'required',
			'files.*': `file|file_ext:${allowedFormats.join()}|file_size:${maxFileSize}|file_types:${fileTypes.join()}`,
		};
	}
}

module.exports = Upload;
