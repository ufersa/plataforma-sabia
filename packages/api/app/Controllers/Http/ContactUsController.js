const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');
const Config = use('Config');

class ContactUsController {
	async store({ request }) {
		const data = request.only(['name', 'email', 'phone', 'subject', 'message']);

		Bull.add(
			Job.key,
			{
				...data,
				to: Config.get('mail.platform.mail'),
				cc: data.email,
				subject: `Plataforma Sabiá - ${data.subject}`,
				template: 'emails.contact-us',
			},
			{ attempts: 500 },
		);
	}
}

module.exports = ContactUsController;
