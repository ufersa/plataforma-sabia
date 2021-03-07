const data = {
	pages: {
		home: '/',
	},
};

describe('services', () => {
	it.skip('should list the same services as the api', () => {
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
});
