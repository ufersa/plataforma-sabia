/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');
const { incrementSlugSuffix } = require('../Utils/slugify');

class Upload extends Model {
	static get computed() {
		return ['url'];
	}

	getUrl() {
		const uploadPath = this.object ? `resources/uploads/${this.object}` : 'resources/uploads';
		return `${Env.get('APP_URL')}/${uploadPath}/${this.filename}`;
	}

	static async getUniqueFileName(file, object = null) {
		const filenameWithOutExt = file.clientName.replace(`.${file.subtype}`, '');
		const fileNameStoredPreviously = await this.query()
			.where('filename', 'REGEXP', `${filenameWithOutExt}.*(-(d*))?.*.${file.subtype}$`)
			.where({ object })
			.orderBy('id', 'desc')
			.first();
		if (fileNameStoredPreviously) {
			let newFileName = fileNameStoredPreviously.filename;
			newFileName = newFileName.replace(`.${file.subtype}`, '');
			newFileName = incrementSlugSuffix(newFileName);
			return `${newFileName}.${file.subtype}`;
		}
		return file.clientName;
	}
}

module.exports = Upload;
