/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');
/** @type {typeof import('prom-client')} */
const prometheus = use('Adonis/Prometheus');

class ConsolidateMetrics {
	constructor() {
		this.prometheus = prometheus;
		this.metrics = {
			publishedTechnologies: {
				name: 'published_technologies',
				help: 'Number of technologies published',
			},
		};
	}

	static get key() {
		return 'ConsolidateMetrics-key';
	}

	async handle() {
		// eslint-disable-next-line no-console
		console.log(`Date => ${new Date().toJSON()}`);

		// Published Technologies Metric
		this.prometheus.register.removeSingleMetric(this.metrics.publishedTechnologies.name);

		const publishedTechnologiesCount = await Database.table('technologies')
			.where('status', 'published')
			.getCount();

		new this.prometheus.Gauge(this.metrics.publishedTechnologies).set(
			publishedTechnologiesCount,
		);

		// eslint-disable-next-line no-console
		console.log({ publishedTechnologiesCount });
		return true;
	}
}

module.exports = ConsolidateMetrics;
