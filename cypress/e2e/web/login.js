describe('user', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should be able to login and logout', () => {
		cy.visit('/user/my-account');
		cy.signIn();

		cy.get('button[class*=LogoutButton]').click();
		cy.findAllByText(/^(entrar|sign in)$/i).should('have.length', 1);
	});

	it('cannot create a new technology without being logged in', () => {
		cy.get('a[href="/solution/new"]').click();

		cy.location().should((location) => {
			expect(location.search).to.eq('?redirect=/solution/new');
			expect(location.pathname).to.eq('/entrar');
		});

		cy.signIn();
		cy.findByText(/que tipo de solução você irá cadastrar\?/i).should('exist');
		cy.get('a[href="/technology/new"]').click();

		cy.findByText(/^(entrar|sign in)$/i)
			.should('have.length', 1)
			.get('div[class*=FormWizardContainer]')
			.should('exist');
	});
});
