describe('User form validation', () => {
	beforeEach(() => {
		cy.authenticate().visit('/user/my-account');
	});

	describe('Editing user information', () => {
		it('It fails if any required field is not filled', () => {
			cy.get('input[name=full_name]')
				.clear()
				.type('Firstname LastName');

			cy.get('input[name=email]').clear();

			cy.get('input[name=company]')
				.clear()
				.type('Sabia Company');

			cy.findByText(/^(atualizar|update)$/i).click();
			cy.findAllByText(/^(este campo é obrigatório|this field is required)$/i).should(
				'exist',
			);
		});

		it('Updates user information if all required fields are filled', () => {
			cy.fixture('user.json').then((userData) => {
				cy.get('input[name=full_name]')
					.clear()
					.type(userData.full_name);

				cy.get('input[name=company]')
					.clear()
					.type(userData.company);

				cy.findByText(/^(atualizar|update)$/i).click();
				cy.findByText(
					/^(Usuário atualizado com sucesso|User successfully updated)$/i,
				).should('exist');
			});
		});
	});
});
