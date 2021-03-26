const dayjs = require('dayjs');
const https = require('https');

const githubProject = {
	user: 'ufersa',
	project: 'plataforma-sabia',
};

const getNewIssueUrl = (errorMessage) => {
	const url = new URL(
		`https://github.com/${githubProject.user}/${githubProject.project}/issues/new`,
	);

	url.searchParams.set('body', errorMessage);
	url.searchParams.set('labels', 'bug,api');

	return url.toString();
};

const buildPayload = ({ title = 'Error report', date, errorMessage }) => {
	const actionUrl = getNewIssueUrl(errorMessage);

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
				type: 'section',
				fields: [
					{
						type: 'mrkdwn',
						text: `*Date:*\n${date}`,
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

const notify = async (error) => {
	const title = 'API Error report';
	const date = dayjs().format('DD/MM/YYYY [às] HH:mm');
	const payload = buildPayload({ title, date, errorMessage: error.message });

	const req = https.request({
		method: 'POST',
		hostname: 'hooks.slack.com',
		path: '/services/T01108K1CMR/B01SJ131T1S/CF7Q2xu0fC8fpTrMdcNIpOt6',
		headers: { 'Content-Type': 'application/json' },
	});

	req.write(JSON.stringify(payload));
	req.end();

	return true;
};

module.exports = notify;
