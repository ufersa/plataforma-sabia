const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendMail');

class ContactUsController {
	async store({ request, response }) {
		const data = request.only(['name', 'email', 'phone', 'subject', 'message']);

		Bull.add(Job.key, { ...data, template: 'emails.contact-us' });

		return response.status(204);
	}
}

module.exports = ContactUsController;
