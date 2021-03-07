const data = {
	pages: {
		home: '/',
		shoppingCart: '/shopping-cart',
	},
};

describe('services', () => {
	it('should list the same services as the api', () => {
		cy.visit(data.pages.home);
		const servicesFromDom = [];

		cy.findAllByTestId('cards-wrapper')
			.eq(1)
			.within(() => {
				cy.get('[data-testid="card-title"]').then((servicesTitle) =>
					servicesTitle.map((index, serviceTitle) => {
						servicesFromDom[index] = serviceTitle.innerText;
						return true;
					}),
				);

				cy.request('GET', 'http://localhost:3334/services', {
					embed: true,
					perPage: 4,
					orderBy: 'likes',
					order: 'DESC',
				}).then((services) => {
					const servicesFromJson = services.body.map((service) => service.name);

					cy.expect(services.status).to.equal(200);

					cy.expect([...servicesFromJson]).to.deep.equal(servicesFromDom);
				});
			});
	});

	it('should be able to like or dislike a service', () => {
		cy.authenticate().visit(data.pages.home);

		cy.findByText(/serviços em destaque/i)
			.siblings()
			.findAllByTestId('card-heart')
			.first()
			.as('serviceLikes');

		cy.get('@serviceLikes').then((serviceLikes) => {
			const initialLikes = Number(serviceLikes.text());
			cy.wrap(serviceLikes).click();

			cy.get('@serviceLikes').should((newCounter) => {
				const currentLikes = Number(newCounter.text());

				expect(currentLikes).to.be.oneOf([initialLikes + 1, initialLikes - 1]);
				expect(currentLikes).to.not.equal(initialLikes);
			});
		});
	});

	it('should be able to add and remove a service from shopping cart', () => {
		cy.visit(data.pages.home);

		cy.findByText(/serviços em destaque/i)
			.siblings()
			.children()
			.first()
			.as('serviceCard');

		cy.get('@serviceCard')
			.find('h3')
			.then((serviceTitleEl) => {
				const serviceTitle = serviceTitleEl.text();
				cy.get('@serviceCard')
					.findByRole('button', { name: /adicionar ao carrinho/i })
					.click();

				cy.visit(data.pages.shoppingCart);

				cy.findByText(serviceTitle).should('exist');

				cy.findByRole('button', { name: /remover/i }).click();

				cy.findByText(serviceTitle).should('not.exist');
			});
	});
});
