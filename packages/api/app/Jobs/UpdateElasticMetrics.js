/** @type {import('@adonisjs/framework/src/Config')} */
const Config = use('Config');
/** @type {import('@elastic/elasticsearch').Client} */
const ElasticSearch = use('ElasticSearch');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Technology = use('App/Models/Technology');
const dayjs = require('dayjs');

class UpdateElasticMetrics {
	constructor() {
		this.elastic = ElasticSearch;
		this.todayDate = dayjs().format('YYYY-MM-DD');
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
		return 'update-elastic-metrics';
	}

	async handle({ data }) {
		// eslint-disable-next-line no-console
		console.log({ data });

		const technologies = (
			await Technology.query()
				.select('id', 'title', 'status')
				.fetch()
		).toJSON();

		await Promise.all(
			technologies.map((technology) => {
				return this.elastic.index({
					index: 'metrics',
					type: 'technologies',
					id: `technology-${this.todayDate}`,
					body: { ...technology, date: this.todayDate },
				});
			}),
		);
	}
}

module.exports = UpdateElasticMetrics;
