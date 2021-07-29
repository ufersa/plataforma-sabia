/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');
/** @type {typeof import('prom-client')} */
const prometheus = use('Adonis/Prometheus');

class CollectBusinessMetrics {
	constructor() {
		this.prometheus = prometheus;
		this.metrics = {
			technologiesStatusCount: {
				name: 'technologies_statuses_count',
				help: 'Number of technologies grouped by status',
				labelNames: ['status'],
			},
			technologiesDateCount: {
				name: 'technologies_date_count',
				help: 'Number of technologies grouped by date',
				labelNames: ['date'],
			},
		};
	}

	static get key() {
		return 'CollectBusinessMetrics-key';
	}

	async handle() {
		// eslint-disable-next-line no-console
		console.log(`Date => ${new Date().toJSON()}`);

		// Published Technologies Metric
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologiesStatusCount.name);

			const count = await Database.raw(
				'SELECT status, count(*) as count from technologies GROUP BY status',
			);

			const gauge = new this.prometheus.Gauge(this.metrics.technologiesStatusCount);

			count[0].forEach((item) => {
				gauge.set({ status: item.status }, item.count);
			});
		}

		// Technologies Count by Date
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologiesDateCount.name);

			const count = await Database.raw(
				'SELECT DATE_FORMAT(created_at,"%Y-%m-%d") as date, count(*) as count from technologies GROUP BY DATE_FORMAT(created_at,"%Y-%m-%d") ORDER BY DATE_FORMAT(created_at,"%Y-%m-%d") DESC',
			);

			const counter = new this.prometheus.Counter(this.metrics.technologiesDateCount);

			count[0].forEach((item) => {
				counter.inc({ date: item.date }, item.count);
			});
		}

		// Technologies Count by Date
		{
			// this.prometheus.register.removeSingleMetric(this.metrics.technologiesDateCount.name);

			const count = await Database.table('technologies')
				.join('institutions')
				.groupBy('institution_id');

			// eslint-disable-next-line no-console
			console.log(count);

			// const counter = new this.prometheus.Counter(this.metrics.technologiesDateCount);

			// count[0].forEach((item) => {
			// counter.inc({ date: item.date }, item.count);
			// });
		}

		// eslint-disable-next-line no-console
		// console.log({ publishedTechnologiesCount });
		return true;
	}
}

module.exports = CollectBusinessMetrics;
