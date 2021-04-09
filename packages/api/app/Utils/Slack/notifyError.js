const Config = use('Config');
const dayjs = require('dayjs');
const https = require('https');

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
		'```json',
		JSON.stringify(request),
		'```',
	].join('\n');

	url.searchParams.set('title', error.message);
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
				type: 'header',
				text: {
					type: 'plain_text',
					text: title,
					emoji: false,
				},
			},
			{
				type: 'divider',
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
						text: `*Error:*\n${errorMessage}`,
					},
				],
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

	const req = https.request({
		method: 'POST',
		hostname: 'hooks.slack.com',
		path: `/services/${Config.get('slack.notify_path')}`,
		headers: { 'Content-Type': 'application/json' },
	});

	req.write(JSON.stringify(payload));
	req.end();

	return true;
};

module.exports = notify;
