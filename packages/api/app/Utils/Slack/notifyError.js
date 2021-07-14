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

const buildPayload = ({ date, error, sentryReportId, actionUrl, request }) => ({
	blocks: [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: '*API Error report*',
			},
			accessory: {
				type: 'button',
				text: {
					type: 'plain_text',
					text: 'Create issue',
					emoji: false,
				},
				value: 'create_issue',
				url: actionUrl,
				action_id: 'button-action',
				style: 'danger',
			},
		},
		{
			type: 'section',
			fields: [
				{
					type: 'mrkdwn',
					text: `*Date:*\n${date}`,
				},
				{
					type: 'mrkdwn',
					text: `*Sentry Report ID:*\n${sentryReportId}`,
				},
			],
		},
		{
			type: 'section',
			fields: [
				{
					type: 'mrkdwn',
					text: `*Endpoint:* [${request.method()}] ${request.originalUrl()}\n`,
				},
			],
		},
		{
			type: 'section',
			fields: [
				{
					type: 'mrkdwn',
					text: `*Error:*\n${error.message}`,
				},
			],
		},
	],
});

const notify = async (error, sentryReportId = '', request = {}) => {
	const actionUrl = getNewIssueUrl(error, sentryReportId, request);

	const payload = buildPayload({
		date: dayjs().format('DD/MM/YYYY [às] HH:mm'),
		error,
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
