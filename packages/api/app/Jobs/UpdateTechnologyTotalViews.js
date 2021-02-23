const { getTechnologyViews, updateTechnologyTotalViews } = require('../Utils');

class UpdateTechnologyTotalViews {
	static get key() {
		return 'UpdateTechnologyTotalViews-key';
	}

	async handle() {
		const pageViews = await getTechnologyViews();
		await updateTechnologyTotalViews(pageViews);
	}
}

module.exports = UpdateTechnologyTotalViews;
