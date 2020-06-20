const defaultUserEmail = 'sabiatestinge2e@gmail.com';
const defaultUserPassword = 'sabiatesting';

Cypress.Commands.add('signIn', (options = { openModal: true }) => {
	if (options.openModal) {
		cy.findByText(/^(entrar|sign in)$/i).click();
	}
	const email = options.email ?? defaultUserEmail;
	const password = options.password ?? defaultUserPassword;

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

Cypress.Commands.add('authenticate', (options = {}) => {
	const email = options.email ?? defaultUserEmail;
	const password = options.password ?? defaultUserPassword;

	cy.request('POST', 'http://localhost:3333/auth/login', {
		email,
		password,
	}).then((response) => {
		if (response.status === 200) {
			cy.setCookie('token', response.body.token);
		}
	});
});

/**
 * Cypress commands that selects the first option in a react-select component.
 */
Cypress.Commands.add('select', (id) => {
	cy.get(`div.react-select-container[id*=${id}]`).within(($el) => {
		cy.wrap($el)
			.click()
			.get('div[class*="react-select__option"]')
			.first()
			.click();
	});
});
