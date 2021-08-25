import { recurse } from 'cypress-recurse';

const getRandomUser = () => {
	const uniqueSeed = Date.now().toString();
	const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);

	return {
		email: `${getUniqueId()}@test.com`,
		password: 'Abc1234567*',
		name: 'Name',
		phone: '1234567890',
	};
};

describe('User register', () => {
	beforeEach(() => {
		cy.task('resetEmails');
	});

	it('should be able to register, confirm account and fill personal data', () => {
		const { email, password, name, phone } = getRandomUser();

		cy.visit('/cadastrar').register({ email, password });

		recurse(
			() => cy.task('getLastEmail', email),
			(_email) => !!_email,
			{
				log: false,
				delay: 1000,
				timeout: 20000,
			},
		)
			.then(cy.wrap)
			.invoke('match', /(?<code>\w+) Siga-nos/i)
			.its('groups.code')
			.then((verificationCode) => {
				cy.findByLabelText(/Verification code input number 1/i).type(verificationCode);

				cy.findByLabelText(/nome/i).type(name);
				cy.findByLabelText(/telefone/i).type(phone);
				cy.select('state');
				cy.select('city');
				cy.findByRole('button').click();
				cy.findByRole('heading', { name: /Cadastro concluído com sucesso!/i }).should(
					'be.visible',
				);
			});
	});

	it('should not be able to access home without verifying account', () => {
		const { email, password } = getRandomUser();

		cy.visit('/cadastrar').register({ email, password });
		cy.findByRole('link', { href: '/' }).click();

		cy.location('pathname').should('eq', '/cadastrar');
		cy.findByRole('heading', { name: /validação/i }).should('be.visible');
	});

	it('should be able to verify account by direct access through confirm account page', () => {
		cy.intercept('POST', '**/auth/confirm-account').as('confirmAccount');

		const { email, password } = getRandomUser();
		cy.visit('/cadastrar').register({ email, password });
		cy.findByRole('link', { href: '/' }).click();

		cy.visit(`/confirmar-conta/`);
		cy.resetReceivedEmails();
		cy.inputType(/e-mail/i, email);
		cy.findByRole('button', { name: /enviar novamente/i }).click();

		recurse(
			() => cy.task('getLastEmail', email),
			(_email) => !!_email,
			{
				log: false,
				delay: 1000,
				timeout: 20000,
			},
		)
			.then(cy.wrap)
			.invoke('match', /(?<code>\w+) Siga-nos/i)
			.its('groups.code')
			.then((verificationCode) => {
				cy.inputType(/Verification code input number 1/i, verificationCode);
				cy.wait('@confirmAccount')
					.its('response.statusCode')
					.should('eq', 200);
			});
	});
});
