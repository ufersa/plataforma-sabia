/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');
/** @type {typeof import('prom-client')} */
const prometheus = use('Adonis/Prometheus');

class CollectBusinessMetrics {
	constructor() {
		this.prometheus = prometheus;
		this.metrics = {
			technologiesStatus: {
				name: 'technologies_statuses_count',
				help: 'Number of technologies grouped by status',
				labelNames: ['type'],
			},
		};
	}

	static get key() {
		return 'CollectBusinessMetrics-key';
	}

	async handle() {
		// eslint-disable-next-line no-console
		console.log(`Date => ${new Date().toJSON()}`);

		// const publishedTechnologiesCount = await Database.table('technologies')
		// 	.where('status', 'published')
		// 	.getCount();

		// new this.prometheus.Gauge(this.metrics.publishedTechnologies).set(
		// 	publishedTechnologiesCount,
		// );

		// Published Technologies Metric
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologiesStatus.name);

			const count = await Database.raw(
				'SELECT status, count(*) as count from technologies GROUP BY status',
			);

			const statusGauge = new this.prometheus.Gauge(this.metrics.technologiesStatus);

			count[0].forEach((item) => {
				statusGauge.set({ type: item.status }, item.count);
			});
		}

		// eslint-disable-next-line no-console
		// console.log({ publishedTechnologiesCount });
		return true;
	}
}

module.exports = CollectBusinessMetrics;
