const data = {
	email: 'newEmail@gmail.com',
	emailAlreadyRegistered: 'sabiatestinge2e@gmail.com',
	pages: {
		home: '/',
		profile: '/user/my-account',
	},
};

describe('change email', () => {
	it('can request change of email ', () => {
		cy.visit(data.pages.home);
		cy.signIn();
		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');

		cy.visit(data.pages.profile);
		cy.get('form input[name=newEmail]').type(data.email);
		cy.findByText(/^(Atualizar e-mail|Update email)$/i).click();
		cy.findByText(
			/^(Enviamos um link de confirmação para seu novo email. Acesse o link para efetivar a mudança.| We have sent a confirmation link to your new email. Access the link to effect the change.)/i,
		).should('exist');
	});

	it('invalid email ', () => {
		cy.visit(data.pages.home);
		cy.signIn();
		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');

		cy.visit(data.pages.profile);
		cy.get('form input[name=newEmail]').type(data.emailAlreadyRegistered);
		cy.findByText(/^(Atualizar e-mail|Update email)$/i).click();
		cy.findByText(/^(email já existe e precisa ser único.)/i).should('exist');
	});
});
