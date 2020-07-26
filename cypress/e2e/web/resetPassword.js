const data = {
	email: 'sabiatestinge2eresetpw@gmail.com',
	password: 'sabiatesting',
	pages: {
		home: '/',
		reset:
			'/auth/reset-password?token=3ef578fb424624825af49a0dbf336418TdXsguo1xUlplWqXFaSmLNrUGOVS/0mWO0DKuCBSb10=',
		resetWithoutToken: '/auth/reset-password',
	},
};

describe('reset password', () => {
	beforeEach(() => {
		cy.clearCookies();
	});
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

		cy.getLastEmail().then((response) => {
			const { body } = response;

			const link = body.match(/href="([^"]*)/)[1].replace('localhost', '127.0.0.1');
			cy.visit(link);

			cy.get('form input[name=password]').type('newpassword');
			cy.get('form button').click();

			cy.signIn({ email: data.email, password: 'newpassword' });
		});
	});

	it('can redirect user when token is missing', () => {
		cy.visit(data.pages.resetWithoutToken);
		cy.findByText(/^(recuperação de senha|password recovery)$/i).should('not.exist');
		cy.url().should('match', /\/$/);
		cy.get('#password').should('not.exist');
	});

	it('trying to reset password with an invalid token fails', () => {
		cy.visit(data.pages.reset);
		cy.findByText(/^(recuperação de senha|password recovery)$/i);
		cy.get('#password').type(data.password);
		cy.get('form button[type=submit]').click();
		cy.findByText(/^(O token é inválido|the token is invalid)/).should('be.visible');
	});
});
