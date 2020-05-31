describe('user', () => {
	const logIn = ({ openModal } = { openModal: true }) => {
		if (openModal) {
			cy.findByText(/^(entrar|sign in)$/i).click();
		}

		cy.get('#email')
			.invoke('val', 'sabiatestinge2e@gmail.com')
			.get('#password')
			.invoke('val', 'sabiatesting');
		cy.get('div[class*=Modal] button[type=submit]').click();
	};

	it('can login and log out', () => {
		cy.visit('/');
		logIn();

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

		logIn({ openModal: false });

		cy.get('div[class*=FormWizardContainer]').should('exist');
	});
});
