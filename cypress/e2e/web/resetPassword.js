const data = {
	email: 'sabiatestinge2e@gmail.com',
	password: 'sabiatesting',
	pages: {
		home: '/',
		reset:
			'/auth/reset-password?token=3ef578fb424624825af49a0dbf336418TdXsguo1xUlplWqXFaSmLNrUGOVS/0mWO0DKuCBSb10=',
		resetWithoutToken: '/auth/reset-password',
	},
};

describe('reset password', () => {
	it('can request password reset ', () => {
		cy.visit(data.pages.home);
		cy.findByText(/^(entrar|sign in)$/i).click();
		cy.findByText(/^(esqueci minha senha|forgot the password)$/i).click();
		cy.get('form input[name=email]').type(data.email);
		cy.get('div[class*=Modal] form button[type=submit]')
			.click()
			.should('be.visible');

		cy.findByText(
			/^(o link de recuperação de senha foi enviado para o seu e-mail|the password recovery link has been sent to your email)/i,
		).should('exist');
	});

	it('can redirect user when token is missing', () => {
		cy.visit(data.pages.resetWithoutToken);
		cy.findByText(/^(recuperação de senha|password recovery)$/i).should('not.exist');
		cy.url().should('match', /\/$/);
		cy.get('#password').should('not.exist');
	});

	it('can submit the reset password form', () => {
		cy.visit(data.pages.reset);
		cy.findByText(/^(recuperação de senha|password recovery)$/i);
		cy.get('#password').type(data.password);
		cy.get('form button[type=submit]')
			.click()
			.should('be.visible');
	});
});
