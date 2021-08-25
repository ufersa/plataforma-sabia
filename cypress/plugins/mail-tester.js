const ms = require('smtp-tester');

module.exports = (on) => {
	const port = 1025;
	const mailServer = ms.init(port);
	let lastEmail = {};

	mailServer.bind((_, id, email) => {
		lastEmail[email.headers.to] = email.body;
	});

	on('task', {
		resetEmails(email) {
			if (email) {
				delete lastEmail[email];
			} else {
				lastEmail = {};
			}
			return null;
		},

		getLastEmail(email) {
			return lastEmail[email] || null;
		},
	});
};
