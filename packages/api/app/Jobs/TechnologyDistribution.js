const { distributeTechnologyToReviewer, distributeTechnologiesToReviewers } = require('../Utils');

class TechnologyDistribution {
	static get key() {
		return 'TechnologyDistribution-key';
	}

	async handle(job) {
		const { technology } = job;
		if (technology) {
			await distributeTechnologyToReviewer(technology);
		} else {
			await distributeTechnologiesToReviewers();
		}
	}
}

module.exports = TechnologyDistribution;
