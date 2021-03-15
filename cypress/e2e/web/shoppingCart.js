const data = {
	pages: {
		home: '/',
		shoppingCart: '/shopping-cart',
	},
};

describe('shoppingCart', () => {
	beforeEach(() => {
		cy.visit(data.pages.home);

		cy.findAllByRole('button', { name: /adicionar ao carrinho$/i })
			.first()
			.as('addToCartButton');
	});

	it('should not be able to send an order when user is logged out', () => {
		cy.get('@addToCartButton').click();

		cy.visit(data.pages.shoppingCart);

		cy.findByRole('button', { name: /finalizar pedido/i }).click();

		cy.findAllByText(/^(entrar|sign in)$/i).should('be.visible');
	});

	it('should not be able to send an order when user hasnt completed registration', () => {
		cy.authenticate();

		cy.get('@addToCartButton').click();

		cy.fixture('user.json').then((userData) => {
			cy.intercept(
				{
					method: 'GET',
					url: '/user/me',
				},
				{
					...userData,
					operations: {
						...userData.operations,
						can_create_service_order: false,
					},
				},
			);
		});

		cy.get('header')
			.find('a[href="/shopping-cart"]')
			.first()
			.click();

		cy.findByRole('button', { name: /finalizar pedido/i }).click();

		cy.findAllByText(/completar cadastro/i).should('be.visible');
	});

	it('should be able to send an order', () => {
		cy.get('@addToCartButton').click();

		cy.authenticate().visit('/');

		cy.visit(data.pages.shoppingCart);

		cy.findByRole('button', { name: /finalizar pedido/i }).click();

		cy.findByText(/pedido enviado com sucesso!/i).should('be.visible');
	});
});
