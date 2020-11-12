const Mail = use('Mail');

const mockMail = {
	send: (template) => {
		// eslint-disable-next-line no-console
		console.log(`fake ${template} email sent`);
	},
};

module.exports = process.env.NODE_ENV !== 'testing' ? Mail : mockMail;
