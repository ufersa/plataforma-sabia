Cypress.Commands.add('signIn', (options = { openModal: true }) => {
	if (options.openModal) {
		cy.findByText(/^(entrar|sign in)$/i).click();
	}

	cy.get('#email')
		.invoke('val', 'sabiatestinge2e@gmail.com')
		.get('#password')
		.invoke('val', 'sabiatesting');

	cy.get('div[class*=Modal] button[type=submit]').click();
	return cy.findByText(/^(entrar|sign in)$/i).should('not.exist');
});
