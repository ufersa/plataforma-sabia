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

		cy.getLastReceivedEmail(email)
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

	[
		{
			key:
				'should be able to request a new token and confirm account when direct access through confirm account page',
			requestNewToken: true,
		},
		{
			key:
				'should be able to confirm account when direct access through confirm account page',
			requestNewToken: false,
		},
	].forEach((test) =>
		it(test.key, () => {
			cy.intercept('POST', '**/auth/confirm-account').as('confirmAccount');

			const { email, password } = getRandomUser();
			cy.visit('/cadastrar').register({ email, password });
			cy.findByRole('link', { href: '/' }).click();

			cy.visit(`/confirmar-conta/`);
			cy.inputType(/e-mail/i, email);

			if (test.requestNewToken) {
				cy.resetReceivedEmails();
				cy.findByRole('button', { name: /enviar novamente/i }).click();
			}

			cy.getLastReceivedEmail(email)
				.then(cy.wrap)
				.invoke('match', /(?<code>\w+) Siga-nos/i)
				.its('groups.code')
				.then((verificationCode) => {
					cy.findAllByLabelText(/código de verificação/i)
						.eq(0)
						.type(verificationCode);

					cy.findByRole('button', { name: /validar/i }).click();

					cy.wait('@confirmAccount')
						.its('response.statusCode')
						.should('eq', 200);
				});
		}),
	);
});
