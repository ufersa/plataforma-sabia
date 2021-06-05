/** @type {import('@adonisjs/framework/src/Config')} */
// eslint-disable-next-line no-unused-vars
const Config = use('Config');
/** @type {import('ioredis').Redis} */
const Redis = use('Redis');

class Publisher {
	constructor() {
		this.redis = Redis;
	}

	onCompleted(job, result) {
		// eslint-disable-next-line no-console
		console.log({ job, result });
	}

	onActive(job) {
		// eslint-disable-next-line no-console
		console.log({ job });
	}

	static get key() {
		return 'elasticsearch-publisher';
	}

	// eslint-disable-next-line no-unused-vars
	async handle({ data }) {
		// Store data temporarily in Redis database
		// Use Bull to dispatch this job
	}
}

module.exports = Publisher;
