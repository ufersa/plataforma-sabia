describe('new technology forms', () => {
	beforeEach(() => {
		cy.authenticate().visit('/technology/new');
	});

	it('step 1 - must fill required fields', () => {
		cy.get('input[name=title]').type('Minha tecnologia');
		cy.get('textarea[name=description]').type('Descrição da tecnologia');
		cy.findByText(/salvar e continuar/i).click();
		cy.findAllByText(/este campo é obrigatório/i).should('exist');
	});

	it('step 1 - selecting a category renders subcategories', () => {
		cy.findByText(/escolha a categoria/i).click();
		// TODO: find a better way to select a category. This is a super hack
		cy.findAllByText(/recursos hídricos/i).click({ multiple: true, force: true });
		cy.get('#category [class*="-control"]')
			.click(0, 0, { force: true })
			.get('[class*="-menu"]')
			.find('[class*="-option"]')
			.eq(2)
			.click(0, 0, { force: true });
		cy.findByText(/escolha uma categoria primeiro/i).should('not.exist');
		cy.findByText(/escolha a sub categoria/i).should('exist');
	});
});
