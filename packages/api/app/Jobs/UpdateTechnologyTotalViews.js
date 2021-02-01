const { updateTechnologyTotalViews } = require('../Utils');

class UpdateTechnologyTotalViews {
	static get key() {
		return 'UpdateTechnologyTotalViews-key';
	}

	async handle() {
		await updateTechnologyTotalViews();
	}
}

module.exports = UpdateTechnologyTotalViews;
