const getRandomUser = () => {
	const uniqueSeed = Date.now().toString();
	const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);

	return {
		email: `${getUniqueId()}@test.com`,
		password: 'Abc1234567*',
		name: `${getUniqueId()}-UserName`,
		phone: '1234567890',
	};
};

describe('reset password', () => {
	it('should be able to reset password and login with new password', () => {
		const user = getRandomUser();
		cy.register({ openWizard: false, ...user });
		cy.visit('/resetar-senha');

		cy.findByLabelText(/e-mail/i).type(user.email);
		cy.findByRole('button', { name: /enviar e-mail/i }).click();

		cy.getLastReceivedEmail(user.email)
			.then(cy.wrap)
			.invoke('match', /(?<code>\w+) Caso você/i)
			.its('groups.code')
			.then((verificationCode) => {
				cy.findByLabelText(/Verification code input number 1/i).type(verificationCode);
			});

		cy.findByLabelText(/informe a sua nova senha/i).type(user.password);
		cy.findByLabelText(/confirme a sua nova senha/i).type(user.password);
		cy.findByRole('button').click();
		cy.findByRole('heading', { name: /senha alterada com sucesso!/i }).should('be.visible');
		cy.findByRole('link', { name: /ir para a página principal/i }).click();
		cy.findByRole('button', { name: user.name }).should('be.visible');

		cy.visit('/entrar');
		cy.findByLabelText(/e-mail/i).type(user.email);
		cy.findByLabelText(/senha/i).type(user.password);
		cy.findByRole('button', { name: /entrar/i }).click();
		cy.location().should((location) => {
			expect(location.pathname).to.eq('/');
		});
		cy.findByRole('button', { name: user.name }).should('be.visible');
	});

	it('should not be able to reset password with wrong token', () => {
		cy.intercept('POST', '**/auth/check-token').as('checkToken');
		const user = getRandomUser();
		cy.register({ openWizard: false, ...user });
		cy.visit('/resetar-senha');

		cy.findByLabelText(/e-mail/i).type(user.email);
		cy.findByRole('button', { name: /enviar e-mail/i }).click();

		cy.findByLabelText(/Verification code input number 1/i).type('123456');
		cy.wait('@checkToken')
			.its('response.statusCode')
			.should('eq', 401);
	});
});
