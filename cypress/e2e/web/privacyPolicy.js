describe('privacy policy', () => {
	beforeEach(() => {
		cy.visit('/privacy-policy');
	});

	it('can render the page title', () => {
		cy.findAllByRole('heading', { name: /política de privacidade/i }).should('exist');
	});

	it('can render the page topics', () => {
		cy.findByText(/^1 introdução$/i).should('exist');
		cy.findByText(/^2 das partes$/i).should('exist');
		cy.findByText(/^3 quais dados serão coletados$/i).should('exist');
		cy.findByText(/^4 como os dados coletados serão utilizados na plataforma sabiá$/i).should(
			'exist',
		);
		cy.findByText(/^5 sobre o compartilhamento de dados$/i).should('exist');
		cy.findByText(/^6 como as informações serão protegidas$/i).should('exist');
		cy.findByText(/^7 como serão utilizados os cookies e outras tecnologias$/i).should('exist');
		cy.findByText(/^8 sobre mudanças na política de privacidade$/i).should('exist');
		cy.findByText(/^9 o que fazer em caso de dúvidas ou requerimento do usuário$/i).should(
			'exist',
		);
	});
});
