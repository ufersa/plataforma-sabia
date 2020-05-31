describe('user', () => {
	it('can login and log out', () => {
		cy.visit('/').signIn();

		cy.get('#email').should('not.exist');
		cy.get('#password').should('not.exist');

		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');
		cy.get('div[class*=LoginBox] button[type=button]').click();
		cy.findByText(/^(entrar|sign in)$/i).should('exist');
	});

	it('cannot create a new technology without being logged in', () => {
		cy.visit('/');

		cy.get('a[href="/technology/new"]').click();

		// should see the login modal.
		cy.get('#email').should('exist');
		cy.get('#password').should('exist');

		cy.signIn({ openModal: false })
			.get('div[class*=FormWizardContainer]')
			.should('exist');
	});
});
