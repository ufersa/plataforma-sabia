const Mail = require('../../Utils/Mail');

const Config = use('Config');

class SendMail {
	static get key() {
		return 'SendMail-key';
	}

	async handle(job) {
		const { data } = job;

		await Mail.send(data.template, data, (message) => {
			message
				.to(data.email)
				.from(data.from || Config.get('mail.from'))
				.cc(data.cc || null)
				.subject(data.subject);
		});

		return data;
	}
}

module.exports = SendMail;
