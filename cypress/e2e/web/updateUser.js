describe('User form validation', () => {
	beforeEach(() => {
		cy.authenticate().visit('/user/my-account');
	});

	describe('Editing user information', () => {
		it('Fails if any required field is not filled', () => {
			cy.get('input[name=full_name]')
				.clear()
				.type('Firstname LastName');

			cy.get('input[name=email]').clear();

			cy.findByText(/^(atualizar|update)$/i).click();
			cy.findAllByText(/^(este campo é obrigatório|this field is required)$/i).should(
				'exist',
			);
		});

		it('Fails if a masked field is not filled correctly', () => {
			cy.fixture('user.json').then((userData) => {
				cy.get('input[name=full_name]')
					.clear()
					.type(userData.full_name);

				cy.get('input[name=email]')
					.clear()
					.type(userData.email);
			});

			cy.get('input[name=cpf]')
				.clear()
				.type('44455');

			cy.findByText(/^(atualizar|update)$/i).click();
			cy.findAllByText(/^(invalid pattern|padrão inválido)$/i).should('exist');
		});

		it('Updates user information if all required fields are filled', () => {
			cy.fixture('user.json').then((userData) => {
				cy.get('input[name=full_name]')
					.clear()
					.type(userData.full_name);

				cy.get('input[name=email]')
					.clear()
					.type(userData.email);

				cy.findByText(/^(atualizar|update)$/i).click();
				cy.findByText(
					/^(Usuário atualizado com sucesso|User successfully updated)$/i,
				).should('exist');

				cy.get('div[class*=LoginBox] button span').should(
					'contain',
					userData.full_name.split(' ')[0],
				);

				cy.get('div[class*=UserMsg] span').should(
					'contain',
					userData.full_name.split(' ')[0],
				);
			});
		});
	});

	describe('Editing user password information', () => {
		it('Fails if any required field is not filled', () => {
			cy.get('input[name=currentPassword]').type('currentPassword');

			cy.get('input[name=newPassword]').type('NewPassword');

			cy.get('input[name=confirmNewPassword]').clear();

			cy.findByText(/^(atualizar senha|update password)$/i).click();
			cy.findAllByText(/^(este campo é obrigatório|this field is required)$/i).should(
				'exist',
			);
		});

		it('fails if new password and the confirm new password are different', () => {
			cy.get('input[name=currentPassword]').type('currentPassword');

			cy.get('input[name=newPassword]').type('NewPassword');

			cy.get('input[name=confirmNewPassword]')
				.clear()
				.type('ConfirmNewPassword');

			cy.findByText(/^(atualizar senha|update password)$/i).click();
			cy.findByText(
				/^(A nova senha e a confirmação de senha devem ser iguais|the new password and the confirmation should be the same)$/i,
			).should('exist');
		});

		it(`Fails if the current password doesn't match the one in the database`, () => {
			cy.get('input[name=currentPassword]').type('wrongPassword');

			cy.get('input[name=newPassword]').type('newPassword');

			cy.get('input[name=confirmNewPassword]').type('newPassword');

			cy.findByText(/^(atualizar senha|update password)$/i).click();
			cy.findByText(
				/^(A senha atual não confere|The current password does not match)$/i,
			).should('exist');
		});

		it('Updates user password if all required fields are filled correctly', () => {
			cy.get('input[name=currentPassword]').type('sabiatesting');

			cy.get('input[name=newPassword]').type('sabiatestingNew');

			cy.get('input[name=confirmNewPassword]').type('sabiatestingNew');

			cy.findByText(/^(atualizar senha|update password)$/i).click();
			cy.findByText(/^(senha atualizada com sucesso|password successfully updated)$/i).should(
				'exist',
			);
		});
	});
});
