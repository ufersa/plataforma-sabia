const dayjs = require('dayjs');

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

const notify = (error) => {
	const title = 'API Error report';
	const date = dayjs().format('DD/MM/YYYY [at] HH:mm');
	const errorMessage = JSON.stringify(error);
	const payload = buildPayload({ title, date, errorMessage });

	return { payload };
};

module.exports = { notify };
