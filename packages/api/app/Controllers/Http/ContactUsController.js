const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');
const Config = use('Config');

class ContactUsController {
	async store({ request, response }) {
		const data = request.only(['name', 'email', 'phone', 'subject', 'message']);

		Bull.add(Job.key, {
			...data,
			to: Config.get('mail.platform.mail'),
			cc: data.email,
			template: 'emails.contact-us',
		});

		return response.status(204);
	}
}

module.exports = ContactUsController;
