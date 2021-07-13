const Config = use('Config');
const dayjs = require('dayjs');
const fetch = require('node-fetch');

const getNewIssueUrl = (error, sentryReportId, request) => {
	const { user, repository } = Config.get('app.github');
	const url = new URL(`https://github.com/${user}/${repository}/issues/new`);

	const body = [
		`### Sentry Report Id: ${sentryReportId}`,
		'### Error:',
		'```json',
		error.stack.toString(),
		'```',
		'### Request:',
		`URL: *${request.method()}* ${request.originalUrl()}`,
		'```json',
		JSON.stringify(request.all()),
		'```',
	].join('\n');

	url.searchParams.set('title', JSON.stringify(error.message));
	url.searchParams.set('labels', 'bug,API');
	url.searchParams.set('body', body);

	return url.toString();
};

const buildPayload = ({
	title = 'Error report',
	date,
	errorMessage,
	sentryReportId,
	actionUrl,
}) => {
	return {
		blocks: [
			{
				type: 'section',
				fields: [
					{
						type: 'header',
						text: {
							type: 'plain_text',
							text: title,
							emoji: false,
						},
					},
					{
						type: 'actions',
						elements: [
							{
								type: 'button',
								text: {
									type: 'plain_text',
									text: 'Create issue',
									emoji: true,
								},
								style: 'danger',
								value: 'create_issue',
								action_id: 'button-action',
								url: actionUrl,
							},
						],
					},
				],
			},
			{
				type: 'divider',
			},
			{
				type: 'section',
				fields: [
					{
						type: 'mrkdwn',
						text: `*Date:* ${date}`,
					},
					{
						type: 'mrkdwn',
						text: `*Sentry Report ID:* ${sentryReportId}`,
					},
				],
			},
			{
				type: 'section',
				fields: [
					{
						type: 'mrkdwn',
						text: `*Error:* ${errorMessage}`,
					},
				],
			},
		],
	};
};

const notify = async (error, sentryReportId = '', request = {}) => {
	const actionUrl = getNewIssueUrl(error, sentryReportId, request);

	const payload = buildPayload({
		title: 'API Error report',
		date: dayjs().format('DD/MM/YYYY [às] HH:mm'),
		errorMessage: error.message,
		sentryReportId,
		request,
		actionUrl,
	});

	await fetch(`https://hooks.slack.com/services/${Config.get('slack.notify_path')}`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return true;
};

module.exports = notify;
