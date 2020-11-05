const Mail = use('Mail');
const Config = use('Config');

class UserRegisterEmail {
	static get key() {
		return 'SendMail-key';
	}

	async handle(job) {
		const { data } = job;

		await Mail.send(data.template, data, (message) => {
			message
				.to(data.email)
				.from(data.from || Config.get('mail.from'))
				.subject(data.subject);
		});

		return data;
	}
}

module.exports = UserRegisterEmail;
