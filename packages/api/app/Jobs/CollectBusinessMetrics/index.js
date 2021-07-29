const TechnologyMetrics = require('./TechnologyMetrics');

class CollectBusinessMetrics {
	constructor() {
		this.TechnologyMetrics = TechnologyMetrics;
	}

	static get key() {
		return 'CollectBusinessMetrics-key';
	}

	async handle() {
		// eslint-disable-next-line no-console
		console.time('all');
		new this.TechnologyMetrics().collect();
		console.timeEnd('all');
		return true;
	}
}

module.exports = CollectBusinessMetrics;
