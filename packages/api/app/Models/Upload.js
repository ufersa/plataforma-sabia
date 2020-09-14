/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');
const { incrementSlugSuffix } = require('../Utils/slugify');

class Upload extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	static get computed() {
		return ['url'];
	}

	getUrl() {
		const uploadPath = this.object ? `uploads/${this.object}` : 'uploads';
		return `${Env.get('APP_URL')}/${uploadPath}/${this.filename}`;
	}

	static async getUniqueFileName(file, object = null) {
		const filenameWithOutExt = file.clientName.replace(`.${file.extname}`, '');
		const fileNameStoredPreviously = await this.query()
			.where('filename', 'REGEXP', `${filenameWithOutExt}.*(-(d*))?.*.${file.extname}$`)
			.where({ object })
			.orderBy('id', 'desc')
			.first();
		if (fileNameStoredPreviously) {
			let newFileName = fileNameStoredPreviously.filename;
			newFileName = newFileName.replace(`.${file.extname}`, '');
			newFileName = incrementSlugSuffix(newFileName);
			return `${newFileName}.${file.extname}`;
		}
		return file.clientName;
	}

	/**
	 * Runs the upload query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} request The request object
	 * @returns {object}
	 */
	static async scopeWithFilters(query, request) {
		const filters = request.all();
		if (filters.object) {
			query.where({ object: filters.object });
		}

		if (filters.object_id) {
			query.where({ object_id: filters.object_id });
		}
	}

	user() {
		return this.belongsTo('App/Models/User');
	}
}

module.exports = Upload;
