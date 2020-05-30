describe('user', () => {
	it('can login', () => {
		cy.visit('/')
			.get('.styles__LoginBox-sc-1f5dpj1-8 > button')
			.click()
			// .findByText(/^entrar$/i)
			.get('#email')
			.invoke('val', 'nicholasio.oliveira@gmail.com')
			.get('#password')
			.invoke('val', '12345678')
			.get('.Form__Actions-zf05us-1 > .styles__StyledButton-sc-9okshb-0')
			.click();
	});
});
