import technologyFixture from '../fixtures/technology.json';
import * as locales from '../../packages/web/public/static/locales';

const defaultUserEmail = 'sabiatestinge2e@gmail.com';
const defaultUserPassword = 'sabiatesting';

Cypress.Commands.add(
	'signIn',
	({
		email = defaultUserEmail,
		password = defaultUserPassword,
		redirectTo = '',
		inline = false,
	} = {}) => {
		cy.intercept('POST', '**/auth/login').as('signIn');
		cy.location().then((location) => {
			if (location.pathname !== '/entrar' && !inline)
				cy.visit(`/entrar${redirectTo ? `?redirect=${redirectTo}` : ''}`);
		});

		cy.get('#email')
			.type(email)
			.get('#password')
			.type(password);

		cy.get('[data-cy="signin-form"]').within(() => {
			cy.findByRole('button', { name: /entrar/i }).click();
		});

		cy.wait('@signIn')
			.its('response.statusCode')
			.should('eq', 200);
	},
);

/**
 * Custom command to register a new user
 *
 * @param {object} options
 * @param {string} options.email User e-mail
 * @param {string} options.password User password
 * @param {string} options.name User name
 * @param {string} options.phone User phone
 * @param {boolean} options.openWizard If true, will access register page and fill wizard form, otherwise will register using API requests
 */
Cypress.Commands.add(
	'register',
	({ openWizard = true, name = '', phone = '', email = '', password = '' } = {}) => {
		if (openWizard) {
			cy.findByRole('button', { name: /utilizando o e-mail/i }).click();

			cy.inputType({ name: 'email' }, email);
			cy.inputType({ name: 'password' }, password);
			cy.inputType({ name: 'passwordConfirm' }, password);
			cy.findByLabelText(
				/Concordo com os termos de uso e política de privacidade da Plataforma Sabiá/i,
			).click({ force: true });
			cy.findAllByRole('button')
				.eq(0)
				.click();
			return;
		}

		const registerRequest = () =>
			cy.request({
				method: 'POST',
				url: 'http://localhost:3334/auth/register',
				body: {
					scope: 'web',
					email,
					password,
					disclaimers: Array.from(Array(10).keys()),
				},
			});

		const confirmAccountRequest = (verificationCode) =>
			cy.request({
				method: 'POST',
				url: 'http://localhost:3334/auth/confirm-account',
				body: {
					email,
					token: verificationCode,
				},
			});

		const updateUserRequest = (userId, token) =>
			cy.request({
				method: 'PUT',
				url: `http://localhost:3334/users/${userId}`,
				body: {
					full_name: name,
					phone,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

		registerRequest().then((registerResponse) => {
			cy.getLastReceivedEmail(email)
				.then(cy.wrap)
				.invoke('match', /(?<code>\w+) Siga-nos/i)
				.its('groups.code')
				.then((verificationCode) => {
					confirmAccountRequest(verificationCode).then((verificationResponse) => {
						cy.resetReceivedEmails();

						updateUserRequest(
							registerResponse.body.id,
							verificationResponse.body.token,
						);
					});
				});
		});
	},
);

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
		if (index > 0) {
			cy.get('[name="technologyResponsibles.users_add_button"]').click();
		}

		cy.get(`[name='technologyResponsibles.users.${index}.phone_number']`).type(
			technologyFixture.responsible[index].phone,
		);
		cy.get(`[name='technologyResponsibles.users.${index}.email']`).type(
			technologyFixture.responsible[index].email,
		);
		cy.get(`[name='technologyResponsibles.users.${index}.full_name']`).type(
			technologyFixture.responsible[index].fullName,
		);
	}
});

/**
 * Command that types text in an input
 * It receives a selector that can be a string or an object
 * If it's an object it'll use the key as selector attribute and value as the selector value
 * If the selector is a Regex, then it'll use testing-library findByLabelText method
 *
 * i.e. cy.inputType({ name: 'fieldname' }, 'text value') will try to find input with name 'fieldname' and type 'text value' into it
 * cy.inputType('[name="fieldname"]', 'text value) has the same output
 */
Cypress.Commands.add('inputType', (selector, text, options = { clearField: true }) => {
	let getterMethod = 'findByLabelText';
	let selectorText = selector;

	if (!(selector instanceof RegExp)) {
		const selectorEntries = Object.entries(selector);
		getterMethod = 'get';
		selectorText =
			typeof selector === 'string' || selector instanceof String
				? selector
				: `[${selectorEntries[0][0]}="${selectorEntries[0][1]}"]`;
	}

	if (options.clearField) {
		cy[getterMethod](selectorText).clear();
	}
	return cy[getterMethod](selectorText).type(text);
});

Cypress.Commands.add('resetReceivedEmails', () => {
	return cy.task('resetEmails');
});

Cypress.Commands.add('getLastReceivedEmail', (email, options = {}) => {
	cy.waitUntil(() => cy.task('getLastEmail', email), {
		errorMsg: 'Could not get last received e-mail',
		interval: 1000,
		timeout: 15000,
		...options,
	});
});

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
	cy.get(`[data-cy="${selector}"]`, ...args);
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
