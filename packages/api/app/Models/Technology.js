/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Technology extends Model {
	static boot() {
		super.boot();
		// eslint-disable-next-line no-unused-vars
		this.addHook('afterSave', async (technology) => {
			// save/update algolia
		});
	}

	static get computed() {
		return ['objectID'];
	}

	getObjectId({ id }) {
		return `technology-${id}`;
	}
}

module.exports = Technology;
