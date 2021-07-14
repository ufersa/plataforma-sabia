const { Command } = require('@adonisjs/ace');
const { Slack } = require('../Utils');

class TestSlackWebhook extends Command {
	constructor() {
		super();
		this.slack = Slack;
	}

	static get signature() {
		return 'slack:test';
	}

	static get description() {
		return 'Generate a test event and send it to Slack Webhook';
	}

	getMockedRequest() {
		return {
			method: () => 'METHOD',
			originalUrl: () => 'ORIGINAL_URL',
			all: () => ({ request: 'example' }),
		};
	}

	async handle() {
		try {
			throw new Error('This is a test exception sent from the Slack Webhook command.');
		} catch (error) {
			try {
				await this.slack.notifyError(
					error,
					'mocked_sentry_report_id',
					this.getMockedRequest(),
				);
				this.info(`Webhook sent!`);
			} catch (err) {
				this.error(`There was an error sending the test webhook.`);
				this.error(err);
			}
		}
	}
}

module.exports = TestSlackWebhook;
