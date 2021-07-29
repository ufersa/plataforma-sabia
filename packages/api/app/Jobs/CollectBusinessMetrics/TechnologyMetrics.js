/* eslint-disable no-underscore-dangle */
/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');
/** @type {typeof import('prom-client')} */
const Prometheus = use('Adonis/Prometheus');

class TechnologyMetrics {
	constructor() {
		this.prometheus = Prometheus;
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
				labelNames: ['id', 'title'],
			},
			technologyMostLikedCount: {
				name: 'technologies_most_liked_count',
				help: 'Technology ranking by likes count',
				labelNames: ['id', 'title'],
			},
			technologyBestRatedGauge: {
				name: 'technologies_best_rated_count',
				help: 'Technology better ranking by rated count',
				labelNames: ['id', 'title'],
			},
			technologyWorstRatedGauge: {
				name: 'technologies_worst_rated_count',
				help: 'Technology worst ranking by rated count',
				labelNames: ['id', 'title'],
			},
		};
	}

	async collect() {
		// Published Technologies Metric
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologiesStatusGauge.name);

			const data = (
				await Database.raw(
					'SELECT status, count(*) as count from technologies GROUP BY status',
				)
			)[0];

			const gauge = new this.prometheus.Gauge(this.metrics.technologiesStatusGauge);

			data.forEach((item) => {
				gauge.set({ status: item.status }, item.count);
			});
		}

		// Technologies Count by Date
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologiesDateCount.name);

			const data = (
				await Database.raw(
					'SELECT DATE_FORMAT(created_at,"%Y-%m-%d") as date, count(*) as count from technologies GROUP BY DATE_FORMAT(created_at,"%Y-%m-%d") ORDER BY DATE_FORMAT(created_at,"%Y-%m-%d") DESC LIMIT 50',
				)
			)[0];

			const counter = new this.prometheus.Counter(this.metrics.technologiesDateCount);

			data.forEach((item) => {
				counter.inc({ date: item.date }, item.count);
			});
		}

		// Technologies Most Viewed
		{
			this.prometheus.register.removeSingleMetric(
				this.metrics.technologyMostViewedCount.name,
			);

			const data = (
				await Database.raw(
					'SELECT id, title, total_views FROM technologies ORDER BY total_views DESC LIMIT 10',
				)
			)[0];

			const counter = new this.prometheus.Counter(this.metrics.technologyMostViewedCount);

			data.forEach((item) => {
				counter.inc({ id: item.id, title: item.title }, item.total_views);
			});
		}

		// Technologies Most Liked
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologyMostLikedCount.name);

			const data = (
				await Database.raw(
					'SELECT id, title, likes FROM technologies ORDER BY likes DESC LIMIT 10',
				)
			)[0];

			const counter = new this.prometheus.Counter(this.metrics.technologyMostLikedCount);

			data.forEach((item) => {
				counter.inc({ id: item.id, title: item.title }, item.likes);
			});
		}

		// Technologies Most Rated
		{
			this.prometheus.register.removeSingleMetric(this.metrics.technologyBestRatedGauge.name);
			this.prometheus.register.removeSingleMetric(
				this.metrics.technologyWorstRatedGauge.name,
			);

			const bestRated = (
				await Database.raw(
					'SELECT AVG(rating) as rating, technology_id FROM technology_reviews GROUP BY technology_id ORDER BY AVG(rating) DESC LIMIT 10',
				)
			)[0];

			if (bestRated.length) {
				const worstRated = (
					await Database.raw(
						'SELECT AVG(rating) as rating, technology_id FROM technology_reviews GROUP BY technology_id ORDER BY AVG(rating) ASC LIMIT 10',
					)
				)[0];

				const technologies = await Database.select('id', 'title')
					.from('technologies')
					.where('id', 'in', [
						...new Set([
							...bestRated.map((item) => item.technology_id),
							...worstRated.map((item) => item.technology_id),
						]),
					]);

				const bestGauge = new this.prometheus.Gauge(this.metrics.technologyBestRatedGauge);
				const worstGauge = new this.prometheus.Gauge(
					this.metrics.technologyWorstRatedGauge,
				);

				bestRated.forEach((average) => {
					const technologyData = technologies.find(
						(technology) => technology.id === average.technology_id,
					);

					bestGauge.set(
						{ id: average.technology_id, title: technologyData.title },
						Number(Number(average.rating).toFixed(2)),
					);
				});

				worstRated.forEach((average) => {
					const technologyData = technologies.find(
						(technology) => technology.id === average.technology_id,
					);

					worstGauge.set(
						{ id: average.technology_id, title: technologyData.title },
						Number(Number(average.rating).toFixed(2)),
					);
				});
			}
		}
	}
}

module.exports = TechnologyMetrics;
