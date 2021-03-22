const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');
const Config = use('Config');

class ContactController {
	async store({ request }) {
		const data = request.only(['name', 'email', 'phone', 'subject', 'message']);

		Bull.add(
			Job.key,
			{
				...data,
				to: Config.get('mail.platform.mail'),
				subject: `Plataforma Sabiá - ${data.subject}`,
				template: 'emails.contact-us',
			},
			{ attempts: 3 },
		);
	}
}

module.exports = ContactController;
