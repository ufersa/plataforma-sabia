Cypress.Commands.add('signIn', (options = { openModal: true }) => {
	if (options.openModal) {
		cy.findByText(/^(entrar|sign in)$/i).click();
	}
	const email = options.email ?? 'sabiatestinge2e@gmail.com';
	const password = options.password ?? 'sabiatesting';

	cy.get('#email')
		.type(email)
		.get('#password')
		.type(password);

	cy.get('div[class*=Modal] button[type=submit]').click();
});

Cypress.Commands.add('register', (options = { openModal: true, email: '', password: '' }) => {
	if (options.openModal) {
		cy.findByText(/^(entrar|sign in)$/i).click();
		cy.findByText(/^(cadastre seu usuário|register your user)$/i).click();
	}

	cy.get('#fullname')
		.type('Sabia Testing')
		.get('#email')
		.type(options.email)
		.get('#password')
		.type(options.password);

	cy.get('div[class*=Modal] button[type=submit]').click();
	cy.findByText(/^(já tem cadastro|already registered)/i).should('exist');
});

Cypress.Commands.add('t', (value) => {
	if (typeof value !== 'string') {
		return null;
	}

	const allowedLocales = ['pt', 'en'];

	const [namespace, key] = value.split(':');

	if (!namespace || !key) {
		return null;
	}

	let keys = allowedLocales.map((locale) => {
		const file = import(`../../packages/web/public/static/locales/${locale}/${namespace}.json`);
		return file[key]?.toLowerCase() ?? null;
	});

	keys = keys.join('|');

	// eslint-disable-next-line no-eval
	return eval(`/^(${keys})$/i`);
});
