import technologyFixture from '../fixtures/technology.json';
import * as locales from '../../packages/web/public/static/locales';

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

	cy.get('label[for=terms_conditions]').click();
	cy.get('label[for=data_conditions]').click();
	cy.get('label[for=platform_conditions]').click();
	cy.get('label[for=services_conditions]').click();
	cy.get('label[for=channel_conditions]').click();
	cy.get('label[for=link_conditions]').click();

	cy.get('div[class*=Modal] button[type=submit]').click();
	cy.findByText(/^(já tem cadastro|already registered)/i).should('exist');
});

Cypress.Commands.add('authenticate', (options = {}) => {
	const email = options.email ?? defaultUserEmail;
	const password = options.password ?? defaultUserPassword;

	cy.request('POST', 'http://localhost:3334/auth/login', {
		email,
		password,
	}).then((response) => {
		if (response.status === 200) {
			cy.setCookie('token', response.body.token);
		}
	});
});

/**
 * Cypress commands that selects the nth option (defaults to first option) in a react-select component.
 */
Cypress.Commands.add('select', (id, options = {}) => {
	const exactMatch = options.exactMatch || false;
	const idSelector = exactMatch ? `[id='${id}']` : `[id*='${id}']`;
	const position = options.position || 0;
	cy.get(`div.react-select-container${idSelector}`).within(($el) => {
		cy.wrap($el)
			.click()
			.get('div[class*="react-select__option"]')
			.eq(position)
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

/**
 * Returns translations from namespace and key
 *
 * @param {string} param Namespace and key separated by colon
 * @returns {RegExp} Regex with translations
 */
const getTranslation = (param) => {
	const [namespace, key] = param.split(':');

	const values = Object.keys(locales).map((locale) => {
		const localeValue = locales[locale][namespace][key];

		if (typeof localeValue === 'undefined') {
			throw new Error('Locale not found');
		}

		return localeValue;
	});

	const value = values.join('|').toLowerCase();
	return new RegExp(`^(${value})$`, 'i');
};

Cypress.Commands.add('getTranslation', getTranslation);
Cypress.Commands.add('findByTranslation', (value) => cy.findByText(getTranslation(value)));
Cypress.Commands.add('findAllByTranslation', (value) => cy.findAllByText(getTranslation(value)));
