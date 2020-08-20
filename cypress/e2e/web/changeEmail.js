const getRandomEmail = () => {
	const randomInt = Math.floor(Math.random() * Math.floor(1000));
	return `newe2euser${randomInt}@gmail.com`;
};

const newUserPassword = 'sabiatesting';
const updatedUserEmail = getRandomEmail();
const unregisteredEmail = getRandomEmail();
const emailAlreadyRegistered = 'sabiatestingadmin@gmail.com';
const pages = {
	home: '/',
	profile: '/user/my-account',
};

describe('change email', () => {
	it.skip('can request change of email ', () => {
		const newUserEmail = getRandomEmail();

		cy.visit('/').register({ openModal: true, email: newUserEmail, password: newUserPassword });

		cy.getLastEmail().then((response) => {
			const { body } = response;

			const link = body.match(/href="([^"]*)/)[1].replace('localhost', '127.0.0.1');
			cy.visit(link);
		});

		cy.signIn({ openModal: false, email: newUserEmail, password: newUserPassword });
		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');

		cy.visit(pages.profile);
		cy.get('form input[name=newEmail]').type(unregisteredEmail);
		cy.findByText(/^(Atualizar e-mail|Update email)$/i).click();
		cy.findByText(
			/^(Enviamos um link de confirmação para seu novo email. Acesse o link para efetivar a mudança.| We have sent a confirmation link to your new email. Access the link to effect the change.)/i,
		).should('exist');
	});

	it.skip('invalid email ', () => {
		const newUserEmail = getRandomEmail();

		cy.visit('/').register({ openModal: true, email: newUserEmail, password: newUserPassword });

		cy.getLastEmail().then((response) => {
			const { body } = response;

			const link = body.match(/href="([^"]*)/)[1].replace('localhost', '127.0.0.1');
			cy.visit(link);
		});

		cy.signIn({ openModal: false, email: newUserEmail, password: newUserPassword });
		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');

		cy.visit(pages.profile);
		cy.get('form input[name=newEmail]').type(emailAlreadyRegistered);
		cy.findByText(/^(Atualizar e-mail|Update email)$/i).click();
		cy.findByText(/^(email já existe e precisa ser único.)/i).should('exist');
	});

	it.skip('can successfully change email', () => {
		const newUserEmail = getRandomEmail();

		cy.visit('/').register({ openModal: true, email: newUserEmail, password: newUserPassword });

		cy.getLastEmail().then((response) => {
			const { body } = response;

			const link = body.match(/href="([^"]*)/)[1].replace('localhost', '127.0.0.1');
			cy.visit(link);
		});

		cy.signIn({ openModal: false, email: newUserEmail, password: newUserPassword });
		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');

		cy.visit(pages.profile);
		cy.get('form input[name=newEmail]').type(updatedUserEmail);
		cy.findByText(/^(Atualizar e-mail|Update email)$/i).click();
		cy.findByText(
			/^(Enviamos um link de confirmação para seu novo email. Acesse o link para efetivar a mudança.| We have sent a confirmation link to your new email. Access the link to effect the change.)/i,
		).should('exist');

		cy.get('button[class*=LogoutButton]').click();
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(7000);
		cy.findByText(/^(entrar|sign in)$/i).should('exist');

		cy.getLastEmail().then((response) => {
			const { body } = response;

			const link = body.match(/href="([^"]*)/)[1].replace('localhost', '127.0.0.1');
			cy.visit(link);
		});

		cy.signIn({ openModal: false, email: updatedUserEmail, password: newUserPassword });
		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');
		cy.visit(pages.profile);
	});
});
