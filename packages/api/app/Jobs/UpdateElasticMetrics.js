const Mail = require('../Utils/mail');

const { messagesTypes } = require('../Utils/statuses');

const Config = use('Config');
const Message = use('App/Models/Message');
const User = use('App/Models/User');
const edge = use('edge.js');

/** @type {import('@elastic/elasticsearch').Client} */
// const ElasticSearch = use('ElasticSearch');

class SendMail {
	static get key() {
		return 'update-elastic-metrics';
	}

	async handle(job) {
		const { data } = job;

		await Mail.send(data.template, data, (message) => {
			message
				.to(data.to || data.email)
				.from(data.from || Config.get('mail.from'), Config.get('mail.fromName'))
				.cc(data.cc || null)
				.subject(data.subject);
		});

		const user = await User.findBy('email', data.email);
		if (user) {
			const newMessage = await Message.create({
				subject: data.subject,
				content: edge.render(data.template, data),
				type: messagesTypes.EMAIL,
			});

			await newMessage.user().associate(user);
		}

		return data;
	}
}

module.exports = SendMail;
