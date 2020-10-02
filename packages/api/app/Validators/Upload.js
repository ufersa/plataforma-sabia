const BaseValidator = use('App/Validators/BaseValidator');
class Upload extends BaseValidator {
	get rules() {
		return {
			files: 'required',
			'files.*':
				'file|file_ext:jpg,jpeg,jfif,pjpeg,pjp,png,webp,pdf|file_size:2mb|file_types:image,application',
		};
	}
}

module.exports = Upload;
