describe('terms of use', () => {
	beforeEach(() => {
		cy.visit('/terms-of-use');
	});

	it('can render the page title', () => {
		cy.findAllByRole('heading', { name: /termos e condições de uso/i }).should('exist');
	});

	it('can render the page topics', () => {
		cy.findByText(/^1 considerações iniciais$/i).should('exist');
		cy.findByText(/^2 definições das partes$/i).should('exist');
		cy.findByText(/^3 o que esperar dos nossos serviços$/i).should('exist');
		cy.findByText(/^4 do cadastro do usuário$/i).should('exist');
		cy.findByText(/^5 do cadastro da tecnologia e do conteúdo do usuário$/i).should('exist');
		cy.findByText(/^6 do processo de curadoria$/i).should('exist');
		cy.findByText(/^7 das obrigações$/i).should('exist');
		cy.findByText(/^8 das penalidades e exclusões de conteúdos$/i).should('exist');
		cy.findByText(/^9 da avaliação de qualidade feita pelo usuário$/i).should('exist');
		cy.findByText(
			/^10 do direito de propriedade intelectual sobre os recursos da plataforma$/i,
		).should('exist');
		cy.findByText(/^11 do canal de suporte aos usuários$/i).should('exist');
		cy.findByText(/^12 sobre a privacidade dos seus dados$/i).should('exist');
		cy.findByText(/^13 modificações nestes termos e condições de uso$/i).should('exist');
		cy.findByText(/^14 sobre o aprimoramento das funcionalidades da plataforma$/i).should(
			'exist',
		);
		cy.findByText(/^15 isenções e limitações de responsabilidade$/i).should('exist');
		cy.findByText(/^16 indenizações$/i).should('exist');
		cy.findByText(/^17 disposições finais$/i).should('exist');
	});
});
