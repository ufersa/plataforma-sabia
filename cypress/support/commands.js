import technologyFixture from '../fixtures/technology.json';

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
Cypress.Commands.add('select', (id, options = {}) => {
	const exactMatch = options.exactMatch || false;
	const idSelector = exactMatch ? `[id='${id}']` : `[id*='${id}']`;
	cy.get(`div.react-select-container${idSelector}`).within(($el) => {
		cy.wrap($el)
			.click()
			.get('div[class*="react-select__option"]')
			.first()
			.click();
	});
});

Cypress.Commands.add('technologyFormFillInNResponsible', (parameters = { count: 1 }) => {
	const { count } = parameters;

	for (let index = 0; index < count; index += 1) {
		cy.get('[name="technologyResponsibles.users_add_button"]').click();

		cy.get(`[name='technologyResponsibles.users[${index}].phone_number']`).type(
			technologyFixture.responsible[index].phone,
		);
		cy.get(`[name='technologyResponsibles.users[${index}].email']`).type(
			technologyFixture.responsible[index].email,
		);
		cy.get(`[name='technologyResponsibles.users[${index}].full_name']`).type(
			technologyFixture.responsible[index].fullName,
		);
		cy.get(`[name='technologyResponsibles.users[${index}].lattes_id']`).type(
			technologyFixture.responsible[index].lattesId,
		);
	}
});

Cypress.Commands.add('getAllEmails', () => {
	// let's wait a couple of seconds so that there's enough time for the email to be sent
	// eslint-disable-next-line cypress/no-unnecessary-waiting
	cy.wait(5000);
	return cy.request('http://127.0.0.1:1080/messages');
});

Cypress.Commands.add('getLastEmail', () => {
	// let's wait a couple of seconds so that there's enough time for the email to be sent
	// eslint-disable-next-line cypress/no-unnecessary-waiting
	cy.wait(5000);
	return cy.request('http://127.0.0.1:1080/messages').then((response) => {
		const emails = response.body;

		const lastEmail = emails[emails.length - 1];

		cy.request(`http://127.0.0.1:1080/messages/${lastEmail.id}.html`);
	});
});

Cypress.Commands.add('typeMask', { prevSubject: true }, (subject, nextValue) => {
	// use native DOM element
	const $input = subject.get(0);

	const lastValue = $input.value;
	$input.value = nextValue;

	// trigger change event
	// eslint-disable-next-line no-underscore-dangle
	$input._valueTracker.setValue(lastValue);
	$input.dispatchEvent(new Event('change', { bubbles: true }));

	return subject;
});
