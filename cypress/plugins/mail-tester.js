/**
 * This plugin uses smpt-tester to receive e-mails and store in a variable
 * So tests can consume the e-mails
 *
 * getLastEmail - Returns the last e-mail received
 * resetEmails - Resets a given e-mail address or all e-mails
 */

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
