const Mail = use('Mail');

const mockMail = {
	send: () => {},
};

module.exports = process.env.NODE_ENV !== 'testing' ? Mail : mockMail;
