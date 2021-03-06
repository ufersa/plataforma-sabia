const data = {
	email: 'sabiatestinge2eresetpw@gmail.com',
	password: 'sabiatesting',
	pages: {
		home: '/',
		reset: '/auth/reset-password',
	},
};

describe('reset password', () => {
	it.skip('can request password reset ', () => {
		cy.visit(data.pages.home);
		cy.findByText(/^(entrar|sign in)$/i).click();
		cy.findByText(/^(esqueci minha senha|forgot the password)$/i).click();
		cy.get('form input[name=email]').type(data.email);
		cy.get('div[class*=Modal] form button[type=submit]')
			.click()
			.should('be.visible');
		cy.findByText(
			/^(Verifique se chegou mensagem no email {{email}} com o código para resetar a senha. Você só receberá esse email se existir uma conta associada a esse endereço.|Check to see if a message arrived in the email {{email}} with the code to reset the password. You will only receive this email if there is an account associated with that address)/i,
		).should('exist');

		cy.getLastEmail().then((response) => {
			const { body } = response;

			const link = body.match(/href="([^"]*)/)[1].replace('localhost', '127.0.0.1');
			cy.visit(link);

			cy.get('form input[name=password]').type('newpassword');
			cy.get('form button').click();

			cy.signIn({ email: data.email, password: 'newpassword' });
		});
	});

	it('trying to reset password with an invalid token fails', () => {
		cy.visit(data.pages.reset);
		cy.findByText(/^(recuperação de senha|password recovery)$/i);
		cy.get('#email').type(data.email);
		cy.get('#userCode').type('123456');
		cy.get('#password').type(data.password);
		cy.get('form button[type=submit]').click();
		cy.findByText(/^(O token é inválido|the token is invalid)/).should('be.visible');
	});
});
