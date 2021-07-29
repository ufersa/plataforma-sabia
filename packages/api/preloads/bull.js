/** @type {import('@rocketseat/adonis-bull')} */
const Bull = use('Rocketseat/Bull');
const UpdateTechnologyTotalViewsJob = use('App/Jobs/UpdateTechnologyTotalViews');
const CollectBusinessMetricsJob = use('App/Jobs/CollectBusinessMetrics');

Bull.process().ui(9999);

// Run the update technology views job every midnight
Bull.add(
	UpdateTechnologyTotalViewsJob.key,
	{},
	{
		repeat: {
			cron: '0 0 * * *',
		},
	},
);

/**
 * TODO: update time
 */
Bull.add(
	CollectBusinessMetricsJob.key,
	{},
	{
		repeat: {
			cron: '*/10 * * * * *',
		},
	},
);
