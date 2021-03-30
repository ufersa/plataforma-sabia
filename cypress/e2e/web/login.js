describe('user', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('can login and log out', () => {
		cy.signIn();
		cy.findAllByText(/^(entrar|sign in)$/i).should('have.length', 1);

		cy.get('#email').should('not.exist');
		cy.get('#password').should('not.exist');

		cy.visit('/user/my-account');
		cy.get('button[class*=LogoutButton]').click();
		cy.findAllByText(/^(entrar|sign in)$/i).should('have.length', 2);
	});

	it('logging in with wrong credentials yields error in the login modal', () => {
		cy.signIn({
			openModal: true,
			email: 'thismeaildoesnotexist@gmail.com',
			password: '123123123',
		});

		cy.get('div[class*=LoginBox]').should('exist');
	});

	it('cannot create a new technology without being logged in', () => {
		cy.get('a[href="/solution/new"]').click();

		// should see the login modal.
		cy.get('#email').should('exist');
		cy.get('#password').should('exist');

		cy.signIn({ openModal: false });
		cy.findByText(/que tipo de solução você irá cadastrar\?/i).should('exist');
		cy.get('a[href="/technology/new"]').click();

		cy.findByText(/^(entrar|sign in)$/i)
			.should('have.length', 1)
			.get('div[class*=FormWizardContainer]')
			.should('exist');
	});
});
