/* eslint-disable no-underscore-dangle */
/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');
/** @type {typeof import('prom-client')} */
const prometheus = use('Adonis/Prometheus');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

class CollectBusinessMetrics {
	constructor() {
		this.prometheus = prometheus;
		this.metrics = {
			technologiesStatusGauge: {
				name: 'technologies_statuses_gauge',
				help: 'Number of technologies grouped by status',
				labelNames: ['status'],
			},
			technologiesDateCount: {
				name: 'technologies_date_count',
				help: 'Number of technologies grouped by date',
				labelNames: ['date'],
			},
			technologyMostViewedCount: {
				name: 'technologies_most_viewed_count',
				help: 'Technology ranking by views count',
				labelNames: ['technology'],
			},
			technologyMostLikedCount: {
				name: 'technologies_most_liked_count',
				help: 'Technology ranking by likes count',
				labelNames: ['technology'],
			},
			technologyMostRatedGauge: {
				name: 'technologies_most_rated_count',
				help: 'Technology ranking by rated count',
				labelNames: ['technology'],
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
			this.prometheus.register.removeSingleMetric(this.metrics.technologiesStatusGauge.name);

			const data = await Database.raw(
				'SELECT status, count(*) as count from technologies GROUP BY status',
			);

			const gauge = new this.prometheus.Gauge(this.metrics.technologiesStatusGauge);

			data[0].forEach((item) => {
				gauge.set({ status: item.status }, item.count);
			});
		}

		// Technologies Count by Date
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologiesDateCount.name);

			const data = await Database.raw(
				'SELECT DATE_FORMAT(created_at,"%Y-%m-%d") as date, count(*) as count from technologies GROUP BY DATE_FORMAT(created_at,"%Y-%m-%d") ORDER BY DATE_FORMAT(created_at,"%Y-%m-%d") DESC',
			);

			const counter = new this.prometheus.Counter(this.metrics.technologiesDateCount);

			data[0].forEach((item) => {
				counter.inc({ date: item.date }, item.count);
			});
		}

		// Technologies Most Viewed
		{
			this.prometheus.register.removeSingleMetric(
				this.metrics.technologyMostViewedCount.name,
			);

			const data = await Database.raw(
				'SELECT id, title, total_views FROM technologies ORDER BY total_views DESC LIMIT 10',
			);

			const counter = new this.prometheus.Counter(this.metrics.technologyMostViewedCount);

			data[0].forEach((item) => {
				counter.inc({ technology: `[${item.id}] ${item.title}` }, item.total_views);
			});
		}

		// Technologies Most Liked
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologyMostLikedCount.name);

			const data = await Database.raw(
				'SELECT id, title, likes FROM technologies ORDER BY likes DESC LIMIT 10',
			);

			const counter = new this.prometheus.Counter(this.metrics.technologyMostLikedCount);

			data[0].forEach((item) => {
				counter.inc({ technology: `[${item.id}] ${item.title}` }, item.likes);
			});
		}

		// Technologies Most Rated
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologyMostRatedGauge.name);

			const avarages = (
				await Database.raw(
					'SELECT AVG(rating) as rating, technology_id FROM technology_reviews GROUP BY technology_id ORDER BY AVG(rating) DESC',
				)
			)[0];

			if (avarages.length) {
				const technologies = await Database.select('id', 'title')
					.from('technologies')
					.where(
						'id',
						'in',
						avarages.map((item) => item.technology_id),
					);

				const gauge = new this.prometheus.Gauge(this.metrics.technologyMostRatedGauge);

				avarages.forEach((avarage) => {
					const technologyData = technologies.find(
						(technology) => technology.id === avarage.technology_id,
					);

					gauge.set(
						{ technology: `[${avarage.technology_id}] ${technologyData.title}` },
						Number(Number(avarage.rating).toFixed(2)),
					);
				});
			}
		}

		return true;
	}
}

module.exports = CollectBusinessMetrics;
