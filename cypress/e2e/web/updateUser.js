import { recurse } from 'cypress-recurse';

const getRandomUser = () => {
	const uniqueSeed = Date.now().toString();
	const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);

	return {
		email: `${getUniqueId()}@test.com`,
		password: 'Abc1234567*',
		name: 'Name',
		phone: '1234567890',
	};
};

describe('User form validation', () => {
	beforeEach(() => {
		cy.authenticate({
			email: 'sabiatestinge2eprofile@gmail.com',
			password: 'sabiatesting',
		}).visit('/user/my-account');
		cy.resetReceivedEmails();
	});

	describe('Editing user information', () => {
		it('Fails if any required field is not filled', () => {
			cy.get('input[name=full_name]').clear();

			cy.findByText(/^(salvar alterações|save changes)$/i).click();
			cy.findAllByText(/^(este campo é obrigatório|this field is required)$/i).should(
				'exist',
			);
		});

		it('Fails if a masked field is not filled correctly', () => {
			cy.fixture('user.json').then((userData) => {
				cy.get('input[name=full_name]')
					.clear()
					.type(userData.full_name);
			});

			cy.get('input[name=cpf]')
				.clear()
				.type('44455');

			cy.findByText(/^(salvar alterações|save changes)$/i).click();
			cy.findAllByText(
				/^(invalid pattern|padrão inválido|invalidPattern|error:invalidPattern)$/i,
			).should('exist');
		});

		it('Updates user information if all required fields are filled', () => {
			cy.fixture('user.json').then((userData) => {
				cy.get('input[name=full_name]')
					.clear()
					.type(userData.full_name);

				cy.findByText(/^(salvar alterações|save changes)$/i).click();
				cy.findByText(
					/^(usuário atualizado com sucesso|user successfully updated)$/i,
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

		it.only('should be able to request e-mail change', () => {
			const user = getRandomUser();
			const { email: newEmail } = getRandomUser();

			cy.register({ openWizard: false, ...user })
				.authenticate({
					email: user.email,
					password: user.password,
				})
				.visit('/user/my-account');

			cy.findByRole('button', { name: /change e-mail/i }).click();
			cy.inputType(/digite o seu novo email/i, newEmail);
			cy.findByRole('button', { name: /confirmar/i }).click();

			recurse(
				() => cy.task('getLastEmail', newEmail),
				(_email) => !!_email,
				{
					log: false,
					delay: 1000,
					timeout: 20000,
				},
			).then(() => cy.findByText(/enviamos um link de confirmação/i).should('be.visible'));
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

			cy.get('input[name=newPassword]').type('sabiatesting');

			cy.get('input[name=confirmNewPassword]').type('sabiatesting');

			cy.findByText(/^(atualizar senha|update password)$/i).click();
			cy.findByText(/^(senha atualizada com sucesso|password successfully updated)$/i).should(
				'exist',
			);
		});
	});
});
