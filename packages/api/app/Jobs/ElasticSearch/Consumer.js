/** @type {import('@elastic/elasticsearch').Client} */
const ElasticSearch = use('ElasticSearch');

class Consumer {
	constructor() {
		this.elastic = ElasticSearch;
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
		return 'elasticsearch-consumer';
	}

	// eslint-disable-next-line no-unused-vars
	async handle({ data }) {
		// Consume data from Redis and send to ElasticSearch through scheduled executions
	}
}

module.exports = Consumer;
