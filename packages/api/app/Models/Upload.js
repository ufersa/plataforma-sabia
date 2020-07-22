/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class Upload extends Model {
	static get computed() {
		return ['url'];
	}

	getUrl() {
		const uploadPath = this.object ? `resources/uploads/${this.object}` : 'resources/uploads';
		return `${Env.get('APP_URL')}/${uploadPath}/${this.filename}`;
	}
}

module.exports = Upload;
