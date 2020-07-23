const getRandomEmail = () => {
	const randomInt = Math.floor(Math.random() * Math.floor(1000));
	return `newe2euser${randomInt}@gmail.com`;
};

describe('user', () => {
	it('can register ', () => {
		const email = getRandomEmail();
		const password = 'sabiatesting';

		cy.visit('/').register({ openModal: true, email, password });
	});

	it('can register and can not login until account is verified', () => {
		const email = getRandomEmail();
		const password = 'sabiatesting';

		cy.visit('/').register({ openModal: true, email, password });

		cy.signIn({ openModal: false, email, password });
		cy.findByText(/^(entrar|sign in)$/i).should('exist');
		cy.findByText(/^(confirmar email|confirm email)$/i).should('exist');

		cy.getLastEmail().then((response) => {
			const { body } = response;

			const link = body.match(/href="([^"]*)/)[1].replace('localhost', '127.0.0.1');
			cy.visit(link);
		});

		cy.signIn({ email, password });
	});
});
