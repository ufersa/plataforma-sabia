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
