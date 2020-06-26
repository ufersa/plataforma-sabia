const data = {
	email: 'sabiatestinge2e@gmail.com',
	password: 'sabiatesting',
	pages: {
		request: '/',
		reset: '/auth/reset-password',
	},
};

describe('reset password', () => {
	it('can request password reset ', () => {
		cy.visit(data.pages.request);
		cy.findByText(/^(entrar|sign in)$/i).click();
		cy.findByText(/^(esqueci minha senha|forgot the password)$/i).click();
		cy.get('form input[name=email]').type(data.email);
		cy.findByText(/^(solicitar|request)$/i).click();

		cy.findByText(
			/^(o link de recuperação de senha foi enviado para o seu e-mail|the password recovery link has been sent to your email)/i,
		).should('exist');
	});
});
